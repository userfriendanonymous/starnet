import { useRef } from "react"
import { Open } from "@/app/tab-manager"
import usePromiseState, { State } from "@/promise-state"
import {followUser, sendUserComment, user, userComments, userCuratingStudios, userFavorites, userProjects} from "@/commands/user"
import UserIcon from "@/components/user/user-icon"
import Comments from "./comments"
import { Data as StudioCoverData } from "@/components/studio/studio-cover"
import Featured from "./featured"
import StateLoader from "@/components/state-loader"
import ProjectsRow from "@/components/project/projects-row"
import StudiosRow from "@/components/studio/studios-row"
import ActionLoader from "@/components/action-loader"
import usePromiseAction from "@/promise-action"

interface Props {
    name: string
    open: Open
}

export default function User({open, name}: Props) {
    const [state] = usePromiseState(() => user(name))
    const [projects] = usePromiseState(() => userProjects(name, {start: 0, end: 5}))
    const [favorites] = usePromiseState(() => userFavorites(name, {start: 0, end: 5}))
    const [curatingStudios] = usePromiseState(() => userCuratingStudios(name, {start: 0, end: 5}))
    const commentRef = useRef<HTMLTextAreaElement>(null!)
    const [comments] = usePromiseState(() => userComments(name, 1))

    return (
        <div className="p-[1rem] flex flex-col gap-[1rem]">
            <div className="flex justify-between">
                <StateLoader state={state}>{data => <div className="flex gap-[1rem]">
                    <div className="w-[4rem] h-[4rem]">
                        <UserIcon id={Number(data.id)} size={100}/>
                    </div>

                    <div className="flex flex-col gap-[0.3rem]">
                        <div className="text-[1.5rem] font-bold">
                            {data.scratchTeam ? '*' : ''}
                            {data.name}
                        </div>

                        <div className="flex gap-[1rem]">
                            <div>{data.history.joined}</div>
                            <div>{String(data.id)}</div>
                        </div>
                        <div>{data.country}</div>
                    </div>
                </div>}</StateLoader>

                <div className="flex flex-col gap-[0.5rem]">
                    <ActionLoader fn={() => followUser(name)} ok={() => {}} err={() => {}}>{(run, isLoading) => 
                        <div onClick={run} className="bg-light-primary w-[7.5rem] h-[2.5rem] flex items-center rounded-[0.5rem] justify-center cursor-pointer font-bold">
                            {isLoading ? 'Loading' : 'Follow'}
                        </div>
                    }</ActionLoader>
                    
                    <div className="border-light-danger border-[2px] h-[2.5rem] flex items-center rounded-[0.5rem] px-[2rem] cursor-pointer font-bold">
                        Report
                    </div>
                </div>
            </div>

            <div className="flex gap-[1rem]">
                <div className="flex flex-col gap-[0.7rem]">
                    <div className="p-[1rem] flex flex-col gap-[0.5rem] bg-light-weak rounded-[1rem]">
                        <div className="font-bold text-[1.3rem]">About Me</div>
                        <StateLoader state={state}>{data => 
                            <div>{data.bio}</div>
                        }</StateLoader>
                    </div>

                    <div className="p-[1rem] flex flex-col gap-[0.5rem] bg-light-weak rounded-[1rem]">
                        <div className="font-bold text-[1.3rem]">What I'm Working On</div>
                        <StateLoader state={state}>{data => 
                            <div>{data.status}</div>
                        }</StateLoader>
                    </div>
                </div>

                <Featured name={name}/>
            </div>

            <ProjectsRow title="Shared Projects" openTab={open} state={projects}/>
            <ProjectsRow title="Favorited Projects" openTab={open} state={favorites}/>
            <StudiosRow title="Curating Studios" openTab={open} state={curatingStudios as State<StudioCoverData[], any>}/>

            <div className="flex flex-col gap-[0.4rem]">
                <div className="text-[1.5rem] font-bold">Send Comment</div>
                <textarea ref={commentRef}/>
                <StateLoader state={state}>{data =>
                    <button className="bg-light-active p-[1rem]" onClick={async () => {
                        await sendUserComment(data.name, {
                            content: commentRef.current.value,
                            parentId: null,
                            toId: null
                        })
                    }}>Send</button>
                }</StateLoader>
            </div>

            <Comments open={open} state={comments}/>
        </div>
    )
}
