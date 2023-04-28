import { ReactNode, useCallback, useRef, useState, useTransition } from "react"
import { Route } from "../tab-router"

export type Tab = {
    id: number
    route: Route
    title: string
}

export type Open = (route: Route, title: string) => void
export type Set = (id: number) => void
export type Close = (id: number) => void
export type Reload = (id: number) => void
export type TabManager = {
    open: Open
    close: Close
    set: Set
    currentId: number | undefined
    items: Tab[]
    reload: Reload
}

export default function useTabManager(): TabManager {
    const [items, setItems] = useState<Tab[]>([])
    const tabsHistory = useRef([])
    const [currentId, setCurrentId] = useState<undefined | number>(undefined)
    const id = useRef(0)

    const open = useCallback<Open>((route, title) => {
        id.current++
        setCurrentId(id.current)
        setItems(p => {
            let items = [...p]
            items.push({route, id: id.current, title})
            return items
        })
        
        return id.current
    }, [setItems, id, setCurrentId, items])

    const close = useCallback<Close>((closeId) => {
        console.log(closeId)
        setItems((p) => {
            let items = p.filter(item => item.id != closeId)
            if (items.length == 0) {
                setCurrentId(undefined)
                id.current = 0
            } else {
                setCurrentId(items[items.length - 1].id)
            }
            return items
        })
        
    }, [id, currentId, setItems, items, setCurrentId])

    const reload = useCallback<Reload>((ofId) => {
        setItems((p) => {
            let items = [...p]
            for (let item of items) {
                if (item.id == ofId) {
                    id.current++
                    item.id = id.current
                    if (currentId == ofId) {
                        setCurrentId(id.current)
                    }
                    break
                }
            }
            return items
        })
    }, [id, setItems, currentId, setCurrentId])

    const set = useCallback<Set>((toId) => {
        setCurrentId(toId)
    }, [])

    return { open, close, set, currentId, items, reload }
}