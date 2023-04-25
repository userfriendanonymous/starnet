import { useState } from "react"
import { Open } from "@/app/tab-manager"
import usePromiseState from "@/use-promise-state"
import { studio } from "@/commands/studio"
import StudioThumbnail from "@/components/studioThumbnail"
import Projects from "./projects"
import Comments from "./comments"
import Curators from "./curators"
import Activity from "./activity"

type Tab = 'projects' | 'comments' | 'curators' | 'activity'

export default function Studio({open, id}: {
    id: number
    open: Open
}) {
    const [state] = usePromiseState(() => studio(id))
    const [currentTab, setCurrentTab] = useState<Tab>('projects')

    const [projectsChecked, setProjectsChecked] = useState(true)
    const [commentsChecked, setCommentsChecked] = useState(false)
    const [curatorsChecked, setCuratorsChecked] = useState(false)
    const [activityChecked, setActivityChecked] = useState(false)

    const openProjects = () =>
        {setProjectsChecked(true); setCurrentTab('projects')}
    const openComments = () =>
        {setCommentsChecked(true); setCurrentTab('comments')}
    const openCurators = () =>
        {setCuratorsChecked(true); setCurrentTab('curators')}
    const openActivity = () =>
        {setActivityChecked(true); setCurrentTab('activity')}


    return (
        <div>
            <div className="p-[1rem] flex gap-[1rem]">
                <div className="flex flex-col gap-[1rem] w-[18rem]">
                    <div className="w-[100%]">
                        <StudioThumbnail height={150} id={Number(id)} width={120}/>
                    </div>
                    {
                        state.is == 'ok' ?
                        <>
                            <div className="font-bold text-[1.5rem]">
                                {state.data.title}
                            </div>
                            <div className="relative text-[0.85rem] overflow-y-scroll bg-[#f2f2f2] rounded-[1rem] p-[0.7rem] break-words">
                                <div className="relative top-0 left-0 right-0 bottom-0">{state.data.description}</div>
                            </div>
                        </>
                        : state.is == 'loading' ?
                        <div>Loading...</div>
                        :
                        <div>Error</div>
                    }
                </div>

                <div className="flex flex-col gap-[1rem] flex-grow">
                    <div className="flex justify-between items-center">
                        <button className="p-[1rem] rounded-full text-white bg-[#4a40ff]" onClick={openProjects}>Projects</button>
                        <button className="p-[1rem] rounded-full text-white bg-[#4a40ff]" onClick={openComments}>Comments</button>
                        <button className="p-[1rem] rounded-full text-white bg-[#4a40ff]" onClick={openCurators}>Curators</button>
                        <button className="p-[1rem] rounded-full text-white bg-[#4a40ff]" onClick={openActivity}>Activity</button>
                    </div>

                    {projectsChecked && (
                        <MaybeVisible is={currentTab == 'projects'}>
                            <Projects open={open} id={id}/>
                        </MaybeVisible>
                    )}

                    {commentsChecked && (
                        <MaybeVisible is={currentTab == 'comments'}>
                            <Comments open={open} id={id}/>
                        </MaybeVisible>
                    )}

                    {curatorsChecked && (
                        <MaybeVisible is={currentTab == 'curators'}>
                            <Curators open={open} id={id}/>
                        </MaybeVisible>
                    )}

                    {activityChecked && (
                        <MaybeVisible is={currentTab == 'activity'}>
                            <Activity open={open} id={id}/>
                        </MaybeVisible>
                    )}
                </div>
            </div>
        </div>
    )
}

function MaybeVisible({children, is}: {
    children: JSX.Element
    is: boolean
}) {
    return (
        is ?
        <div>{children}</div>
        :
        <div className="hidden">{children}</div>
    )
}