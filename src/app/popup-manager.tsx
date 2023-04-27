import { Route } from "@/popup-router"
import { useCallback, useState } from "react"

export type Open = (route: Route) => void
export type Close = () => void
export interface Popup {
    route: Route
}
export interface PopupManager {
    readonly current: Popup | undefined
    readonly open: Open
    readonly close: Close
}

export default function usePopupManager(): PopupManager {
    const [current, setCurrent] = useState<Popup | undefined>(undefined)

    const open = useCallback<Open>((route) => {
        setCurrent({route})
    }, [])

    const close = useCallback<Close>(() => {
        setCurrent(undefined)
    }, [])

    return {current, open, close}
}