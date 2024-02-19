import Prompt from "@/models/prompt"

export const GET = async (req: Request, { params }: any) => {
    try {
        const prompts = await Prompt.find({ branch: params.branch })

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (err) {
        console.log(err);
        return new Response("Internal Server Error", { status: 500 })
    }
}