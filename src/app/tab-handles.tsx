import Router from "../router"
import Tab from "./tabs"
import {Manager as TabManager} from "./tab-manager"

interface Props {
    tabManager: TabManager
}

export default function TabHandles({tabManager}: Props) {
    return (
        <div className="flex h-[2rem] gap-[0.2rem]">
            {tabManager.items.map(({id, title}) => (
                <Handle title={title} close={() => tabManager.close(id)} key={id} set={() => tabManager.set(id)}/>
            ))}
        </div>
    )
}

function Handle({close, title, set}: {
    close: () => void
    set: () => void
    title: string
    
}) {
    return (
        <button className="bg-[yellow] p-[0.2rem] flex gap-[0.1rem]" onClick={() => {
            set()
        }}>
            <div>
                {title}
            </div>
            <button onClick={(e) => {e.stopPropagation(); close()}} className="w-[1.5rem] h-[1.5rem] bg-[#ffbf00] rounded-full flex items-center justify-center">
                x
            </button>
        </button>
    )
}