import { Open } from "@/app/tab-manager"
import { news } from "@/commands/me"
import Placeholder from "@/components/placeholder"
import StateLoader from "@/components/state-loader"
import usePromiseState from "@/promise-state"
import { News as NewsData } from "@bind/News"

export default function News({openTab}: {
    openTab: Open
}) {
    const [state] = usePromiseState(() => news())

    return (
        <Placeholder title='Scratch News'>
                <StateLoader state={state}>{data =>
                    <div className="flex flex-col gap-[1rem] overflow-y-scroll h-[13rem] scrollbar-track-light-main scrollbar scrollbar-thumb-light-primary scrollbar-w-[0.7rem]">{
                        data.map(data =>
                            <NewsItem data={data} openTab={openTab}/>
                        )
                    }</div>
                }</StateLoader>
        </Placeholder>
    )
}

function NewsItem({data, openTab}: {
    data: NewsData
    openTab: Open
}) {
    return (
        <button className="rounded-[0.8rem] p-[0.5rem] bg-white">
            <div className="font-bold text-[1.1rem]">{data.title}</div>
            <div className="text-[0.9rem]">{data.description}</div>
            <div className="text-[0.8rem] text-light-negative-weak">{data.at}</div>
        </button>
    )
}