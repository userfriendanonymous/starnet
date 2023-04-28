import { ReactNode } from "react"

export default function Placeholder({children, title}: {
    children: ReactNode
    title: ReactNode
}) {
    return (
        <div className="rounded-[0.5rem] overflow-clip border-light-primary border-[4px]">
            <div className="px-[1rem] py-[0.5rem] bg-light-primary">
                <div className="font-bold text-[1.4rem]">
                    {title}
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}