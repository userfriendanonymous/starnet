import { PopupManager } from "@/app/popup-manager"
import { TabManager } from "@/app/tab-manager"
import User from "@/popups/user"

export type Route = {
    to: 'user'
}

export default function PopupRouter({route, tabManager, popupManager}: {
    route: Route
    tabManager: TabManager
    popupManager: PopupManager
}) {
    let e
    switch (route.to) {
        case 'user':
            e = <User popupManager={popupManager} tabManager={tabManager}/>; break
    }

    return e
}