import { Open } from "@/app/tab-manager"
import { news } from "@/commands/me"
import StateLoader from "@/components/state-loader"
import usePromiseState from "@/use-promise-state"
import { News as NewsData } from "@bind/News"

export default function News({openTab}: {
    openTab: Open
}) {
    const [state] = usePromiseState(() => news())

    return (
        <div className="bg-[#f5f5f5] p-[0.8rem] rounded-[1rem] flex flex-col gap-[0.7rem]">
            <div className="font-bold text-[1.5rem]">Scratch News</div>
            <div className="">
                <StateLoader state={state}>{data =>
                    <div className="flex flex-col gap-[1rem] overflow-y-scroll h-[13rem]">{
                        data.map(data =>
                            <NewsItem data={data} openTab={openTab}/>
                        )
                    }</div>
                }</StateLoader>
            </div>
        </div>
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
            <div className="text-[0.8rem] text-[#898989]">{data.at}</div>
        </button>
    )
}