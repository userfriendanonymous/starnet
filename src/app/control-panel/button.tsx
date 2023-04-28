import { ReactNode } from "react"

export default function Button({onClick, children}: {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children: ReactNode
}) {
    return (
        <button className="cursor-pointer flex items-center justify-center transition-all w-[2rem] h-[2rem] rounded-[0.5rem] hover:bg-dark-active active:bg-dark-fired"
            onClick={onClick}
        >
            {children}
        </button>
    )
}