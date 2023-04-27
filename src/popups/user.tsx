import { Open } from "@/app/tab-manager"
import { TabManager } from "@/app/tab-manager"
import { PopupManager } from "@/app/popup-manager"
import { useRef } from "react"

export default function User({tabManager, popupManager}: {
    tabManager: TabManager
    popupManager: PopupManager
}) {
    const nameRef = useRef<HTMLInputElement>(null!)
    return (
        <div className="flex flex-col gap-[1rem]">
            Username:
            <input ref={nameRef}/>
            <button className="p-[1rem] bg-[blue] text-white cursor-pointer" onClick={() => {
                tabManager.open({to: 'user', name: nameRef.current.value}, `User <${nameRef.current.value}>`)
                popupManager.close()
            }}>Navigate</button>
        </div>
    )
}