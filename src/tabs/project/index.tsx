import { invoke } from "@tauri-apps/api"
import { useCallback, useEffect, useState } from "react"
import { Open } from "../../tab-manager"
import { Project as ProjectData } from '@bind/Project'
import U8Img from '@/u8-img'
import usePromiseState from "@/use-promise-state"

interface Props {
    id: number
    open: Open
}

export default function Project({open, id}: Props) {
    const [state] = usePromiseState(() => )

    return (
        <div>
            {
                state.is == 'ok' ?
                <div className="p-[1rem] flex flex-col gap-[1rem]">
                    <div className="flex gap-[0.7rem] items-center">
                        <U8Img src={state.data.authorIcon}/>
                        <div>
                            <div className="text-[1.5rem]">{state.data.title}</div>
                            <span>
                                by
                                <div className="text-[blue] cursor-pointer" onClick={() => {
                                    open({to: 'user', name: state.data.authorName}, 'Project Author - ' + state.data.authorName)
                                }}>
                                    {state.data.authorName}
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
                : state.is == 'error' ?
                <div>Error</div>
                :
                <div>Loading...</div>
            }
        </div>
    )
}