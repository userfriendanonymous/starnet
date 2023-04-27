import { useCallback } from "react"
import TabHandles from "./tab-handles"
import { TabManager } from "./tab-manager"

export default function TopPanel({tabManager}: {
    tabManager: TabManager
}) {
    const newTab = useCallback(() => {
        tabManager.open({to: 'home'}, 'Home')
    }, [tabManager.open])
    
    return (
        <div className="bg-[#24232b] flex items-center h-[2.5rem] justify-between">
            <TabHandles tabManager={tabManager}/>
            <button
                className="h-[100%] hover:bg-[#ffffff1f] active:bg-[#ffffff3a] text-[1.3rem] font-bold text-white flex items-center justify-center w-[2.5rem] cursor-pointer"
                onClick={newTab}
            >
                +
            </button>
        </div>
    )
}