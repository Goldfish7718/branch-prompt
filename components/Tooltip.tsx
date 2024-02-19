import { TooltipProvider, Tooltip as ShadCNTooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface TooltipProps {
    children: React.ReactNode;
    label: string;
}

const Tooltip = ({ children, label }: TooltipProps) => {
  return (
    <TooltipProvider delayDuration={0}>
        <ShadCNTooltip>
            <TooltipTrigger>
                {children}
            </TooltipTrigger>
            <TooltipContent className="dark:bg-[#fafafa] dark:text-muted">
                <p>{label}</p>
            </TooltipContent>
        </ShadCNTooltip>
    </TooltipProvider>
  )
}

export default Tooltip