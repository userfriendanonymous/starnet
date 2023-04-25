import { Open } from "@/app/tab-manager"
import { studioComments } from "@/commands/studio"
import CommentsDisplay from '@/components/comments'
import usePromiseState from "@/use-promise-state"

export default function Comments({id}: {
    id: number
    open: Open
}) {
    const [state] = usePromiseState(() => studioComments(id, {start: 0, end: 30}))
    return (
        <div>{
            state.is == 'ok' ?
            <CommentsDisplay data={state.data}/>
            : state.is == 'loading' ?
            <div>Loading...</div>
            :
            <div>Error</div>
        }</div>
    )
}