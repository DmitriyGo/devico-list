import { Schema, model } from 'mongoose'

const todoSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
)

export const Todo = model('Todo', todoSchema)
