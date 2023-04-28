import { Open } from "@/app/tab-manager"
import { frontPage, projectsLovedByFollowing, projectsSharedByFollowing, viewedProjects } from "@/commands/me"
import ProjectsRow from "@/components/project/projects-row"
import StudiosRow from "@/components/studio/studios-row"
import usePromiseState, { alteredState } from "@/promise-state"

export default function FrontPage({openTab}: {
    openTab: Open
}) {
    const [state] = usePromiseState(() => frontPage())

    const [lovedByFollowing] = usePromiseState(() => projectsLovedByFollowing({start: 0, end: null}))
    const [sharedByFollowing] = usePromiseState(() => projectsSharedByFollowing({start: 0, end: null}))
    const [viewedProjectsState] = usePromiseState(() => viewedProjects({start: 0, end: null}))

    return (
        <div className="flex flex-col p-[1rem] gap-[1rem]">
            {
                lovedByFollowing.is == 'ok' ? <>
                    <ProjectsRow openTab={openTab} state={lovedByFollowing} title='Loved by Following'/>
                    <ProjectsRow openTab={openTab} state={sharedByFollowing} title='Shared by Following'/>
                    <ProjectsRow openTab={openTab} state={viewedProjectsState} title='Viewed Projects'/>
                </>
                : null
            }
            <ProjectsRow openTab={openTab} state={alteredState(state, (data) => data.featuredProjects)} title='Featured'/>
            <StudiosRow openTab={openTab} state={alteredState(state, (data) => data.featuredStudios)} title='Featured Studios'/>
            <ProjectsRow openTab={openTab} state={alteredState(state, (data) => data.curatedProjects)} title='Curated'/>
            <ProjectsRow openTab={openTab} state={alteredState(state, (data) => data.designStudioProjects)} title='Design Studio'/>
            <ProjectsRow openTab={openTab} state={alteredState(state, (data) => data.mostRemixedProjects)} title='Most Remixed'/>
            <ProjectsRow openTab={openTab} state={alteredState(state, (data) => data.mostLovedProjects)} title='Most Loved'/>
            <ProjectsRow openTab={openTab} state={alteredState(state, (data) => data.newProjects)} title='New'/>
        </div>
    )
}