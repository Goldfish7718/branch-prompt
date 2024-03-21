import { PromptType } from "@/models/prompt"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMediaQuery } from 'usehooks-ts'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { useState } from "react";
import axios from "axios";
import { toast } from "./ui/use-toast";

interface CommentInputTriggerProps extends PromptType {
    children: React.ReactNode;
    _id: string;
}

const CommentInputTrigger = ({ children, _id }: CommentInputTriggerProps) => {

    const [comment, setComment] = useState('')
    const isMobile = useMediaQuery('(min-width: 640px)')

    const requestPostComment = async () => {
        try {
            await axios.post(`/api/reply/${_id}`, { comment })
            toast({
                title: "Comment posted successfully",
                duration: 3000
            })
        } catch (err) {
            toast({
                title: "An Error occured while posting your comment",
                description: "Please try again",
                duration: 3000,
                variant: 'destructive'
            })
        }
    }

    if (isMobile)
        return (
            <>
                <Dialog>
                    <DialogTrigger>
                        {children}
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Comment</DialogTitle>
                            <DialogDescription>Comment on post #{_id}</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-2">
                            <Label>Comment:</Label>
                            <Input onChange={e => setComment(e.target.value)} />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onClick={requestPostComment}>Comment</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant='secondary'>Cancel</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>
        )

    return (
        <>
            <Drawer>
                <DrawerTrigger>
                    {children}
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Comment</DrawerTitle>
                        <DrawerDescription>Comment on post #{_id}</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 flex flex-col gap-2">
                        <Label>Comment:</Label>
                        <Input onChange={e => setComment(e.target.value)} />
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button onClick={requestPostComment}>Comment</Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Button variant='secondary'>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default CommentInputTrigger