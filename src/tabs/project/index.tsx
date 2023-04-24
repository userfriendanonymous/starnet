import { invoke } from "@tauri-apps/api"
import { useCallback, useEffect, useState } from "react"
import { Open } from "@/app/tab-manager"
import { Project as ProjectData } from '@bind/Project'
import U8Img from '@/u8-img'
import usePromiseState from "@/use-promise-state"
import {project, projectThumbnail} from "@/commands/project"
import { userIcon } from "@/commands/user"
import UserIcon from "@/components/userIcon"

interface Props {
    id: number
    open: Open
}

export default function Project({open, id}: Props) {
    const [state] = usePromiseState(() => project(id))

    return (
        <div>{
            state.is == 'ok' ?
            <div className="p-[1rem] flex flex-col gap-[1rem]">
                <div className="flex gap-[0.7rem] items-center">
                    <div className="w-[3rem] h-[3rem]">
                        <UserIcon id={Number(state.data.author.id)} size={80}/>
                    </div>
                    <div>
                        <div className="text-[1.5rem]">{state.data.title}</div>
                        <span>
                            by
                            <div className="text-[blue] cursor-pointer" onClick={() => {
                                open({to: 'user', name: state.data.author.name}, 'Project Author - ' + state.data.author.name)
                            }}>
                                {state.data.author.name}
                            </div>
                        </span>
                    </div>
                </div>

                <div className="flex gap-[0.7rem]">
                    <iframe src={`https://scratch.mit.edu/projects/${state.data.id}/embed`} allowTransparency={true} width="485" height="402" scrolling="no" allowFullScreen/>

                    <div className="flex flex-col gap-[1rem]">
                        <div className="p-[1rem] bg-[#ebebeb] rounded-[1rem]">
                            <div className="font-bold text-[1.3rem]">Instructions</div>
                            <div>{state.data.instructions}</div>
                        </div>

                        <div className="p-[1rem] bg-[#ebebeb] rounded-[1rem]">
                            <div className="font-bold text-[1.3rem]">Notes and Credits</div>
                            <div>{state.data.description}</div>
                        </div>
                    </div>
                </div>

                
            </div>
            : state.is == 'loading' ?
            <div>Loading...</div>
            :
            <div>Error</div>
        }</div>
    )
}