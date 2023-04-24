import { useCallback, useRef } from "react"
import { Open } from "../../app/tab-manager"
import User from "../user"

export default function Home({open}: {open: Open}) {
    const userNameRef = useRef<HTMLInputElement>(null!)
    const projectIdRef = useRef<HTMLInputElement>(null!)
    const studioIdRef = useRef<HTMLInputElement>(null!)

    const onOpenUser = useCallback(() => {
        let name = userNameRef.current.value
        open({to: 'user', name}, 'User - ' + name)
    }, [open])

    const onOpenProject = useCallback(() => {
        let id = Number(projectIdRef.current.value)
        open({to: 'project', id}, 'Project - ' + String(id))
    }, [open])

    const onOpenStudio = useCallback(() => {
        let id = Number(studioIdRef.current.value)
        open({to: 'studio', id}, 'User - ' + id)
    }, [open])

    return (
        <div className="w-full flex flex-col items-center">
            <div className="text-[1.5rem] font-bold py-[2rem]">Home</div>
            <div className="flex gap-[1rem]">
                <div className="flex flex-col items-center gap-[1rem] p-[1.5rem] bg-[#ffdecf] rounded-[1rem]">
                    <div className="text-[1.2rem]">User:</div>
                    <input className="rounded-[0.2rem] p-[0.4rem]" placeholder="Username.." ref={userNameRef}/>
                    <button className="rounded-[0.2rem] bg-[#cccbcb] px-[2rem] h-[2rem]" onClick={onOpenUser}>Go!</button>
                </div>

                <div className="flex flex-col items-center gap-[1rem] p-[1.5rem] bg-[#ffdecf] rounded-[1rem]">
                    <div className="text-[1.2rem]">Project:</div>
                    <input className="rounded-[0.2rem] p-[0.4rem]" placeholder="Id.." ref={projectIdRef}/>
                    <button className="rounded-[0.2rem] bg-[#cccbcb] px-[2rem] h-[2rem]" onClick={onOpenProject}>Go!</button>
                </div>

                <div className="flex flex-col items-center gap-[1rem] p-[1.5rem] bg-[#ffdecf] rounded-[1rem]">
                    <div className="text-[1.2rem]">Studio:</div>
                    <input className="rounded-[0.2rem] p-[0.4rem]" placeholder="Id.." ref={studioIdRef}/>
                    <button className="rounded-[0.2rem] bg-[#cccbcb] px-[2rem] h-[2rem]" onClick={onOpenStudio}>Go!</button>
                </div>
            </div>
        </div>
    )
}