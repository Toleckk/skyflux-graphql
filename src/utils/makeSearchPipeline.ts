import Mongoose from 'mongoose'
import {applySpec, join, nth, pipe, split} from 'ramda'
import {makeNGrams} from './makeNGrams'

export const makeSearchPipeline = ({
  text,
  field,
  after = 'Infinity ffffffffffffffffffffffff',
}: {
  text: string
  field: string
  after?: string
}): any[] => {
  const nGrams = join(' ', makeNGrams(text))
  const {score, _id} = parseSearchCursor(after)

  return [
    {$match: {$text: {$search: nGrams}}},
    {
      $addFields: {
        score: {
          $multiply: [
            {$meta: 'textScore'},
            {
              $switch: {
                branches: [
                  {
                    case: {
                      $regexMatch: {regex: `^${text}$`, input: `$${field}`},
                    },
                    then: 3,
                  },
                  {
                    case: {$regexMatch: {regex: text, input: `$${field}`}},
                    then: 2,
                  },
                ],
                default: 1,
              },
            },
          ],
        },
      },
    },
    {$sort: {score: -1, _id: -1}},
    {
      $match: {
        $or: [
          {score: {$lt: score}},
          {$and: [{score}, {_id: {$lt: Mongoose.Types.ObjectId(_id)}}]},
        ],
      },
    },
  ]
}

export const parseSearchCursor: (
  cursor: string,
) => {score: number; _id: string} = pipe(
  split(' '),
  applySpec({
    score: pipe(nth(0), Number) as (arr: string[]) => number,
    _id: nth(1) as (arr: string[]) => string,
  }),
)
