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
  ID: any
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
  ValidatedString: any
}

export type Comment = {
  _id: Scalars['ID']
  text: Scalars['String']
  user: User
  post: Post
  createdAt: Scalars['Date']
}

export type CommentEdge = Edge & {
  cursor: Scalars['ID']
  node: Comment
}

export type CommentConnection = Connection & {
  edges: Array<CommentEdge>
  pageInfo: PageInfo
}

export type DeletedComment = {
  _id: Scalars['ID']
  post: Post
  deleted: Scalars['Boolean']
}

export type Query = {
  comments: CommentConnection
  doesNicknameExist: Scalars['Boolean']
  events: EventConnection
  feed: PostConnection
  me?: Maybe<User>
  post?: Maybe<Post>
  posts: PostConnection
  subRequests: SubConnection
  subRequestsCount: Scalars['Int']
  suggestions: UserConnection
  user?: Maybe<User>
  userPosts: PostConnection
  users?: Maybe<UserConnection>
}

export type QueryCommentsArgs = {
  post_id: Scalars['ID']
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QueryDoesNicknameExistArgs = {
  nickname: Scalars['String']
}

export type QueryEventsArgs = {
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QueryFeedArgs = {
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QueryPostArgs = {
  _id: Scalars['ID']
}

export type QueryPostsArgs = {
  query: Scalars['String']
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QuerySubRequestsArgs = {
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QuerySuggestionsArgs = {
  first: Scalars['Int']
}

export type QueryUserArgs = {
  nickname: Scalars['String']
}

export type QueryUserPostsArgs = {
  nickname: Scalars['String']
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type QueryUsersArgs = {
  query: Scalars['String']
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type CreateComment = {
  post_id: Scalars['ID']
  text: Scalars['String']
}

export type Mutation = {
  acceptSub: Sub
  createComment: Comment
  createLike: Like
  createPost: Post
  createSub: Sub
  declineSub?: Maybe<DeletedSub>
  deleteComment?: Maybe<DeletedComment>
  deleteLike: DeletedLike
  deletePost?: Maybe<DeletedPost>
  deleteSub?: Maybe<DeletedSub>
  makeAccountPrivate: User
  makeAccountPublic: User
  updateNickname: User
  updateProfileInfo: User
}

export type MutationAcceptSubArgs = {
  _id: Scalars['ID']
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

export type MutationCreateSubArgs = {
  nickname: Scalars['String']
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

export type MutationUpdateNicknameArgs = {
  user: UpdateNickname
}

export type MutationUpdateProfileInfoArgs = {
  user: UpdateProfileInfo
}

export type MaybeComment = Comment | DeletedComment

export type Subscription = {
  commentUpdated: MaybeComment
  eventUpdated: MaybeEvent
  feedUpdated: MaybePost
  likeUpdated: MaybeLike
  postUpdated: MaybePost
  postsUpdated: MaybePost
  subsUpdated: MaybeSub
  userUpdated: User
}

export type SubscriptionCommentUpdatedArgs = {
  post_id: Scalars['ID']
}

export type SubscriptionLikeUpdatedArgs = {
  post_id: Scalars['ID']
}

export type SubscriptionPostUpdatedArgs = {
  _id: Scalars['ID']
}

export type SubscriptionPostsUpdatedArgs = {
  ownerId: Scalars['ID']
}

export type SubscriptionSubsUpdatedArgs = {
  from?: Maybe<Scalars['ID']>
  to?: Maybe<Scalars['ID']>
}

export type SubscriptionUserUpdatedArgs = {
  _id: Scalars['ID']
}

export enum EventType {
  Sub = 'Sub',
  Comment = 'Comment',
  Like = 'Like',
}

export type Event = {
  _id: Scalars['ID']
  createdAt: Scalars['Date']
  kind: EventType
  subj: EventBody
}

export type EventBody = SubEventBody | CommentEventBody | LikeEventBody

export type SubEventBody = {
  sub: Sub
}

export type CommentEventBody = {
  comment: Comment
}

export type LikeEventBody = {
  like: Like
}

export type DeletedEvent = {
  _id: Scalars['ID']
  deleted: Scalars['Boolean']
}

export type MaybeEvent = Event | DeletedEvent

export type EventEdge = Edge & {
  cursor: Scalars['ID']
  node: Event
}

export type EventConnection = Connection & {
  edges: Array<EventEdge>
  pageInfo: PageInfo
}

export type Like = {
  _id: Scalars['ID']
  post: Post
  user: User
}

export type DeletedLike = {
  _id: Scalars['ID']
  post: Post
  user: User
  deleted: Scalars['Boolean']
}

export type MaybeLike = Like | DeletedLike

export type Post = {
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
  cursor: Scalars['ID']
  node: Post
}

export type PostConnection = Connection & {
  pageInfo: PageInfo
  edges: Array<PostEdge>
}

export type DeletedPost = {
  _id: Scalars['ID']
  deleted: Scalars['Boolean']
  user: User
}

export type MaybePost = Post | DeletedPost

export type CreatePost = {
  text: Scalars['String']
}

export type Sub = {
  _id: Scalars['ID']
  from: User
  to: User
  accepted: Scalars['Boolean']
}

export type SubEdge = Edge & {
  cursor: Scalars['ID']
  node: Sub
}

export type SubConnection = Connection & {
  pageInfo: PageInfo
  edges: Array<SubEdge>
}

export type DeletedSub = {
  _id: Scalars['ID']
  from: User
  to: User
  deleted: Scalars['Boolean']
}

export type MaybeSub = Sub | DeletedSub

export type User = {
  _id: Scalars['ID']
  nickname: Scalars['String']
  avatar?: Maybe<Scalars['String']>
  description: Description
  private: Scalars['Boolean']
  mySub?: Maybe<Sub>
  postsCount: Scalars['Int']
  subsCount: Scalars['Int']
  subscribersCount: Scalars['Int']
  posts: PostConnection
}

export type UserPostsArgs = {
  first: Scalars['Int']
  after?: Maybe<Scalars['ID']>
}

export type Description = {
  birthday?: Maybe<Scalars['Date']>
  about?: Maybe<Scalars['String']>
  from?: Maybe<Scalars['String']>
}

export type UserEdge = Edge & {
  cursor: Scalars['ID']
  node: User
}

export type UserConnection = Connection & {
  pageInfo: PageInfo
  edges: Array<UserEdge>
}

export type UpdateNickname = {
  nickname: Scalars['String']
}

export type UpdateProfileInfo = {
  avatar?: Maybe<Scalars['String']>
  description: DescriptionInput
}

export type DescriptionInput = {
  birthday?: Maybe<Scalars['String']>
  about?: Maybe<Scalars['String']>
  from?: Maybe<Scalars['String']>
}

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type Entity = {
  _id: Scalars['ID']
}

export type Edge = {
  cursor: Scalars['ID']
}

export type PageInfo = {
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
  ? Partial<Common<Comment, CommentDbObject>>
  : T extends Event
  ? Partial<Common<Event, EventDbObject>>
  : T extends Like
  ? Partial<Common<Like, LikeDbObject>>
  : T extends Post
  ? Partial<Common<Post, PostDbObject>>
  : T extends Sub
  ? Partial<Common<Sub, SubDbObject>>
  : T extends User
  ? Partial<Common<User, UserDbObject>>
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  CreateComment: CreateComment
  Mutation: ResolverTypeWrapper<{}>
  MaybeComment: ResolversTypes['Comment'] | ResolversTypes['DeletedComment']
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
  DeletedEvent: ResolverTypeWrapper<DeletedEvent>
  MaybeEvent: ResolversTypes['Event'] | ResolversTypes['DeletedEvent']
  EventEdge: ResolverTypeWrapper<EventEdge>
  EventConnection: ResolverTypeWrapper<EventConnection>
  Like: ResolverTypeWrapper<Like>
  DeletedLike: ResolverTypeWrapper<DeletedLike>
  MaybeLike: ResolversTypes['Like'] | ResolversTypes['DeletedLike']
  Post: ResolverTypeWrapper<Post>
  PostEdge: ResolverTypeWrapper<PostEdge>
  PostConnection: ResolverTypeWrapper<PostConnection>
  DeletedPost: ResolverTypeWrapper<DeletedPost>
  MaybePost: ResolversTypes['Post'] | ResolversTypes['DeletedPost']
  CreatePost: CreatePost
  Sub: ResolverTypeWrapper<Sub>
  SubEdge: ResolverTypeWrapper<SubEdge>
  SubConnection: ResolverTypeWrapper<SubConnection>
  DeletedSub: ResolverTypeWrapper<DeletedSub>
  MaybeSub: ResolversTypes['Sub'] | ResolversTypes['DeletedSub']
  User: ResolverTypeWrapper<User>
  Description: ResolverTypeWrapper<Description>
  UserEdge: ResolverTypeWrapper<UserEdge>
  UserConnection: ResolverTypeWrapper<UserConnection>
  UpdateNickname: UpdateNickname
  UpdateProfileInfo: UpdateProfileInfo
  DescriptionInput: DescriptionInput
  Date: ResolverTypeWrapper<Scalars['Date']>
  ValidatedString: ResolverTypeWrapper<Scalars['ValidatedString']>
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
  Boolean: Scalars['Boolean']
  Query: {}
  Int: Scalars['Int']
  CreateComment: CreateComment
  Mutation: {}
  MaybeComment:
    | ResolversParentTypes['Comment']
    | ResolversParentTypes['DeletedComment']
  Subscription: {}
  Event: Omit<Event, 'subj'> & {subj: ResolversParentTypes['EventBody']}
  EventBody:
    | ResolversParentTypes['SubEventBody']
    | ResolversParentTypes['CommentEventBody']
    | ResolversParentTypes['LikeEventBody']
  SubEventBody: SubEventBody
  CommentEventBody: CommentEventBody
  LikeEventBody: LikeEventBody
  DeletedEvent: DeletedEvent
  MaybeEvent:
    | ResolversParentTypes['Event']
    | ResolversParentTypes['DeletedEvent']
  EventEdge: EventEdge
  EventConnection: EventConnection
  Like: Like
  DeletedLike: DeletedLike
  MaybeLike: ResolversParentTypes['Like'] | ResolversParentTypes['DeletedLike']
  Post: Post
  PostEdge: PostEdge
  PostConnection: PostConnection
  DeletedPost: DeletedPost
  MaybePost: ResolversParentTypes['Post'] | ResolversParentTypes['DeletedPost']
  CreatePost: CreatePost
  Sub: Sub
  SubEdge: SubEdge
  SubConnection: SubConnection
  DeletedSub: DeletedSub
  MaybeSub: ResolversParentTypes['Sub'] | ResolversParentTypes['DeletedSub']
  User: User
  Description: Description
  UserEdge: UserEdge
  UserConnection: UserConnection
  UpdateNickname: UpdateNickname
  UpdateProfileInfo: UpdateProfileInfo
  DescriptionInput: DescriptionInput
  Date: Scalars['Date']
  ValidatedString: Scalars['ValidatedString']
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

export type ValidateDirectiveArgs = {
  pattern?: Maybe<Scalars['String']>
  error?: Maybe<Scalars['String']>
}

export type ValidateDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = ValidateDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AuthDirectiveArgs = {}

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = {user: UserDbObject; token: string},
  Args = AuthDirectiveArgs
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
    Array<ResolversTypes['CommentEdge']>,
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
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type QueryResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  comments?: Resolver<
    ResolversTypes['CommentConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryCommentsArgs, 'post_id' | 'first'>
  >
  doesNicknameExist?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<QueryDoesNicknameExistArgs, 'nickname'>
  >
  events?: Resolver<
    ResolversTypes['EventConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryEventsArgs, 'first'>
  >
  feed?: Resolver<
    ResolversTypes['PostConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryFeedArgs, 'first'>
  >
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  post?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryPostArgs, '_id'>
  >
  posts?: Resolver<
    ResolversTypes['PostConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryPostsArgs, 'query' | 'first'>
  >
  subRequests?: Resolver<
    ResolversTypes['SubConnection'],
    ParentType,
    ContextType,
    RequireFields<QuerySubRequestsArgs, 'first'>
  >
  subRequestsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  suggestions?: Resolver<
    ResolversTypes['UserConnection'],
    ParentType,
    ContextType,
    RequireFields<QuerySuggestionsArgs, 'first'>
  >
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'nickname'>
  >
  userPosts?: Resolver<
    ResolversTypes['PostConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryUserPostsArgs, 'nickname' | 'first'>
  >
  users?: Resolver<
    Maybe<ResolversTypes['UserConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, 'query' | 'first'>
  >
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
  createSub?: Resolver<
    ResolversTypes['Sub'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSubArgs, 'nickname'>
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
  deleteLike?: Resolver<
    ResolversTypes['DeletedLike'],
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
  updateNickname?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateNicknameArgs, 'user'>
  >
  updateProfileInfo?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProfileInfoArgs, 'user'>
  >
}>

export type MaybeCommentResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['MaybeComment'] = ResolversParentTypes['MaybeComment']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'Comment' | 'DeletedComment',
    ParentType,
    ContextType
  >
}>

export type SubscriptionResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = ResolversObject<{
  commentUpdated?: SubscriptionResolver<
    ResolversTypes['MaybeComment'],
    'commentUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionCommentUpdatedArgs, 'post_id'>
  >
  eventUpdated?: SubscriptionResolver<
    ResolversTypes['MaybeEvent'],
    'eventUpdated',
    ParentType,
    ContextType
  >
  feedUpdated?: SubscriptionResolver<
    ResolversTypes['MaybePost'],
    'feedUpdated',
    ParentType,
    ContextType
  >
  likeUpdated?: SubscriptionResolver<
    ResolversTypes['MaybeLike'],
    'likeUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionLikeUpdatedArgs, 'post_id'>
  >
  postUpdated?: SubscriptionResolver<
    ResolversTypes['MaybePost'],
    'postUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionPostUpdatedArgs, '_id'>
  >
  postsUpdated?: SubscriptionResolver<
    ResolversTypes['MaybePost'],
    'postsUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionPostsUpdatedArgs, 'ownerId'>
  >
  subsUpdated?: SubscriptionResolver<
    ResolversTypes['MaybeSub'],
    'subsUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSubsUpdatedArgs, never>
  >
  userUpdated?: SubscriptionResolver<
    ResolversTypes['User'],
    'userUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionUserUpdatedArgs, '_id'>
  >
}>

export type EventResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
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

export type DeletedEventResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['DeletedEvent'] = ResolversParentTypes['DeletedEvent']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MaybeEventResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['MaybeEvent'] = ResolversParentTypes['MaybeEvent']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'Event' | 'DeletedEvent',
    ParentType,
    ContextType
  >
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
  edges?: Resolver<Array<ResolversTypes['EventEdge']>, ParentType, ContextType>
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

export type DeletedLikeResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['DeletedLike'] = ResolversParentTypes['DeletedLike']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MaybeLikeResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['MaybeLike'] = ResolversParentTypes['MaybeLike']
> = ResolversObject<{
  __resolveType: TypeResolveFn<'Like' | 'DeletedLike', ParentType, ContextType>
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
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>
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
  edges?: Resolver<Array<ResolversTypes['SubEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type DeletedSubResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['DeletedSub'] = ResolversParentTypes['DeletedSub']
> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  from?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  to?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MaybeSubResolvers<
  ContextType = {user: UserDbObject; token: string},
  ParentType extends ResolversParentTypes['MaybeSub'] = ResolversParentTypes['MaybeSub']
> = ResolversObject<{
  __resolveType: TypeResolveFn<'Sub' | 'DeletedSub', ParentType, ContextType>
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
  posts?: Resolver<
    ResolversTypes['PostConnection'],
    ParentType,
    ContextType,
    RequireFields<UserPostsArgs, 'first'>
  >
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
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface ValidatedStringScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['ValidatedString'], any> {
  name: 'ValidatedString'
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
  MaybeComment?: MaybeCommentResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Event?: EventResolvers<ContextType>
  EventBody?: EventBodyResolvers<ContextType>
  SubEventBody?: SubEventBodyResolvers<ContextType>
  CommentEventBody?: CommentEventBodyResolvers<ContextType>
  LikeEventBody?: LikeEventBodyResolvers<ContextType>
  DeletedEvent?: DeletedEventResolvers<ContextType>
  MaybeEvent?: MaybeEventResolvers<ContextType>
  EventEdge?: EventEdgeResolvers<ContextType>
  EventConnection?: EventConnectionResolvers<ContextType>
  Like?: LikeResolvers<ContextType>
  DeletedLike?: DeletedLikeResolvers<ContextType>
  MaybeLike?: MaybeLikeResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  PostEdge?: PostEdgeResolvers<ContextType>
  PostConnection?: PostConnectionResolvers<ContextType>
  DeletedPost?: DeletedPostResolvers<ContextType>
  MaybePost?: MaybePostResolvers<ContextType>
  Sub?: SubResolvers<ContextType>
  SubEdge?: SubEdgeResolvers<ContextType>
  SubConnection?: SubConnectionResolvers<ContextType>
  DeletedSub?: DeletedSubResolvers<ContextType>
  MaybeSub?: MaybeSubResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Description?: DescriptionResolvers<ContextType>
  UserEdge?: UserEdgeResolvers<ContextType>
  UserConnection?: UserConnectionResolvers<ContextType>
  Date?: GraphQLScalarType
  ValidatedString?: GraphQLScalarType
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
  validate?: ValidateDirectiveResolver<any, any, ContextType>
  auth?: AuthDirectiveResolver<any, any, ContextType>
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
  _id: ObjectID
  createdAt: any
  kind: string
  subj: EventBodyDbObject
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
}

export type DescriptionDbObject = {
  birthday?: Maybe<any>
  about?: Maybe<string>
  from?: Maybe<string>
}
