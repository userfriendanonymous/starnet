import useTheme from "@/theme"
import { useCallback } from "react"
import { PopupManager } from "../popup-manager"
import { TabManager, Reload as ReloadTab } from "../tab-manager"

export default function ControlPanel({tabManager, popupManager}: {
    tabManager: TabManager
    popupManager: PopupManager
}) {
    const tm = useTheme(({value}) => value)

    const onReloadTab = useCallback(() => {
        if (tabManager.currentId) {
            tabManager.reload(tabManager.currentId)
        }
    }, [tabManager.reload, tabManager.currentId])

    return (
        <div className={`bg-[${tm.dark.background}] h-[2.5rem] flex items-center gap-[2rem] text-[#ffffffd0] px-[0.5rem]`}>
            <button
                className="cursor-pointer transition-all px-[1rem] h-[100%] hover:bg-[#ffffff26]"
                onClick={onReloadTab}
            >
                Reload
            </button>

            <div onClick={() => {
                popupManager.open({to: 'user'})
            }}>
                User
            </div>
        </div>
    )
}