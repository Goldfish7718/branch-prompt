"use client"

import { GitBranch, Info, Menu, Plus, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

const Navbar = () => {

    const scrollToHeader = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const [bannerOpen, setBannerOpen] = useState(true)

    const router = useRouter()
    const pathname = usePathname()

    const handleLogoClick = () => {
        if (pathname !== '/') {
            router.push('/')
        } else {
            scrollToHeader()
        }
    }

  return (
    <nav className="z-10 fixed top-0  w-full">
        {/* BANNER */}
        <div id="banner" className={`p-2 bg-red-600 flex items-center justify-center ${!bannerOpen && 'hidden'}`}>
            <Info size={18} className="mx-1 text-white ml-auto hidden sm:block" />
            <h4 className="text-sm font-light text-white mr-auto text-center">This website only has one maintainer. Please do not spam the feeds with meaningless prompts. Thank you!</h4>
            <X size={18} className="text-white mx-2 hover:cursor-pointer" onClick={() => setBannerOpen(false)} />
        </div>

        {/* NAVBAR */}
        <div className="flex p-4 py-6 sm:p-3 sm:mt-0 sm:text-left justify-between items-center dark:bg-[#0a0a0a] dark:bg-opacity-70 backdrop-blur-sm">
            <div className="flex flex-row items-center">
                <h3 onClick={handleLogoClick} className="hover:cursor-pointer">Branch-Prompt</h3>
                <GitBranch size={24} className="mx-2" />
            </div>

            {/* MOBILE NAVIGATION */}
            <Sheet>
                <SheetTrigger className="sm:hidden">
                    <Menu />
                </SheetTrigger>
                <SheetContent>
                    <div className="my-5 flex flex-col justify-center">
                        <Button onClick={() => router.push('/new')} variant='outline' className="m-2 w-full">New Prompt <Plus size={18} className="mx-1" /></Button>
                        <ModeToggle className="w-full" />
                    </div>
                </SheetContent>
            </Sheet>

            {/* DESKTOP NAVIGATION */}
            <div className="flex-row hidden sm:flex items-center">
                <Button onClick={() => router.push('/new')} variant='outline' className="mx-2">New Prompt <Plus size={18} className="mx-1" /></Button>
                <ModeToggle />
            </div>
        </div>
    </nav>
  )
}

export default Navbar