import {PubSubEngine} from 'graphql-subscriptions'
import {PubSub} from 'apollo-server'
import {RedisPubSub} from 'graphql-redis-subscriptions'
import Redis from 'ioredis'

const options = {
  retryStrategy: (times: number): number => Math.min(times * 50, 2000),
}

export const pubsub: PubSubEngine =
  process.env.NODE_ENV === 'production'
    ? new RedisPubSub({
        publisher: new Redis(process.env.REDIS_URL, options),
        subscriber: new Redis(process.env.REDIS_URL, options),
      })
    : new PubSub()
