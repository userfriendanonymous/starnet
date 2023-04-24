import { Open } from "@/app/tab-manager"
import { State } from "@/use-promise-state"
import { Project3 } from "@bind/Project3"
import ProjectCover from "./projectCover"


export default function ProjectsCover({state, open, title}: {
    state: State<Project3[], any>
    open: Open
    title: string
}) {
    return (
        <div className="bg-[#f4f4f4] flex flex-col p-[1rem] gap-[0.8rem] rounded-[1rem]">
            <div className="font-bold text-[1.3rem]">{title}</div>
            <div className="flex gap-[0.4rem] overflow-x-scroll">{
                state.is == 'ok' ?
                state.data.map(data => <ProjectCover open={open} data={data}/>)

                : state.is == 'loading' ?
                <div>LOADING...</div>

                :
                <div>Error</div>
            }</div>
        </div>
    )
}