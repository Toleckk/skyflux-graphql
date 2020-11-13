import {SchemaDirectiveVisitor} from 'graphql-tools'
import {defaultFieldResolver, GraphQLField} from 'graphql'
import {ForbiddenError} from 'apollo-server'

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): void {
    const {resolve = defaultFieldResolver} = field

    field.resolve = (root, args, context, ...rest) => {
      if (!context.user) throw new ForbiddenError('Authentication is required')

      return resolve.call(this, root, args, context, ...rest)
    }
  }
}
