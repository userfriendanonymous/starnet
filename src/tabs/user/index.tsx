import { useRef } from "react"
import { Open } from "@/app/tab-manager"
import usePromiseState, { State } from "@/use-promise-state"
import {sendUserComment, user, userComments, userCuratingStudios, userFavorites, userProjects} from "@/commands/user"
import UserIcon from "@/components/user/user-icon"
import Comments from "./comments"
import { Data as StudioCoverData } from "@/components/studio/studio-cover"
import Featured from "./featured"
import StateLoader from "@/components/state-loader"
import ProjectsRow from "@/components/project/projects-row"
import StudiosRow from "@/components/studio/studios-row"

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
    const [comments] = usePromiseState(() => userComments(name, {start: 0, end: 5}))

    return (
        <div className="p-[1rem] flex flex-col gap-[1rem]">
            <div>
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
                            <div className="text-[#969696]">{String(data.id)}</div>
                        </div>
                        <div>{data.country}</div>
                    </div>
                </div>}</StateLoader>
            </div>

            <div className="flex gap-[1rem]">
                <div className="flex flex-col gap-[0.7rem]">
                    <div className="p-[1rem] flex flex-col gap-[0.5rem] bg-[#f5f5f5] rounded-[1rem]">
                        <div className="font-bold text-[1.3rem]">About Me</div>
                        <StateLoader state={state}>{data => 
                            <div>{data.bio}</div>
                        }</StateLoader>
                    </div>

                    <div className="p-[1rem] flex flex-col gap-[0.5rem] bg-[#f5f5f5] rounded-[1rem]">
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
                    <button className="bg-[blue] p-[1rem] text-white" onClick={async () => {
                        await sendUserComment(data.name, commentRef.current.value)
                    }}>Send</button>
                }</StateLoader>
            </div>

            <Comments open={open} state={comments}/>
        </div>
    )
}
