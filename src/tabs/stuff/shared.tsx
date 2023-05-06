import { Open } from "@/app/tab-manager"
import { stuffAll, stuffShared } from "@/commands/me"
import StateLoader from "@/components/state-loader"
import usePromiseState from "@/promise-state"
import Items from "./items"
import Project from "./project"
import ProjectShared from "./projectShared"

export default function Shared({openTab}: {
    openTab: Open
}) {
    const [state] = usePromiseState(() => stuffShared(1, ''))
    return (
        <div>
            <StateLoader state={state}>{(data) =>
                <Items>{data.map(item => 
                    <ProjectShared openTab={openTab} data={item}/>
                )}</Items>
            }</StateLoader>
        </div>
    )
}