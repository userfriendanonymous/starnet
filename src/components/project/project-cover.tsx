import { Open } from '@/app/tab-manager'
import { projectThumbnail } from '@/commands/project'
import U8Img from '@/components/u8-img'
import usePromiseState from '@/promise-state'
import { Project3 } from '@bind/Project3'

export interface ProjectCoverData {
    id: bigint
    title: string
}

export default function ProjectCover({
    data, open
}: {
    data: ProjectCoverData
    open: Open
}) {
    const [thumbnail] = usePromiseState(() => projectThumbnail(Number(data.id), 200, 200))

    return (
        <div className='w-[10rem] flex-shrink-0 h-[11rem] cursor-pointer p-[1px]' onClick={() => {
            open({to: 'project', id: Number(data.id)}, 'Project')
        }}>
            <div className='w-[100%] h-[7rem]'>{
                thumbnail.is == 'ok' ?
                <U8Img src={thumbnail.data}
                    inner={{
                        className: 'w-[100%] h-[100%] object'
                    }}
                />

                : thumbnail.is == 'loading' ?
                <div>Loading...</div>

                :
                <div>Error</div>
            }</div>
            <div className='text-[1.2rem] font-semibold text-ellipsis whitespace-nowrap overflow-hidden'>
                {data.title}
            </div>

            <div className='text-[1rem] text-light-negative-weak'>
                {String(data.id)}
            </div>
        </div>
    )
}