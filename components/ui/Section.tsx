import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                "relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 md:px-12 lg:px-24",
                className
            )}
        >
            {children}
        </section>
    );
}
