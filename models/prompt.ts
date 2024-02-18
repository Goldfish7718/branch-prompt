import { Schema, model, models } from "mongoose";

export interface PromptType {
    tags: string[];
    prompt: string;
    branch?: string;
    contact?: string;
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
    prompt: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        default: "N/A"
    },
    contact: {
        type: String,
        default: "N/A"
    }
})

const Prompt = models.Prompt || model('Prompt', promptSchema)

export default Prompt;

