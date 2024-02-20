import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

taskSchema.method('toJSON', function () {
  const { _v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

export default model('Task', taskSchema);
