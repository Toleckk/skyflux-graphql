/* eslint-disable */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  {[P in K]-?: NonNullable<T[P]>}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
}

export type Comment = {
  __typename?: 'Comment'
  _id: Scalars['ID']
  text: Scalars['String']
  user: User
  post: Post
  createdAt: Scalars['Date']
}

export type CommentEdge = Edge & {
  __typename?: 'CommentEdge'
  cursor: Scalars['ID']
  node: Comment
}

export type CommentConnection = Connection & {
  __typename?: 'CommentConnection'
  edges: Array<Maybe<CommentEdge>>
  pageInfo: PageInfo
}

export type DeletedComment = {
  __typename?: 'DeletedComment'
  _id: Scalars['ID']
  post: Post
}

export type Query = {
  __typename?: 'Query'
  doesNicknameExist: Scalars['Boolean']
  getCommentsByPostId?: Maybe<CommentConnection>
  getEvents: EventConnection
  getFeed: PostConnection
  getFoundPosts: PostConnection
  getFoundUsers?: Maybe<UserConnection>
  getPostById?: Maybe<Post>
  getPostsByNickname: PostConnection
  getSubRequests: SubConnection
  getSubRequestsCount: Scalars['Int']
  getSuggestions: UserConnection
  getUserByNickname?: Maybe<User>
  me?: Maybe<User>
}

export type QueryDoesNicknameExistArgs = {
  nickname: Scalars['String']
}

