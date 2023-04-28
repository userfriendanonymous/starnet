import { TabManager } from "./tab-manager"
import { PopupManager } from "./popup-manager"
import { ReactNode } from "react"
import PopupRouter from "@/popup-router"

export default function Popup({tabManager, popupManager}: {
    tabManager: TabManager
    popupManager: PopupManager
}) {
    return (
        popupManager.current ?
        <div className="absolute z-[1] w-[100%] h-[100%] bg-[#00000035] flex items-center justify-center">
            <PopupDisplay popupManager={popupManager}>
                <PopupRouter popupManager={popupManager} route={popupManager.current.route} tabManager={tabManager}/>
            </PopupDisplay>
        </div>

        : null
    )
}

function PopupDisplay({children, popupManager}: {
    children: ReactNode
    popupManager: PopupManager
}) {
    return (
        <div className="p-[1rem] rounded-[1rem] bg-dark-main text-dark-negative-main">
            <div>
                <div className="cursor-pointer h-[1.5rem] w-[1.5rem] flex items-center justify-center rounded-full bg-dark-main"
                    onClick={() => {
                        popupManager.close()
                    }}
                >
                    X
                </div>
            </div>
            <div>{children}</div>
        </div>
    )
}