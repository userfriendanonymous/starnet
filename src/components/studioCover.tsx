import { Open } from '@/app/tab-manager'
import { projectThumbnail } from '@/commands/project'
import { studioThumbnail } from '@/commands/studios'
import U8Img from '@/u8-img'
import usePromiseState from '@/use-promise-state'
import { Studio } from '@bind/Studio'

export default function StudioCover({
    data, open
}: {
    data: Studio
    open: Open
}) {
    const [thumbnail] = usePromiseState(() => studioThumbnail(Number(data.id), 200, 200))

    return (
        <div className='w-[10rem] h-[11rem] cursor-pointer' onClick={() => {
            open({to: 'studio', id: Number(data.id)}, 'Studio')
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

            <div className='text-[1rem] text-[#8f8f8f]'>
                {String(data.id)}
            </div>
        </div>
    )
}