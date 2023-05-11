import { Open } from "@/app/tab-manager"
import { Route } from "@/tab-router"
import { ReactNode } from "react"

export default function Link({children, open, to, title, dark}: {
    children: ReactNode
    open: Open
    to: Route
    title: string
    dark?: boolean
}) {
    return (
        <span className={`${dark ? 'text-dark-negative-weak' : 'text-light-negative-primary'} cursor-pointer`}
            onClick={() => open(to, title)}
        >
            {children}
        </span>
    )
}

export function UserLink({children, name, open, dark}: {
    children?: ReactNode
    name: string
    open: Open
    dark?: boolean
}) {
    return (
        <Link open={open} to={{to: 'user', name}} title={`${name}'s profile`} dark={dark}>{children ? children : name}</Link>
    )
}

export function ProjectLink({children, id, open, dark}: {
    children: ReactNode
    id: number | bigint
    open: Open
    dark?: boolean
}) {
    return (
        <Link open={open} to={{to: 'project', id: Number(id)}} title={`${Number(id)} project`} dark={dark}>{children}</Link>
    )
}

export function StudioLink({children, id, open, dark}: {
    children: ReactNode
    id: number | bigint
    open: Open
    dark?: boolean
}) {
    return (
        <Link open={open} to={{to: 'studio', id: Number(id)}} title={`${Number(id)} studio`} dark={dark}>{children}</Link>
    )
}