import { Open } from "@/app/tab-manager"
import { State } from "@/promise-state"
import StateLoader from "../state-loader"
import StudioCover, { Data } from "./studio-cover"

export default function StudiosRow<E>({state, openTab, title}: {
    state: State<Data[], E>
    openTab: Open
    title: string
}) {
    return (
        <div className="bg-[#f4f4f4] flex flex-col p-[1rem] gap-[0.8rem] rounded-[1rem]">
            <div className="font-bold text-[1.3rem]">{title}</div>
            <div className="flex gap-[0.4rem] overflow-x-scroll">
                <StateLoader state={state}>{data => data.map(data => (
                    <StudioCover open={openTab} data={data}/>
                ))}</StateLoader>
            </div>
        </div>
    )
}