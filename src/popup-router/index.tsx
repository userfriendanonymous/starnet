import { PopupManager } from "@/app/popup-manager"
import { TabManager } from "@/app/tab-manager"
import Auth from "@/popups/auth"
import User from "@/popups/user"

export type Route = {
    to: 'user'
} | {
    to: 'auth'
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
        case 'auth':
            e = <Auth/>
    }

    return e
}