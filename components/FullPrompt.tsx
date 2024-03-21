import { PromptType } from "@/models/prompt"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Contact, MessagesSquare, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios";
import { useEffect, useState } from "react";
import { CommentType } from "@/models/comment";
import { ScrollArea } from "./ui/scroll-area";

interface FullPromptProps extends PromptType {
    children: React.ReactNode;
}

const FullPromptTrigger = ({ title, prompt, tags, branch, contact, children, _id }: FullPromptProps) => {

    const [comments, setComments] = useState<CommentType[]>([])

    const fetchComments = async () => {
        try {
            const res = await axios.get(`/api/reply/${_id}`)
            console.log(res.data);
            setComments(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="prompt">
                <TabsList className="w-full flex justify-evenly">
                    <TabsTrigger className="w-full" value="prompt">Prompt</TabsTrigger>
                    <TabsTrigger className="w-full" value="comments">Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="prompt">
                    <div className="flex flex-col gap-3 items-start">
                        <p>
                            {prompt}
                        </p>

                        <div id="tags" className="my-2">
                        {tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="mx-1">{tag}</Badge>
                            ))
                        }
                        </div>

                        <Button variant="outline"><Settings size={18} className="mx-1" />{branch}</Button>
                        {contact && <Button variant="outline"><Contact size={18} className="mx-1" />{contact}</Button>}
                    </div>
                </TabsContent>
                <TabsContent value="comments">
                    <ScrollArea className="h-96 w-full">
                        <div className="p-3 border rounded-md m-2">
                            <p className="flex items-center">{comments.length} comments <MessagesSquare size={24} className="mx-2" /></p>
                        </div>
                        {comments.length > 0 ? comments.map((comment, index) => (
                            <div key={index} className="p-3 border rounded-md m-2">
                                <p>{comment.comment}</p>
                            </div> 
                        )) : ( 
                            <div className="p-3 border rounded-md my-1">
                                <p>No Comments</p>
                            </div>  
                        )}
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </DialogContent>
    </Dialog>
  )
}

export default FullPromptTrigger