export type QueryGetCommentsByPostIdArgs = {
  post_id: Scalars['ID']
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QueryGetEventsArgs = {
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QueryGetFeedArgs = {
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QueryGetFoundPostsArgs = {
  text: Scalars['String']
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QueryGetFoundUsersArgs = {
  text: Scalars['String']
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QueryGetPostByIdArgs = {
  _id: Scalars['ID']
}

export type QueryGetPostsByNicknameArgs = {
  nickname: Scalars['String']
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QueryGetSubRequestsArgs = {
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QueryGetSuggestionsArgs = {
  first: Scalars['Int']
}

export type QueryGetUserByNicknameArgs = {
  nickname: Scalars['String']
}

export type CreateComment = {
  post_id: Scalars['ID']
  text: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  acceptSub: Sub
  confirmEmail: Scalars['Boolean']
  createComment: Comment
  createLike: Like
  createPost: Post
  createResetRequest?: Maybe<Scalars['Boolean']>
  createSession: Scalars['String']
  createSub: Sub
  createUser: User
  declineSub?: Maybe<DeletedSub>
  deleteComment?: Maybe<DeletedComment>
  deleteCurrentSession?: Maybe<Scalars['Boolean']>
  deleteLike?: Maybe<Scalars['Boolean']>
  deletePost?: Maybe<DeletedPost>
  deleteSub?: Maybe<DeletedSub>
  makeAccountPrivate: User
  makeAccountPublic: User
  resetPassword?: Maybe<Scalars['Boolean']>
  updateNickname: User
  updatePassword?: Maybe<Scalars['Boolean']>
  updateProfileInfo: User
}

export type MutationAcceptSubArgs = {
  _id: Scalars['ID']
}

export type MutationConfirmEmailArgs = {
  credentials: ConfirmEmail
}

export type MutationCreateCommentArgs = {
  comment: CreateComment
}

export type MutationCreateLikeArgs = {
  post_id: Scalars['ID']
}

export type MutationCreatePostArgs = {
  post: CreatePost
}

export type MutationCreateResetRequestArgs = {
  login: Scalars['String']
}

export type MutationCreateSessionArgs = {
  credentials: CreateSession
}

export type MutationCreateSubArgs = {
  nickname: Scalars['String']
}

export type MutationCreateUserArgs = {
  user: CreateUser
}

export type MutationDeclineSubArgs = {
  _id: Scalars['ID']
}

export type MutationDeleteCommentArgs = {
  _id: Scalars['ID']
}

export type MutationDeleteLikeArgs = {
  post_id: Scalars['ID']
}

export type MutationDeletePostArgs = {
  _id: Scalars['ID']
}

export type MutationDeleteSubArgs = {
  nickname: Scalars['String']
}

export type MutationResetPasswordArgs = {
  credentials: ResetPassword
}

export type MutationUpdateNicknameArgs = {
  user: UpdateNickname
}

export type MutationUpdatePasswordArgs = {
  credentials: UpdatePassword
}

export type MutationUpdateProfileInfoArgs = {
  user: UpdateProfileInfo
}

export type Subscription = {
  __typename?: 'Subscription'
  commentCreated: Comment
  commentDeleted?: Maybe<DeletedComment>
  eventAdded: Event
  eventDeleted?: Maybe<Entity>
  likeCreated: Like
  likeDeleted: Like
  postCreated: Post
  postDeleted?: Maybe<DeletedPost>
  postUpdated: MaybePost
  subAccepted: Sub
  subDeleted?: Maybe<DeletedSub>
  subRequestCreated: Sub
}

export type SubscriptionCommentCreatedArgs = {
  post_id: Scalars['ID']
}

export type SubscriptionCommentDeletedArgs = {
  post_id: Scalars['ID']
}

export type SubscriptionLikeCreatedArgs = {
  post_id: Scalars['ID']
}

export type SubscriptionLikeDeletedArgs = {
  post_id: Scalars['ID']
}

export type SubscriptionPostCreatedArgs = {
  nickname?: Maybe<Scalars['String']>
}

export type SubscriptionPostDeletedArgs = {
  nickname?: Maybe<Scalars['String']>
}

export type SubscriptionPostUpdatedArgs = {
  nickname: Scalars['String']
}

export enum EventType {
  Sub = 'Sub',
  Comment = 'Comment',
  Like = 'Like',
}

export type Event = {
  __typename?: 'Event'
  createdAt: Scalars['Date']
  kind: EventType
  subj: EventBody
}

export type EventBody = SubEventBody | CommentEventBody | LikeEventBody

export type SubEventBody = {
  __typename?: 'SubEventBody'
  sub: Sub
}

export type CommentEventBody = {
  __typename?: 'CommentEventBody'
  comment: Comment
}

export type LikeEventBody = {
  __typename?: 'LikeEventBody'
  like: Like
}

export type EventEdge = Edge & {
  __typename?: 'EventEdge'
  cursor: Scalars['ID']
  node: Event
}

export type EventConnection = Connection & {
  __typename?: 'EventConnection'
  edges: Array<Maybe<EventEdge>>
  pageInfo: PageInfo
}

export type Like = {
  __typename?: 'Like'
  _id: Scalars['ID']
  post: Post
  user: User
}

export type Post = {
  __typename?: 'Post'
  _id: Scalars['ID']
  text: Scalars['String']
  createdAt: Scalars['Date']
  user: User
  isLikedByMe: Scalars['Boolean']
  likesCount: Scalars['Int']
  commentsCount: Scalars['Int']
  comments: CommentConnection
}

export type PostCommentsArgs = {
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type PostEdge = Edge & {
  __typename?: 'PostEdge'
  cursor: Scalars['ID']
  node: Post
}

export type PostConnection = Connection & {
  __typename?: 'PostConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<PostEdge>>
}

export type DeletedPost = {
  __typename?: 'DeletedPost'
  _id: Scalars['ID']
  deleted: Scalars['Boolean']
  user: User
}

export type MaybePost = Post | DeletedPost

export type CreatePost = {
  text: Scalars['String']
}

export type CreateSession = {
  login: Scalars['String']
  password: Scalars['String']
}

export type Sub = {
  __typename?: 'Sub'
  _id: Scalars['ID']
  from: User
  to: User
  accepted: Scalars['Boolean']
}

export type SubEdge = Edge & {
  __typename?: 'SubEdge'
  cursor: Scalars['ID']
  node: Sub
}

export type SubConnection = Connection & {
  __typename?: 'SubConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<SubEdge>>
}

export type DeletedSub = {
  __typename?: 'DeletedSub'
  _id: Scalars['ID']
  from: User
  to: User
}

export type User = {
  __typename?: 'User'
  _id: Scalars['ID']
  nickname: Scalars['String']
  avatar?: Maybe<Scalars['String']>
  description: Description
  private: Scalars['Boolean']
  mySub?: Maybe<Sub>
  postsCount: Scalars['Int']
  subsCount: Scalars['Int']
  subscribersCount: Scalars['Int']
}

export type Description = {
  __typename?: 'Description'
  birthday?: Maybe<Scalars['Date']>
  about?: Maybe<Scalars['String']>
  from?: Maybe<Scalars['String']>
}

export type UserEdge = Edge & {
  __typename?: 'UserEdge'
  cursor: Scalars['ID']
  node: User
}

export type UserConnection = Connection & {
  __typename?: 'UserConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<UserEdge>>
}

export type CreateUser = {
  email: Scalars['String']
  password: Scalars['String']
}

export type ResetPassword = {
  token: Scalars['String']
  password: Scalars['String']
}

export type UpdatePassword = {
  oldPassword: Scalars['String']
  newPassword: Scalars['String']
}

export type UpdateNickname = {
  nickname: Scalars['String']
}

export type UpdateProfileInfo = {
  avatar?: Maybe<Scalars['String']>
  description: DescrpitionInput
}

export type DescrpitionInput = {
  birthday?: Maybe<Scalars['String']>
  about?: Maybe<Scalars['String']>
  from?: Maybe<Scalars['String']>
}

export type ConfirmEmail = {
  token: Scalars['String']
}

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type Entity = {
  __typename?: 'Entity'
  _id: Scalars['ID']
}

export type Edge = {
  cursor: Scalars['ID']
}

export type PageInfo = {
  __typename?: 'PageInfo'
  startCursor?: Maybe<Scalars['ID']>
  endCursor?: Maybe<Scalars['ID']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
}

export type Connection = {
  edges: Array<Maybe<Edge>>
  pageInfo: PageInfo
}

type Common<A, B> = {
  [P in keyof A & keyof B]: A[P] | B[P]
}

export type EdgeWithDbObject<T> = T extends Edge & {node: infer N}
  ? Omit<T, 'node'> & {node: ResolverWithDbObject<N>}
  : never

export type EdgesWithDbObject<T extends Maybe<Edge>[]> = T extends Maybe<
  infer E
>[]
  ? Maybe<EdgeWithDbObject<E>>
  : never

export type ConnectionWithDbObject<T extends Connection> = Omit<T, 'edges'> & {
  edges: EdgesWithDbObject<T['edges']>[]
}

export type ResolverWithDbObject<T> = T extends Comment
  ? Common<Comment, CommentDbObject>
  : T extends Event
  ? Common<Event, EventDbObject>
  : T extends Like
  ? Common<Like, LikeDbObject>
  : T extends Post
  ? Common<Post, PostDbObject>
  : T extends Sub
  ? Common<Sub, SubDbObject>
  : T extends User
  ? Common<User, UserDbObject>
  : T extends CommentConnection
  ? ConnectionWithDbObject<CommentConnection>
  : T extends EventConnection
  ? ConnectionWithDbObject<EventConnection>
  : T extends PostConnection
  ? ConnectionWithDbObject<PostConnection>
  : T extends SubConnection
  ? ConnectionWithDbObject<SubConnection>
  : T extends UserConnection
  ? ConnectionWithDbObject<UserConnection>
  : T

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> =
  | Promise<ResolverWithDbObject<T>>
  | ResolverWithDbObject<T>

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    {[key in TKey]: TResult},
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    {[key in TKey]: TResult},
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Comment: ResolverTypeWrapper<Comment>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  CommentEdge: ResolverTypeWrapper<CommentEdge>
  CommentConnection: ResolverTypeWrapper<CommentConnection>
  DeletedComment: ResolverTypeWrapper<DeletedComment>
  Query: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  CreateComment: CreateComment
  Mutation: ResolverTypeWrapper<{}>
  Subscription: ResolverTypeWrapper<{}>
  EventType: EventType
  Event: ResolverTypeWrapper<
    Omit<Event, 'subj'> & {subj: ResolversTypes['EventBody']}
  >
  EventBody:
    | ResolversTypes['SubEventBody']
    | ResolversTypes['CommentEventBody']
    | ResolversTypes['LikeEventBody']
  SubEventBody: ResolverTypeWrapper<SubEventBody>
  CommentEventBody: ResolverTypeWrapper<CommentEventBody>
  LikeEventBody: ResolverTypeWrapper<LikeEventBody>
  EventEdge: ResolverTypeWrapper<EventEdge>
  EventConnection: ResolverTypeWrapper<EventConnection>
  Like: ResolverTypeWrapper<Like>
  Post: ResolverTypeWrapper<Post>
  PostEdge: ResolverTypeWrapper<PostEdge>
  PostConnection: ResolverTypeWrapper<PostConnection>
  DeletedPost: ResolverTypeWrapper<DeletedPost>
  MaybePost: ResolversTypes['Post'] | ResolversTypes['DeletedPost']
  CreatePost: CreatePost
  CreateSession: CreateSession
  Sub: ResolverTypeWrapper<Sub>
  SubEdge: ResolverTypeWrapper<SubEdge>
  SubConnection: ResolverTypeWrapper<SubConnection>
  DeletedSub: ResolverTypeWrapper<DeletedSub>
  User: ResolverTypeWrapper<User>
  Description: ResolverTypeWrapper<Description>
  UserEdge: ResolverTypeWrapper<UserEdge>
  UserConnection: ResolverTypeWrapper<UserConnection>
  CreateUser: CreateUser
  ResetPassword: ResetPassword
  UpdatePassword: UpdatePassword
  UpdateNickname: UpdateNickname
  UpdateProfileInfo: UpdateProfileInfo
  DescrpitionInput: DescrpitionInput
  ConfirmEmail: ConfirmEmail
  Date: ResolverTypeWrapper<Scalars['Date']>
  AdditionalEntityFields: AdditionalEntityFields
  Entity: ResolverTypeWrapper<Entity>
  Edge:
    | ResolversTypes['CommentEdge']
    | ResolversTypes['EventEdge']
    | ResolversTypes['PostEdge']
    | ResolversTypes['SubEdge']
    | ResolversTypes['UserEdge']
  PageInfo: ResolverTypeWrapper<PageInfo>
  Connection:
    | ResolversTypes['CommentConnection']
    | ResolversTypes['EventConnection']
    | ResolversTypes['PostConnection']
    | ResolversTypes['SubConnection']
    | ResolversTypes['UserConnection']
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Comment: Comment
  ID: Scalars['ID']
  String: Scalars['String']
  CommentEdge: CommentEdge
  CommentConnection: CommentConnection
  DeletedComment: DeletedComment
  Query: {}
  Boolean: Scalars['Boolean']
  Int: Scalars['Int']
  CreateComment: CreateComment
  Mutation: {}
  Subscription: {}
  Event: Omit<Event, 'subj'> & {subj: ResolversParentTypes['EventBody']}
  EventBody:
    | ResolversParentTypes['SubEventBody']
    | ResolversParentTypes['CommentEventBody']
    | ResolversParentTypes['LikeEventBody']
  SubEventBody: SubEventBody
  CommentEventBody: CommentEventBody
  LikeEventBody: LikeEventBody
  EventEdge: EventEdge
  EventConnection: EventConnection
  Like: Like
  Post: Post
  PostEdge: PostEdge
  PostConnection: PostConnection
  DeletedPost: DeletedPost
  MaybePost: ResolversParentTypes['Post'] | ResolversParentTypes['DeletedPost']
  CreatePost: CreatePost
  CreateSession: CreateSession
  Sub: Sub
  SubEdge: SubEdge
  SubConnection: SubConnection
  DeletedSub: DeletedSub
  User: User
  Description: Description
  UserEdge: UserEdge
  UserConnection: UserConnection
  CreateUser: CreateUser
  ResetPassword: ResetPassword
  UpdatePassword: UpdatePassword
  UpdateNickname: UpdateNickname
  UpdateProfileInfo: UpdateProfileInfo
  DescrpitionInput: DescrpitionInput
  ConfirmEmail: ConfirmEmail
  Date: Scalars['Date']
  AdditionalEntityFields: AdditionalEntityFields
  Entity: Entity
  Edge:
    | ResolversParentTypes['CommentEdge']
    | ResolversParentTypes['EventEdge']
    | ResolversParentTypes['PostEdge']
    | ResolversParentTypes['SubEdge']
    | ResolversParentTypes['UserEdge']
  PageInfo: PageInfo
  Connection:
    | ResolversParentTypes['CommentConnection']
    | ResolversParentTypes['EventConnection']
    | ResolversParentTypes['PostConnection']
    | ResolversParentTypes['SubConnection']
    | ResolversParentTypes['UserConnection']
}>

export type AuthDirectiveArgs = {}

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = AuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type ConstraintDirectiveArgs = {
  minLength?: Maybe<Scalars['Int']>
  maxLength?: Maybe<Scalars['Int']>
  startsWith?: Maybe<Scalars['String']>
  endsWith?: Maybe<Scalars['String']>
  contains?: Maybe<Scalars['String']>
  notContains?: Maybe<Scalars['String']>
  pattern?: Maybe<Scalars['String']>
  format?: Maybe<Scalars['String']>
  min?: Maybe<Scalars['Int']>
  max?: Maybe<Scalars['Int']>
  exclusiveMin?: Maybe<Scalars['Int']>
  exclusiveMax?: Maybe<Scalars['Int']>
  multipleOf?: Maybe<Scalars['Int']>
  uniqueTypeName?: Maybe<Scalars['String']>
}

export type ConstraintDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = ConstraintDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>
}

export type UnionDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = UnionDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>
}

export type AbstractEntityDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = AbstractEntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>
}

export type EntityDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = EntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type ColumnDirectiveArgs = {overrideType?: Maybe<Scalars['String']>}

export type ColumnDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = ColumnDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type IdDirectiveArgs = {}

export type IdDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = IdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type LinkDirectiveArgs = {overrideType?: Maybe<Scalars['String']>}

export type LinkDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = LinkDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type EmbeddedDirectiveArgs = {}

export type EmbeddedDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = EmbeddedDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type MapDirectiveArgs = {path: Scalars['String']}

export type MapDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = MapDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type CommentResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CommentEdgeResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['CommentEdge'] = ResolversParentTypes['CommentEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CommentConnectionResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['CommentConnection'] = ResolversParentTypes['CommentConnection']
> = ResolversObject<{
  edges?: Resolver<
    Array<Maybe<ResolversTypes['CommentEdge']>>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type DeletedCommentResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['DeletedComment'] = ResolversParentTypes['DeletedComment']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type QueryResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  doesNicknameExist?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<QueryDoesNicknameExistArgs, 'nickname'>
  >
  getCommentsByPostId?: Resolver<
    Maybe<ResolversTypes['CommentConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetCommentsByPostIdArgs, 'post_id' | 'first'>
  >
  getEvents?: Resolver<
    ResolversTypes['EventConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryGetEventsArgs, 'first'>
  >
  getFeed?: Resolver<
    ResolversTypes['PostConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryGetFeedArgs, 'first'>
  >
  getFoundPosts?: Resolver<
    ResolversTypes['PostConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryGetFoundPostsArgs, 'text' | 'first'>
  >
  getFoundUsers?: Resolver<
    Maybe<ResolversTypes['UserConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetFoundUsersArgs, 'text' | 'first'>
  >
  getPostById?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetPostByIdArgs, '_id'>
  >
  getPostsByNickname?: Resolver<
    ResolversTypes['PostConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryGetPostsByNicknameArgs, 'nickname' | 'first'>
  >
  getSubRequests?: Resolver<
    ResolversTypes['SubConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryGetSubRequestsArgs, 'first'>
  >
  getSubRequestsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  getSuggestions?: Resolver<
    ResolversTypes['UserConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryGetSuggestionsArgs, 'first'>
  >
  getUserByNickname?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserByNicknameArgs, 'nickname'>
  >
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  acceptSub?: Resolver<
    ResolversTypes['Sub'],
    ParentType,
    ContextType,
    RequireFields<MutationAcceptSubArgs, '_id'>
  >
  confirmEmail?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationConfirmEmailArgs, 'credentials'>
  >
  createComment?: Resolver<
    ResolversTypes['Comment'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommentArgs, 'comment'>
  >
  createLike?: Resolver<
    ResolversTypes['Like'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateLikeArgs, 'post_id'>
  >
  createPost?: Resolver<
    ResolversTypes['Post'],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePostArgs, 'post'>
  >
  createResetRequest?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateResetRequestArgs, 'login'>
  >
  createSession?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSessionArgs, 'credentials'>
  >
  createSub?: Resolver<
    ResolversTypes['Sub'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSubArgs, 'nickname'>
  >
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'user'>
  >
  declineSub?: Resolver<
    Maybe<ResolversTypes['DeletedSub']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeclineSubArgs, '_id'>
  >
  deleteComment?: Resolver<
    Maybe<ResolversTypes['DeletedComment']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommentArgs, '_id'>
  >
  deleteCurrentSession?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  deleteLike?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLikeArgs, 'post_id'>
  >
  deletePost?: Resolver<
    Maybe<ResolversTypes['DeletedPost']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostArgs, '_id'>
  >
  deleteSub?: Resolver<
    Maybe<ResolversTypes['DeletedSub']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteSubArgs, 'nickname'>
  >
  makeAccountPrivate?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  makeAccountPublic?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  resetPassword?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationResetPasswordArgs, 'credentials'>
  >
  updateNickname?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateNicknameArgs, 'user'>
  >
  updatePassword?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePasswordArgs, 'credentials'>
  >
  updateProfileInfo?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProfileInfoArgs, 'user'>
  >
}>

export type SubscriptionResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = ResolversObject<{
  commentCreated?: SubscriptionResolver<
    ResolversTypes['Comment'],
    'commentCreated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionCommentCreatedArgs, 'post_id'>
  >
  commentDeleted?: SubscriptionResolver<
    Maybe<ResolversTypes['DeletedComment']>,
    'commentDeleted',
    ParentType,
    ContextType,
    RequireFields<SubscriptionCommentDeletedArgs, 'post_id'>
  >
  eventAdded?: SubscriptionResolver<
    ResolversTypes['Event'],
    'eventAdded',
    ParentType,
    ContextType
  >
  eventDeleted?: SubscriptionResolver<
    Maybe<ResolversTypes['Entity']>,
    'eventDeleted',
    ParentType,
    ContextType
  >
  likeCreated?: SubscriptionResolver<
    ResolversTypes['Like'],
    'likeCreated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionLikeCreatedArgs, 'post_id'>
  >
  likeDeleted?: SubscriptionResolver<
    ResolversTypes['Like'],
    'likeDeleted',
    ParentType,
    ContextType,
    RequireFields<SubscriptionLikeDeletedArgs, 'post_id'>
  >
  postCreated?: SubscriptionResolver<
    ResolversTypes['Post'],
    'postCreated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionPostCreatedArgs, never>
  >
  postDeleted?: SubscriptionResolver<
    Maybe<ResolversTypes['DeletedPost']>,
    'postDeleted',
    ParentType,
    ContextType,
    RequireFields<SubscriptionPostDeletedArgs, never>
  >
  postUpdated?: SubscriptionResolver<
    ResolversTypes['MaybePost'],
    'postUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionPostUpdatedArgs, 'nickname'>
  >
  subAccepted?: SubscriptionResolver<
    ResolversTypes['Sub'],
    'subAccepted',
    ParentType,
    ContextType
  >
  subDeleted?: SubscriptionResolver<
    Maybe<ResolversTypes['DeletedSub']>,
    'subDeleted',
    ParentType,
    ContextType
  >
  subRequestCreated?: SubscriptionResolver<
    ResolversTypes['Sub'],
    'subRequestCreated',
    ParentType,
    ContextType
  >
}>

export type EventResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  kind?: Resolver<ResolversTypes['EventType'], ParentType, ContextType>
  subj?: Resolver<ResolversTypes['EventBody'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type EventBodyResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['EventBody'] = ResolversParentTypes['EventBody']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'SubEventBody' | 'CommentEventBody' | 'LikeEventBody',
    ParentType,
    ContextType
  >
}>

export type SubEventBodyResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['SubEventBody'] = ResolversParentTypes['SubEventBody']
> = ResolversObject<{
  sub?: Resolver<ResolversTypes['Sub'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CommentEventBodyResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['CommentEventBody'] = ResolversParentTypes['CommentEventBody']
> = ResolversObject<{
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type LikeEventBodyResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['LikeEventBody'] = ResolversParentTypes['LikeEventBody']
> = ResolversObject<{
  like?: Resolver<ResolversTypes['Like'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type EventEdgeResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['EventEdge'] = ResolversParentTypes['EventEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Event'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type EventConnectionResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['EventConnection'] = ResolversParentTypes['EventConnection']
> = ResolversObject<{
  edges?: Resolver<
    Array<Maybe<ResolversTypes['EventEdge']>>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type LikeResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type PostResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  isLikedByMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  likesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  commentsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  comments?: Resolver<
    ResolversTypes['CommentConnection'],
    ParentType,
    ContextType,
    RequireFields<PostCommentsArgs, 'first'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type PostEdgeResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type PostConnectionResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<
    Array<Maybe<ResolversTypes['PostEdge']>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type DeletedPostResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['DeletedPost'] = ResolversParentTypes['DeletedPost']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MaybePostResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['MaybePost'] = ResolversParentTypes['MaybePost']
> = ResolversObject<{
  __resolveType: TypeResolveFn<'Post' | 'DeletedPost', ParentType, ContextType>
}>

export type SubResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Sub'] = ResolversParentTypes['Sub']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  from?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  to?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  accepted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type SubEdgeResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['SubEdge'] = ResolversParentTypes['SubEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Sub'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type SubConnectionResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['SubConnection'] = ResolversParentTypes['SubConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<
    Array<Maybe<ResolversTypes['SubEdge']>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type DeletedSubResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['DeletedSub'] = ResolversParentTypes['DeletedSub']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  from?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  to?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<ResolversTypes['Description'], ParentType, ContextType>
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  mySub?: Resolver<Maybe<ResolversTypes['Sub']>, ParentType, ContextType>
  postsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  subsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  subscribersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type DescriptionResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Description'] = ResolversParentTypes['Description']
> = ResolversObject<{
  birthday?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserEdgeResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserConnectionResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  edges?: Resolver<
    Array<Maybe<ResolversTypes['UserEdge']>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type EntityResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Entity'] = ResolversParentTypes['Entity']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type EdgeResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'CommentEdge' | 'EventEdge' | 'PostEdge' | 'SubEdge' | 'UserEdge',
    ParentType,
    ContextType
  >
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
}>

export type PageInfoResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = ResolversObject<{
  startCursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  endCursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ConnectionResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | 'CommentConnection'
    | 'EventConnection'
    | 'PostConnection'
    | 'SubConnection'
    | 'UserConnection',
    ParentType,
    ContextType
  >
  edges?: Resolver<
    Array<Maybe<ResolversTypes['Edge']>>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
}>

export type Resolvers<
  ContextType = {user: UserDbObject; token: string}
> = ResolversObject<{
  Comment?: CommentResolvers<ContextType>
  CommentEdge?: CommentEdgeResolvers<ContextType>
  CommentConnection?: CommentConnectionResolvers<ContextType>
  DeletedComment?: DeletedCommentResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Event?: EventResolvers<ContextType>
  EventBody?: EventBodyResolvers<ContextType>
  SubEventBody?: SubEventBodyResolvers<ContextType>
  CommentEventBody?: CommentEventBodyResolvers<ContextType>
  LikeEventBody?: LikeEventBodyResolvers<ContextType>
  EventEdge?: EventEdgeResolvers<ContextType>
  EventConnection?: EventConnectionResolvers<ContextType>
  Like?: LikeResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  PostEdge?: PostEdgeResolvers<ContextType>
  PostConnection?: PostConnectionResolvers<ContextType>
  DeletedPost?: DeletedPostResolvers<ContextType>
  MaybePost?: MaybePostResolvers<ContextType>
  Sub?: SubResolvers<ContextType>
  SubEdge?: SubEdgeResolvers<ContextType>
  SubConnection?: SubConnectionResolvers<ContextType>
  DeletedSub?: DeletedSubResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Description?: DescriptionResolvers<ContextType>
  UserEdge?: UserEdgeResolvers<ContextType>
  UserConnection?: UserConnectionResolvers<ContextType>
  Date?: GraphQLScalarType
  Entity?: EntityResolvers<ContextType>
  Edge?: EdgeResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  Connection?: ConnectionResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<
  ContextType = {user: UserDbObject; token: string}
> = Resolvers<ContextType>
export type DirectiveResolvers<
  ContextType = {user: UserDbObject; token: string}
> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>
  union?: UnionDirectiveResolver<any, any, ContextType>
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>
  entity?: EntityDirectiveResolver<any, any, ContextType>
  column?: ColumnDirectiveResolver<any, any, ContextType>
  id?: IdDirectiveResolver<any, any, ContextType>
  link?: LinkDirectiveResolver<any, any, ContextType>
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>
  map?: MapDirectiveResolver<any, any, ContextType>
}>

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<
  ContextType = {user: UserDbObject; token: string}
> = DirectiveResolvers<ContextType>
import {ObjectID} from 'mongodb'
export type CommentDbObject = {
  _id: ObjectID
  text: string
  user: UserDbObject['_id']
  post: PostDbObject['_id']
  createdAt: any
}

export type EventDbObject = {
  createdAt: any
  kind: string
  subj: EventBodyDbObject
  _id: ObjectID
  channel: string
  emitter: ObjectID | UserDbObject
}

export type EventBodyDbObject = (
  | SubEventBodyDbObject
  | CommentEventBodyDbObject
  | LikeEventBodyDbObject
) & {}

export type SubEventBodyDbObject = {
  sub: SubDbObject['_id']
}

export type CommentEventBodyDbObject = {
  comment: CommentDbObject['_id']
}

export type LikeEventBodyDbObject = {
  like: LikeDbObject['_id']
}

export type LikeDbObject = {
  _id: ObjectID
  post: PostDbObject['_id']
  user: UserDbObject['_id']
}

export type PostDbObject = {
  _id: ObjectID
  text: string
  createdAt: any
  user: UserDbObject['_id']
}

export type SubDbObject = {
  _id: ObjectID
  from: UserDbObject['_id']
  to: UserDbObject['_id']
  accepted: boolean
}

export type UserDbObject = {
  _id: ObjectID
  nickname: string
  avatar?: Maybe<string>
  description: DescriptionDbObject
  private: boolean
  email: string
  password: string
}

export type DescriptionDbObject = {
  birthday?: Maybe<any>
  about?: Maybe<string>
  from?: Maybe<string>
}
