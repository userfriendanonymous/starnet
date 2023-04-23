import { invoke } from "@tauri-apps/api"
import { useCallback, useEffect, useState } from "react"
import { Open } from "../../tab-manager"
import { User as UserData } from '@bind/User'
import U8Img from '@/u8-img'
import usePromiseState from "@/use-promise-state"

interface Props {
    name: string
    open: Open
}

export default function User({open, name}: Props) {
    const [state] = usePromiseState<UserData, unknown>(() => invoke('user', {name}))

    return (
        <div>
            {
                state.is == 'ok' ?
                <div className="p-[1rem] flex flex-col gap-[1rem]">
                    <div className="flex gap-[1rem]">
                        <U8Img
                            src={state.data.icon}
                            inner={{
                                className: 'w-[7rem]'
                            }}
                        />
                        <div className="flex flex-col gap-[0.3rem]">
                            <div className="text-[1.5rem] font-bold">
                                {state.data.scratchTeam ? '*' : ''}
                                {state.data.name}
                            </div>
                            <div className="flex gap-[1rem]">
                                {/* <div>{state.data.}</div> */}
                                <div>{state.data.joined}</div>
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

                    <div className="p-[1rem] flex flex-col gap-[0.5rem] bg-[#f5f5f5] rounded-[1rem]">
                        <div className="font-bold text-[1.3rem]">Shared Projects</div>
                        <div>
                            {state.data.status}
                        </div>
                    </div>
                </div>
                : state.is == 'err' ?
                <div>Error</div>
                :
                <div>Loading...</div>
            }
        </div>
    )
}