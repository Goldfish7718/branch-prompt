"use client"

import { Label } from "@radix-ui/react-dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog"
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChevronDown, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import Tooltip from "./Tooltip";
import axios from "axios";

interface NewPromptProps {
    children: React.ReactNode;
}

const NewPromptTrigger = ({ children }: NewPromptProps) => {

    const [tags, setTags] = useState<string[]>([])
    const [title, setTitle] = useState('')
    const [prompt, setPrompt] = useState('')
    const [branch, setBranch] = useState('')
    const [contact, setContact] = useState('')

    const [tag, setTag] = useState('')
    const [loading, setLoading] = useState(false)

    const { toast } = useToast()

    const handleTagAdd = () => {
        try {
            if (tags.length === 3)
                toast({
                    title: "You can only add 3 tags!",
                    variant: 'destructive'    
                })
            else if (tag.includes(' '))
                toast({
                    title: "Your tag cannot contain whitespaces",
                    variant: 'destructive'    
                })
            else setTags(prev => [...prev, tag])
        } finally {
            setTag('')
        }
    }

    const removeItemByIndex = (index: number) => {
        setTags(prevItems => {
            return [...prevItems.slice(0, index), ...prevItems.slice(index + 1)];
        });
    };

    const handleClearForm = () => {
        setTag('')
        setTitle('')
        setTags([])
        setPrompt('')
        setContact('')
        setBranch('')
    }

    const requestPostPrompt = async () => {
        try {
            setLoading(true)

            if (!title || !prompt || !branch) {
                toast({
                    title: "Please provide a title, prompt and branch!",
                    variant: "destructive"
                })

                return;
            }

            await axios.post('/api/prompt', {
                tags,
                title,
                prompt,
                branch,
                contact
            })

            toast({
                title: "Your Prompt was posted successfully",
                description: "Refresh to view your prompt"
            })
        } catch (err) {
            toast({
                title: "An Error Occured while posting your prompt",
                description: "Please try again later",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>New Prompt</DialogTitle>
            </DialogHeader>

            <div id="form" className="flex flex-col gap-4">
                <div>
                    <Label className="my-2">Title:</Label>
                    <Input placeholder="Enter Prompt Title" onChange={e => setTitle(e.target.value)} value={title} />
                </div>
                <div>
                    <Label className="my-2">Prompt:</Label>
                    <Textarea placeholder="Enter your prompt here..." onChange={e => setPrompt(e.target.value)} value={prompt} />
                </div>

                <div>
                    <Label className="my-2">Tags:</Label>
                    {tags.length > 0 && tags.map((tag, index) => (
                            <Tooltip label="Click to delete" key={index}>
                                <Badge variant="outline" className="mb-2 mx-1" onClick={() => removeItemByIndex(index)}>{tag}</Badge>
                            </Tooltip>
                        ))  
                    }
                    <div className="flex flex-row gap-2">
                        <Input placeholder="Enter Tags" onChange={e => setTag(e.target.value)} value={tag} />
                        <Button onClick={handleTagAdd}><Plus /></Button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-grow">
                        <Label className="my-2">Select Branch:</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full">
                                <Button className="w-full" variant="outline">{branch ? branch : 'Open'} <ChevronDown size={18} className="mx-1" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Select Branch</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuRadioGroup value={branch} onValueChange={setBranch}>
                                    <DropdownMenuRadioItem value="Computer">Computer</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="AIDS">AIDS</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="IT">IT</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="CSD">CSD</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Mechanical">Mechanical</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Chemical">Chemical</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="E&TC">E&TC</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Robotics">Robotics</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Electrical">Electrical</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Civil">Civil</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div>
                        <Label className="my-2">Contact: (Optional)</Label>
                        <Input placeholder="Phone number or Email" onChange={e => setContact(e.target.value)} value={contact} />
                    </div>
                </div>
            </div>

            <DialogFooter>
                <Button className="w-full m-2" variant="outline" onClick={handleClearForm}>Clear form</Button>
                <DialogClose asChild>
                    <Button className="w-full m-2" onClick={requestPostPrompt} disabled={loading}>
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        {!loading && 'Post prompt'}
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default NewPromptTrigger