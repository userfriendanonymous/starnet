import { Open } from "@/app/tab-manager"
import { studioProjects } from "@/commands/studio"
import ProjectCover, { ProjectCoverData } from "@/components/project/project-cover"
import StateLoader from "@/components/state-loader"
import usePromiseState, { State } from "@/use-promise-state"

export default function Projects({id, open}: {
    id: number
    open: Open
}) {
    const [state] = usePromiseState(() => studioProjects(id, {start: 0, end: 10}))
    return (
        <div className="flex flex-wrap gap-[0.7rem]">
            <StateLoader state={state}>{data => data.map(data => (
                <ProjectCover open={open} data={data as ProjectCoverData}/>
            ))}</StateLoader>
        </div>
    )
}