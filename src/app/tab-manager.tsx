import { ReactNode, useCallback, useRef, useState } from "react"
import { useImmer } from "use-immer"
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
    const [items, setItems] = useImmer<{$: Tab[]}>({$: []})
    const tabsHistory = useRef([])
    const [currentId, setCurrentId] = useState<undefined | number>(undefined)
    const id = useRef(0)

    const open = useCallback<Open>((route, title) => {
        id.current++
        setCurrentId(id.current)
        setItems(item => {
            item.$.push({route, id: id.current, title})
        })
        return id.current
    }, [setItems, id, setCurrentId, items])

    const close = useCallback<Close>((closeId) => {
        console.log(closeId)
        setItems((items) => {
            items.$ = items.$.filter(item => item.id != closeId)
            if (items.$.length == 0) {
                setCurrentId(undefined)
                id.current = 0
            } else {
                setCurrentId(items.$[items.$.length - 1].id)
            }
        })
    }, [id, currentId, setItems, items, setCurrentId])

    const reload = useCallback<Reload>((ofId) => {
        setItems(({$}) => {
            for (let item of $) {
                if (item.id == ofId) {
                    id.current++
                    item.id = id.current
                    if (currentId == ofId) {
                        setCurrentId(id.current)
                    }
                    break
                }
            }
        })
    }, [id, setItems, currentId, setCurrentId])

    const set = useCallback<Set>((toId) => {
        setCurrentId(toId)
    }, [])

    return { open, close, set, currentId, items: items.$, reload }
}