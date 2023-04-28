import { ReactNode, useRef } from "react"
import Router from "../tab-router"
import { TabManager } from "./tab-manager"

export default function Tabs({tabManager}: {
    tabManager: TabManager
}) {
    let elements = tabManager.items.map(item => 
        <TabWrapper key={item.id} isOn={item.id == tabManager.currentId}>
            <Router route={item.route} tabManager={tabManager}/>
        </TabWrapper>
    )
    // let elements: ReactNode[] = []
    // tabManager.items.forEach(item => {
    //     if (item.id == tabManager.currentId) {
    //         elements.push(
    //             <TabWrapper key={item.id} isOn={item.id == tabManager.currentId}>
    //                 <Router route={item.route} tabManager={tabManager}/>
    //             </TabWrapper>
    //         )
    //     }
    // })

    return (
        <div className="flex-grow">
            {
                tabManager.currentId ?
                <div className="h-[100%] relative">{elements}</div>
                :
                <div>No tabs are open</div>
            }
        </div>
    )
}

const refs: Map<number, React.MutableRefObject<HTMLElement>> = new Map()

function TabWrapper({children, isOn}: {
    children: ReactNode
    isOn: boolean
}) {
    return (
        <div className={`${isOn ? 'block' : 'hidden'} transition-[10s_all_ease] h-[100%] overflow-y-auto absolute w-[100%]`}>
            <div className="absolute top-0 left-0 right-0 bottom-0 text-light-negative-main bg-light-main">
                {children}
            </div>
        </div>
    )
}