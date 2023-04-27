import { Open } from "@/app/tab-manager"
import { studioCurators, studioManagers } from "@/commands/studio"
import StateLoader from "@/components/state-loader"
import UserIcon from "@/components/user/user-icon"
import usePromiseState, { State } from "@/use-promise-state"
import { User } from "@bind/User"

export default function Curators({id, open}: {
    id: number
    open: Open
}) {
    const [curators] = usePromiseState(() => studioCurators(id, {start: 0, end: 40}))
    const [managers] = usePromiseState(() => studioManagers(id, {start: 0, end: 40}))

    return (
        <div className="flex flex-col gap-[2rem] bg-[#ededed] p-[1rem] rounded-[1rem]">
            <Section state={managers} title='Managers'/>
            <Section state={curators} title='Curators'/>
        </div>
    )
}

function Section<E>({title, state}: {
    state: State<User[], E>
    title: string
}) {
    return (
        <div className="flex flex-col gap-[1rem]">
            <div className="font-bold text-[1.5rem]">{title}</div>
            <div>
                <StateLoader state={state}>{data =>
                    <div className="grid grid-cols-2 gap-[0.5rem]">{
                        data.map(data => (
                            <Curator data={data}/>
                        ))
                    }</div>
                }</StateLoader>
            </div>
        </div>
    )
}

function Curator({data}: {
    data: User
}) {
    return (
        <div className="flex items-center gap-[0.5rem] rounded-[0.6rem] bg-[#ffffff] p-[0.6rem]">
            <div className="w-[4rem] h-[4rem]">
                <UserIcon id={Number(data.id)} size={100}/>
            </div>
            <div className="flex flex-col gap-[0.3rem]">
                <div className="text-[1.2rem] font-bold">{data.name}</div>
                <div>{data.country}</div>
            </div>
        </div>
    )
}