import { TabManager, Open } from "@/app/tab-manager"
import Stuff from "@/tabs/stuff"
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
} | {
    to: 'stuff'
}

export default function TabRouter({route, tabManager}: {
    route: Route
    tabManager: TabManager
}) {
    let r
    switch (route.to) {
        case 'home':
            r = <Home openTab={tabManager.open}/>
            break

        case 'user':
            r = <User open={tabManager.open} name={route.name}/>
            break

        case 'project':
            r = <Project open={tabManager.open} id={route.id}/>
            break

        case 'studio':
            r = <Studio open={tabManager.open} id={route.id}/>
            break

        case 'stuff':
            r = <Stuff openTab={tabManager.open}/>
    }

    return r
}