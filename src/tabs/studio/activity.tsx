import { Open } from "@/app/tab-manager"
import { studioActivity } from "@/commands/studio"
import StateLoader from "@/components/state-loader"
import usePromiseState from "@/promise-state"
import { StudioAction } from "@bind/StudioAction"
import { ReactNode } from "react"

export default function Activity({id, open}: {
    id: number
    open: Open
}) {
    const [state] = usePromiseState(() => studioActivity(id, {start: 0, end: null}))
    return (
        <div>
            <StateLoader state={state}>{data => 
                <div>{
                    data.map(data => (
                        <Action data={data}/>
                    ))
                }</div>
            }</StateLoader>
        </div>
    )
}

function Action({data}: {
    data: StudioAction
}) {
    return (
        <div>
            <span className="">{
                data.event.is == 'addProject' ?
                <>
                    <ActionElement>{data.actorName}</ActionElement>
                    <ActionElement>Added project</ActionElement>
                    <ActionElement>{data.event.title}</ActionElement>
                </>
                : 
                <div>Idk</div>
            }</span>
        </div>
    )
}

function ActionElement({children}: {children: ReactNode}) {
    return (
        <span className="px-[0.2rem]">
            {children}
        </span>
    )
}