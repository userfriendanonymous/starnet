import { ReactNode } from "react"

export default function Items({children}: {
    children: ReactNode[]
}) {
    return (
        <div className="">
            {children.map(item => <Item>{item}</Item>)}
        </div>
    )
}

export function Item({children}: {
    children: ReactNode
}) {
    return (
        <div className="border-[1px] border-light-negative-weak p-[1rem]">
            {children}
        </div>
    )
}