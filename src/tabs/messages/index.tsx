import { Open } from "@/app/tab-manager"
import { messages } from "@/commands/me"
import { ProjectLink, UserLink } from "@/components/link"
import StateLoader from "@/components/state-loader"
import usePromiseState from "@/promise-state"
import {Message} from '@bind/Message'
import Item from "./item"

export default function Messages({openTab}: {
    openTab: Open
}) {
    const [state] = usePromiseState(() => messages({start: 0, end: null}))

    return (
        <div>
            <div className="w-[100%] h-[5rem] bg-light-primary">
                <div className="text-[2rem]">Messages</div>
            </div>
            <div className="p-[1rem] bg-light-primary flex flex-col gap-[1rem]">
                <StateLoader state={state}>{(data) => 
                    data.map(item => 
                        <Item data={item} openTab={openTab}/>
                    )
                }</StateLoader>
            </div>
        </div>
    )
}