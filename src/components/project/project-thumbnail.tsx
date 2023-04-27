import { projectThumbnail } from "@/commands/project"
import U8Img from "@/components/u8-img"
import usePromiseState from "@/use-promise-state"

export default function ProjectThumbnail({id, width, height}: {
    width: number
    height: number
    id: number
}) {
    const [state] = usePromiseState(() => projectThumbnail(id, width, height))

    return (
        <div className="w-[100%] h-[100%]">{
            state.is == 'ok' ? 
            <U8Img
                src={state.data}
                inner={{
                    className: 'w-[100%] h-[100%]'
                }}
            />

            : state.is == 'loading' ?
            <div>Loading...</div>

            :
            <div>Error</div>
        }</div>
    )
}