import { Open } from "@/app/tab-manager";
import { State } from "@/use-promise-state";
import { UserComment } from '@bind/UserComment'
import { UserCommentContent } from "@bind/UserCommentContent";
import { UserReply } from "@bind/UserReply";


export default function Comments({state, open}: {
    state: State<UserComment[], any>
    open: Open
}) {
    return (
        <div className="bg-[#f0f0f0] flex flex-col rounded-[1rem] p-[1rem] gap-[1rem]">
            <div className="font-bold text-[1.3rem]">Comments</div>
            
            <div className="flex flex-col gap-[1rem]">{
                state.is == 'ok' ?
                state.data.map(data => <Comment data={data}/>)

                : state.is == 'loading' ?
                <div>Loading...</div>
                :
                <div>Error</div>
            }</div>
        </div>
    )
}



function Reply({data}: {
    data: UserReply
}) {
    return (
        <div className="bg-[white] rounded-[1rem] p-[0.4rem]">
            <div className="flex gap-[0.3rem] items-center">
                <div className="text-[1.2rem] font-bold">{data.authorName}</div>
                <div className="text-[#7a7a7a]">{data.createdAt}</div>
            </div>

            <CommentContent data={data.content}/>
        </div>
    )
}

function Comment({data}: {
    data: UserComment
}) {
    return (
        <div className="flex flex-col gap-[1rem]">
            <Reply data={data as UserReply}/>
            <div className="flex flex-col gap-[0.5rem] pl-[3rem]">{
                data.replies.map(data => <Reply data={data}/>)
            }</div>
        </div>
    )
}

function CommentContent({data}: {
    data: UserCommentContent
}) {
    return (
        <div>{
            data.map(item => (
                item.is == 'text' ?
                <span className="break-words">{item.content}</span>

                : item.is == 'emoji' ?
                <span className="inline-block">
                    <img className="w-[1.5rem] p-[0.1rem] object-contain" src={item.to}/>
                </span>

                :
                <span><a href={item.to}>{item.content}</a></span>
            ))
        }</div>
    )
}