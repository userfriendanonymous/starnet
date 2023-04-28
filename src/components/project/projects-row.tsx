import { Open } from "@/app/tab-manager"
import { State } from "@/promise-state"
import { Project3 } from "@bind/Project3"
import Placeholder from "../placeholder"
import StateLoader from "../state-loader"
import ProjectCover, { ProjectCoverData } from "./project-cover"


export default function ProjectsRow({state, openTab, title}: {
    state: State<ProjectCoverData[], any>
    openTab: Open
    title: string
}) {
    return (
        <Placeholder title={title}>
            <div className="flex gap-[0.4rem] overflow-x-scroll">
                <StateLoader state={state}>{data => 
                    data.map(data => <ProjectCover open={openTab} data={data}/>)
                }</StateLoader>
            </div>
        </Placeholder>
    )
}