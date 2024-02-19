import { Menu, Plus } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import NewPromptTrigger from "./NewPrompt"

const Navbar = () => {

  return (
    <nav className="p-4 py-6 sm:p-3 sm:mt-0 sm:text-left flex justify-between items-center w-full dark:bg-[#0a0a0a] dark:bg-opacity-70 backdrop-blur-sm">
        <h3>Branch-Prompt</h3>

        {/* MOBILE NAVIGATION */}
        <Sheet>
            <SheetTrigger className="sm:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <div className="my-5 flex flex-col justify-center">
                    <NewPromptTrigger>
                        <Button variant='outline' className="m-2 w-full">New Prompt <Plus size={18} className="mx-1" /></Button>
                    </NewPromptTrigger>
                    <ModeToggle className="w-full" />
                </div>
            </SheetContent>
        </Sheet>

        {/* DESKTOP NAVIGATION */}
        <div className="flex-row hidden sm:flex items-center">
            <NewPromptTrigger>
                <Button variant='outline' className="mx-2">New Prompt <Plus size={18} className="mx-1" /></Button>
            </NewPromptTrigger>
            <ModeToggle />
        </div>
    </nav>
  )
}

export default Navbar