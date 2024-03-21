import { ArrowUpRightFromSquare, Contact, Settings } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import Tooltip from "./Tooltip"
import { PromptType } from "@/models/prompt"
import FullPromptTrigger from "./FullPrompt"

const PromptCard = ({ title, prompt, tags, contact, branch, _id }: PromptType) => {

    const fullPromptProps = {
        title,
        prompt,
        tags,
        contact,
        branch, 
        _id,
    }
  
    return (
    <Card className="flex flex-col">
        <CardHeader className="p-4 flex flex-row justify-between items-center">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Tooltip label="Open full prompt">
                <FullPromptTrigger {...fullPromptProps}>
                    <Button variant="outline"><ArrowUpRightFromSquare size={18} /></Button>
                </FullPromptTrigger>
            </Tooltip>
        </CardHeader>
        <Separator />

        <CardContent className="flex-grow p-4">
            <p>{prompt.substring(0, 100) + '...'}</p>
            <div id="tags" className="my-2">
                {tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="mx-1">{tag}</Badge>
                    ))
                }
            </div>
        </CardContent>
        <Separator />

        <CardFooter className="p-3 flex flex-col items-start">
            <Tooltip label={`This prompt is for or by ${branch} branch`}>
                <Button variant="outline" className="my-1"><Settings size={18} className="mx-1" />{branch}</Button>
            </Tooltip>
            {contact &&
                <Tooltip label="Prompter Contact">
                    <Button variant="outline" className="my-1"><Contact size={18} className="mx-1" />{contact}</Button>
                </Tooltip>
            }
        </CardFooter>
    </Card>
  )
}

export default PromptCard