import { PromptType } from "@/models/prompt"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Tooltip from "./Tooltip";
import { Contact, Settings } from "lucide-react";

interface FullPromptProps extends PromptType {
    children: React.ReactNode;
}

const FullPromptTrigger = ({ title, prompt, tags, branch, contact, children }: FullPromptProps) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

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
        </DialogContent>
    </Dialog>
  )
}

export default FullPromptTrigger