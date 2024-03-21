import { Schema, model, models } from "mongoose";

export interface CommentType {
    comment: string;
    replyTo: Schema.Types.ObjectId;
}

const commentSchema = new Schema<CommentType>({
    comment: {
        type: String,
        required: true
    },
    replyTo: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Prompt'
    }
})

const Comment = models.Comment || model('Comment', commentSchema);

export default Comment