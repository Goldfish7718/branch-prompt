import Prompt, { PromptType } from "@/models/prompt";
import connectDB from "@/utils/db";

export const POST = async (req: Request) => {
    try {

        await connectDB()

        const { branch, prompt, contact, tags, title }: PromptType = await req.json()

        const newPrompt = await Prompt.create({
            branch,
            prompt,
            contact,
            tags,
            title
        })

        return new Response(JSON.stringify(newPrompt), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 })
    }
}

export const GET = async (req: Request) => {
    try {
        await connectDB()

        const prompts = await Prompt.find({})

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 })
    }
}