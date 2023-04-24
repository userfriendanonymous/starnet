import { useCallback } from "react"
import TabHandles from "./tab-handles"
import { Manager as TabManager } from "./tab-manager"

export default function TopPanel({tabManager}: {
    tabManager: TabManager
}) {
    const newTab = useCallback(() => {
        tabManager.open({to: 'home'}, 'Home')
    }, [tabManager.open])
    return (
        <div className="bg-[#ffe8d6] flex">
            <TabHandles tabManager={tabManager}/>
            <button
                className="bg-[#fffbf2] px-[1rem]"
                onClick={newTab}
            >
                Open
            </button>
        </div>
    )
}