import { Open } from '@/app/tab-manager'
import { projectThumbnail } from '@/commands/project'
import { studioThumbnail } from '@/commands/studio'
import U8Img from '@/components/u8-img'
import usePromiseState from '@/promise-state'
import { Studio } from '@bind/Studio'
import { Studio2 } from '@bind/Studio2'
import StudioThumbnail from './studio-thumbnail'

export interface Data {
    id: bigint
    title: string
}

export default function StudioCover({
    data, open
}: {
    data: Data
    open: Open
}) {
    return (
        <div className='w-[10rem] h-[11rem] cursor-pointer' onClick={() => {
            open({to: 'studio', id: Number(data.id)}, 'Studio')
        }}>
            <div className='w-[100%] h-[7rem]'>{
                <StudioThumbnail id={Number(data.id)} width={100} height={150}/>
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