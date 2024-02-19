"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Label } from "./ui/label"
import { ChevronDown } from "lucide-react"
import PromptCard from "./PromptCard"
import axios from "axios"
import { PromptType } from "@/models/prompt"
import { useToast } from "./ui/use-toast"
import { Skeleton } from "./ui/skeleton"

const Feed = () => {

    const [branch, setBranch] = useState("All")
    const [prompts, setPrompts] = useState<PromptType[]>([])
    const [loading, setloading] = useState(false)

    const { toast } = useToast()

    const fetchPrompts = async () => {
        try {
            setloading(true)
            const res = await axios.get('/api/prompt')
            setPrompts(res.data)
        } catch (err) {
            toast({
                title: "An Error Occured while fetching prompts",
                description: "Please try again later",
                variant: "destructive"
            })
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchPrompts()
    }, [])

    useEffect(() => {
        if (branch == 'All') {
            fetchPrompts()
            return;
        } 

        const fetchPromptsByBranch = async () => {
            try {
                setloading(true)
                const res = await axios.get(`/api/prompt/branch/${branch}`)
                setPrompts(res.data)
            } catch (err) {
                toast({
                    title: "An Error Occured while fetching prompts",
                    description: "Please try again later",
                    variant: "destructive"
                })
            } finally {
                setloading(false)
            }
        }

        fetchPromptsByBranch()
    }, [branch])

  return (
    <section>
        <div className="text-center mb-10 px-10">
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
                        <DropdownMenuRadioItem value="Civil">Civil</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div id="prompts" className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-20 px-3 sm:px-6 md:px-10">
            {!loading && prompts.map((prompt, index) => (
                    <PromptCard key={index} {...prompt} />
                ))
            }
            {loading && Array.from({ length: 4 }).map((_, index) => (
                    <div className="flex flex-col gap-3" key={index}>
                        <Skeleton className="h-[30px]" />
                        <Skeleton className="h-[20px] w-[250px]" />
                        <div>
                            <Skeleton className="h-[250px]" />
                        </div>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Feed