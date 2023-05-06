import { ReactNode } from "react"

export default function Select<I>({children, current, setCurrent}: {
    children: Map<I, ReactNode>
    current: I
    setCurrent: (id: I) => void
}) {
    let items: ReactNode[] = []
    children.forEach((item, i) => 
        items.push(
            <SelectItem onSelect={() => setCurrent(i)} isOn={current == i}>{item}</SelectItem>
        )
    )
    return (
        <div>{items}</div>
    )
}

function SelectItem({children, isOn, onSelect}: {
    children: ReactNode
    isOn: boolean
    onSelect: () => void
}) {
    return (
        <button className={`${isOn ? 'bg-light-primary' : 'bg-light-main'} cursor-pointer p-[1rem]`}
            onClick={() => onSelect()}
        >
            {children}
        </button>
    )
}
