import { invoke } from "@tauri-apps/api"
import { useCallback, useEffect, useRef, useState } from "react"
import { Open } from "@/app/tab-manager"
import { User as UserData } from '@bind/User'
import { Project3 as Project3Data } from '@bind/Project3'
import U8Img from '@/u8-img'
import usePromiseState, { State } from "@/use-promise-state"
import {sendUserComment, user, userComments, userCuratingStudios, userFavorites, userIcon, userProjects} from "@/commands/user"
import { projectThumbnail } from "@/commands/project"
import ProjectsCover from "@/components/projectsCover"
import UserIcon from "@/components/userIcon"
import StudiosCover from "@/components/studiosCover"
import Comments from "./comments"

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
        <div>{
            state.is == 'ok' ?
            <div className="p-[1rem] flex flex-col gap-[1rem]">
                <div className="flex gap-[1rem]">
                    <div className="w-[4rem] h-[4rem]">
                        <UserIcon id={Number(state.data.id)} size={100}/>
                    </div>
                    <div className="flex flex-col gap-[0.3rem]">
                        <div className="text-[1.5rem] font-bold">
                            {state.data.scratchTeam ? '*' : ''}
                            {state.data.name}
                        </div>
                        <div className="flex gap-[1rem]">
                            {/* <div>{state.data.}</div> */}
                            <div>{state.data.history.joined}</div>
                            <div className="text-[#969696]">{String(state.data.id)}</div>
                        </div>
                        <div>{state.data.country}</div>
                    </div>
                </div>

                <div className="p-[1rem] flex flex-col gap-[0.5rem] bg-[#f5f5f5] rounded-[1rem]">
                    <div className="font-bold text-[1.3rem]">About Me</div>
                    <div>
                        {state.data.bio}
                    </div>
                </div>

                <div className="p-[1rem] flex flex-col gap-[0.5rem] bg-[#f5f5f5] rounded-[1rem]">
                    <div className="font-bold text-[1.3rem]">What I'm Working On</div>
                    <div>
                        {state.data.status}
                    </div>
                </div>

                <ProjectsCover title="Shared Projects" open={open} state={projects}/>
                <ProjectsCover title="Favorited Projects" open={open} state={favorites}/>
                <StudiosCover title="Curating Studios" open={open} state={curatingStudios}/>

                <div className="flex flex-col gap-[0.4rem]">
                    <div className="text-[1.5rem] font-bold">Send Comment</div>
                    <textarea ref={commentRef}/>
                    <button className="bg-[blue] p-[1rem] text-white" onClick={async () => {
                        await sendUserComment(state.data.name, commentRef.current.value)
                    }}>
                        Send
                    </button>
                </div>

                <Comments open={open} state={comments}/>
            </div>
            : state.is == 'err' ?
            <div>Error</div>
            :
            <div>Loading...</div>
        }</div>
    )
}
