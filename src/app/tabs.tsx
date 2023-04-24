import { ReactElement, ReactNode } from "react"
import Router, { Route } from "../router"
import { Manager as TabManager, Open, Tab } from "./tab-manager"

export default function Tabs({tabManager}: {
    tabManager: TabManager
}) {

    let elements: ReactNode[] = []
    tabManager.items.forEach(item => {
        let e = <Router route={item.route} tabManager={tabManager}/>
        if (item.id == tabManager.currentId) {
            elements.push(<div key={item.id}>{e}</div>)
        } else {
            elements.push(<div key={item.id} className="hidden">{e}</div>)
        }
    })
    return (
        <div>
            {
                tabManager.currentId ?
                <div>{elements}</div>
                :
                <div>No tabs are open</div>
            }
        </div>
    )
}