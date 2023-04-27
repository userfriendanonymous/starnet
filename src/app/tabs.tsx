import { ReactNode } from "react"
import Router from "../tab-router"
import { Manager as TabManager } from "./tab-manager"

export default function Tabs({tabManager}: {
    tabManager: TabManager
}) {
    let elements = tabManager.items.map(item => 
        <TabWrapper key={item.id} isOn={item.id == tabManager.currentId}>
            <Router route={item.route} tabManager={tabManager}/>
        </TabWrapper>
    )

    return (
        <div className="flex-grow">
            {
                tabManager.currentId ?
                <div className="h-[100%]">{elements}</div>
                :
                <div>No tabs are open</div>
            }
        </div>
    )
}

function TabWrapper({children, isOn}: {
    children: ReactNode
    isOn: boolean
}) {
    return (
        <div className="relative h-[100%] overflow-y-auto" style={{
            display: isOn ? 'block' : 'none'
        }}>
            <div className="absolute top-0 left-0 right-0 bottom-0">
                {children}
            </div>
        </div>
    )
}