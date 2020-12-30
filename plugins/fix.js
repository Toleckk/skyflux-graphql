const commonTypeDef = `
type Common<A, B> = {
  [P in keyof A & keyof B]: A[P] | B[P];
};

export type EdgeWithDbObject<T> =
  T extends Edge & {node: infer N}
    ? Omit<T, 'node'> & {node: ResolverWithDbObject<N>}
    : never

export type EdgesWithDbObject<T extends Maybe<Edge>[]> = T extends Maybe<infer E>[] ? Maybe<EdgeWithDbObject<E>> : never

export type ConnectionWithDbObject<T extends Connection> = Omit<T, 'edges'> & {
  edges: EdgesWithDbObject<T['edges']>[]
}
`

const getEntityDirective = type =>
  type.astNode?.directives.find(e => e.name.value === 'entity')

const getEmbeddedArgValue = entity =>
  entity.arguments?.find(e => e.name.value === 'embedded')?.value.value === true

const isNonEmbeddedEntity = type => {
  const entity = getEntityDirective(type)

  if (!entity) return false

  return !getEmbeddedArgValue(entity)
}

const isEntityConnection = entities => type =>
  entities.some(e => e + 'Connection' === type.name)

const createSingleTypeString = typename =>
  `T extends ${typename} ? Partial<Common<${typename}, ${typename}DbObject>>`

const createSingleConnectionString = connection =>
  `T extends ${connection} ? ConnectionWithDbObject<${connection}>`

const createResolverTypeDef = conditions =>
  `export type ResolverWithDbObject<T> = ${conditions} : T;`

module.exports = {
  plugin: schema => {
    const types = Object.values(schema.getTypeMap())
    const entities = types.filter(isNonEmbeddedEntity)
    const connections = types.filter(isEntityConnection(entities))

    const conditions = [
      ...entities.map(createSingleTypeString),
      ...connections.map(createSingleConnectionString),
    ].join(' : ')

    const resolverTypeDef = createResolverTypeDef(conditions)

    return `
${commonTypeDef}

${resolverTypeDef}
    `
  },
}
