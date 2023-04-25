import { State } from "@/use-promise-state"
import { Comment as IComment } from '@bind/Comment'

export default function Comments({data}: {
    data: IComment[]
}) {
    return (
        <div className="flex flex-col gap-[0.7rem] bg-[#eeeeee]">{
            data.map(data => (
                <Comment data={data}/>
            ))
        }</div>
    )
}

function Comment({data}: {
    data: IComment
}) {
    return (
        <div className="flex flex-col p-[0.4rem] gap-[0.4rem] rounded-[1rem] bg-white">
            <div className="flex items-center">
                <div className="text-[1.3rem] font-bold">{data.author.name}</div>
                 | {String(data.author.id)} | {data.modifiedAt}
            </div>

            <div>
                {data.content}
            </div>

            <div>
                {String(data.toUserId)}
            </div>
        </div>
    )
}