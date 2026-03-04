import { cn } from "@/utils/cn";





export default function Container({ children, className }) {
    return <div className={cn("mx-auto max-w-[1560px] px-3 sm:px-3.5 md:px-6 ", className)}>{children}</div>;
}