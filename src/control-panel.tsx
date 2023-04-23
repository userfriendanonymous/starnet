import { useCallback } from "react"
import { Manager as TabManager, Reload as ReloadTab } from "./tab-manager"

export default function ControlPanel({tabManager}: {
    tabManager: TabManager
}) {
    const onReloadTab = useCallback(() => {
        if (tabManager.currentId) {
            tabManager.reload(tabManager.currentId)
        }
    }, [tabManager.reload, tabManager.currentId])

    return (
        <div className="bg-[#ffcaad]">
            <button
                onClick={onReloadTab}
            >
                Reload
            </button>
        </div>
    )
}