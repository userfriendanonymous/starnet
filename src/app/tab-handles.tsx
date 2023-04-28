import Router from "../tab-router"
import Tab from "./tabs"
import {TabManager} from "./tab-manager"

interface Props {
    tabManager: TabManager
}

export default function TabHandles({tabManager}: Props) {
    return (
        <div className="overflow-x-hidden relative flex-grow h-[100%]">
            <div className="flex items-center absolute left-0 right-0 bottom-0 top-0">
                {tabManager.items.map(({id, title}) => (
                    <Handle isOpen={id == tabManager.currentId} title={title} close={() => tabManager.close(id)} key={id} set={() => tabManager.set(id)}/>
                ))}
            </div>
        </div>
    )
}

function Handle({close, title, set, isOpen}: {
    close: () => void
    set: () => void
    isOpen: boolean
    title: string
    
}) {
    return (
        <div className={`${isOpen ? 'bg-dark-weak' : 'hover:bg-dark-slight'} text-dark-negative-main transition-all h-[100%] overflow-clip cursor-pointer items-center flex pl-[0.7rem] pr-[0.3rem] gap-[0.3rem]`} onClick={() => {
            set()
        }}>
            <div className="text-ellipsis whitespace-nowrap overflow-hidden text-[0.9rem]">
                {title}
            </div>
            <button onClick={(e) => {e.stopPropagation(); close()}} className="w-[1.4rem] h-[1.4rem] font-bold flex items-center justify-center hover:bg-dark-active active:bg-dark-fired">
                x
            </button>
        </div>
    )
}