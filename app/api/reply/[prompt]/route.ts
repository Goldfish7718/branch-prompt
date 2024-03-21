import Comment, { CommentType } from "@/models/comment";
import connectDB from "@/utils/db";

export const POST = async (req: Request, { params }: any) => {
    try {
        await connectDB()

        const { comment }: CommentType = await req.json()
        const replyTo = params.prompt

        const newComment = await Comment.create({
            comment,
            replyTo
        })

        return new Response(JSON.stringify(newComment), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response("Internal server error", { status: 500 })
    }
}

export const GET = async (req: Request, { params }: any) => {
    try {
        await connectDB()

        const comments = await Comment.find({ replyTo: params.prompt })

        return new Response(JSON.stringify(comments), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response("Internal server error", { status: 500 })
    }
}
