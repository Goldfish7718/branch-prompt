"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Label } from "./ui/label"
import { ChevronDown } from "lucide-react"
import PropmptCard from "./PromptCard"
import axios from "axios"
import { PromptType } from "@/models/prompt"

const Feed = () => {

    const [branch, setBranch] = useState("")
    const [prompts, setPrompts] = useState<PromptType[]>([])

    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const res = await axios.get('/api/prompt')
                setPrompts(res.data)
            } catch (err) {
                console.log(err);
            }
        }

        fetchPrompts()
    }, [])

  return (
    <section className="px-10">
        <div className="text-center mb-10">
            <Label className="mx-2">Filter by Branch:</Label>
            <DropdownMenu>
                <DropdownMenuTrigger className="w-auto">
                    <Button variant="outline">{branch ? branch : 'Open'} <ChevronDown size={18} className="mx-1" /></Button>
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
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div id="prompts" className="grid grid-cols-4 gap-4">
            {prompts.map(prompt => (
                    <PropmptCard {...prompt} />
                ))
            }
        </div>
    </section>
  )
}

export default Feed