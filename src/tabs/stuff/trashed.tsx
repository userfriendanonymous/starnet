import { Open } from "@/app/tab-manager"
import { stuffTrashed } from "@/commands/me"
import StateLoader from "@/components/state-loader"
import usePromiseState from "@/promise-state"
import Items from "./items"
import Project from "./project"

export default function Trashed({openTab}: {
    openTab: Open
}) {
    const [state] = usePromiseState(() => stuffTrashed(1, ''))
    return (
        <div>
            <StateLoader state={state}>{(data) =>
                <Items>{data.map(item => 
                    <Project openTab={openTab} data={item}/>
                )}</Items>
            }</StateLoader>
        </div>
    )
}