import { Schema, model, models } from "mongoose";

export interface PromptType {
    tags: string[];
    prompt: string;
    branch?: string;
    contact?: string;
    title: string;
}

const promptSchema = new Schema<PromptType>({
    tags: [
        {
            type: String,
            max: 5,
            min: 1,
            required: true,
        }
    ],
    title: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    contact: {
        type: String,
    }
})

const Prompt = models.Prompt || model('Prompt', promptSchema)

export default Prompt;

