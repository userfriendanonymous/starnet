import { useCallback, useState } from "react"
import { useImmer } from "use-immer"
import TabHandles from "./tab-handles"
import useTabManager from "./tab-manager"
import Tabs from "./tabs"
import Home from "../tabs/home"
import { Route } from "../tab-router"
import ControlPanel from "./control-panel"
import TopPanel from "./top-panel"
import usePopupManager from "./popup-manager"
import Popup from "./popup"

export default function App() {
    const tabManager = useTabManager()
    const popupManager = usePopupManager()

    return (
        <main className="h-[100vh] relative">
            <Popup popupManager={popupManager} tabManager={tabManager}/>
            <div className="flex flex-col w-[100%] h-[100%] absolute">
                <TopPanel tabManager={tabManager}/>
                <ControlPanel tabManager={tabManager} popupManager={popupManager}/>
                <Tabs tabManager={tabManager}/>
            </div>
        </main>
    )
}