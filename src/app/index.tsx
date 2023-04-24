import { useCallback, useState } from "react"
import { useImmer } from "use-immer"
import TabHandles from "./tab-handles"
import useTabManager from "./tab-manager"
import Tabs from "./tabs"
import Home from "../tabs/home"
import { Route } from "../router"
import ControlPanel from "./control-panel"
import TopPanel from "./top-panel"

export default function App() {
    const tabManager = useTabManager()

    const openAnyTab = useCallback(() => {
        tabManager.open({to: 'home'}, 'Cool home')
    }, [tabManager.open])

    const openTab = useCallback((route: Route, title: string) => {
        tabManager.open(route, title)
    }, [tabManager.open])

    const closeTab = useCallback((id: number) => {
        tabManager.close(id)
    }, [tabManager.close])

    return (
        <div>
            <TopPanel tabManager={tabManager}/>
            <ControlPanel tabManager={tabManager}/>
            <Tabs tabManager={tabManager}/>
        </div>
    )
}