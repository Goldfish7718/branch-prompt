import { ArrowUpRightFromSquare, Contact, Settings } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import Tooltip from "./Tooltip"
import { PromptType } from "@/models/prompt"

const PropmptCard = ({ title, prompt, tags, contact, branch }: PromptType) => {
  return (
    <Card className="flex flex-col">
        <CardHeader className="p-4 flex flex-row justify-between items-center">
            <CardTitle className="text-lg">{title}</CardTitle>

            <Tooltip label="Open full prompt">
                <Button variant="outline"><ArrowUpRightFromSquare size={18} /></Button>
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

export default PropmptCard