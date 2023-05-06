import { Open } from "@/app/tab-manager"
import { stuffAll, stuffShared, stuffStudios, stuffUnshared } from "@/commands/me"
import StateLoader from "@/components/state-loader"
import usePromiseState from "@/promise-state"
import Items from "./items"
import Project from "./project"
import Studio from "./studio"

export default function Studios({openTab}: {
    openTab: Open
}) {
    const [state] = usePromiseState(() => stuffStudios(1, ''))
    return (
        <div>
            <StateLoader state={state}>{(data) =>
                <Items>{data.map(item => 
                    <Studio data={item} openTab={openTab}/>
                )}</Items>
            }</StateLoader>
        </div>
    )
}