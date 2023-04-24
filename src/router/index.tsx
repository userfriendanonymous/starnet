import { Manager as TabManager, Open } from "@/app/tab-manager"
import Home from "../tabs/home"
import Project from "../tabs/project"
import Studio from "../tabs/studio"
import User from "../tabs/user"

export type Route = {
    to: 'home'
} | {
    to: 'user'
    name: string
} | {
    to: 'project'
    id: number
} | {
    to: 'studio'
    id: number
}

export default function Router({route, tabManager}: {
    route: Route
    tabManager: TabManager
}) {
    let r
    switch (route.to) {
        case 'home':
            r = <Home open={tabManager.open}/>
            break

        case 'user':
            r = <User open={tabManager.open} name={route.name}/>
            break

        case 'project':
            r = <Project open={tabManager.open} id={route.id}/>
            break

        case 'studio':
            r = <Studio id={route.id}/>
            break
    }

    return r
}