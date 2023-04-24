import { Open } from "@/app/tab-manager"
import { studioProjects } from "@/commands/studio"
import ProjectCover, { ProjectCoverData } from "@/components/projectCover"
import usePromiseState, { State } from "@/use-promise-state"
import { StudioProject } from '@bind/StudioProject'

export default function Projects({id, open}: {
    id: number
    open: Open
}) {
    const [state] = usePromiseState(() => studioProjects(id, {start: 0, end: 10}))
    return (
        <div className="flex flex-wrap gap-[0.7rem]">{
            state.is == 'ok' ?
            state.data.map(data => (
                <ProjectCover open={open} data={data as ProjectCoverData}/>
            ))

            : state.is == 'loading' ?
            <div>LOADING...</div>

            :
            <div>Error</div>
        }</div>
    )
}