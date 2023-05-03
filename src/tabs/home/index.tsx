import { login } from "@/commands/me"
import { useCallback, useRef } from "react"
import { Open } from "../../app/tab-manager"
import FrontPage from "./front-page"
import News from "./news"

export default function Home({openTab}: {openTab: Open}) {
    const userNameRef = useRef<HTMLInputElement>(null!)
    const projectIdRef = useRef<HTMLInputElement>(null!)
    const studioIdRef = useRef<HTMLInputElement>(null!)

    const onOpenUser = useCallback(() => {
        let name = userNameRef.current.value
        openTab({to: 'user', name}, 'User - ' + name)
    }, [open])

    const onOpenProject = useCallback(() => {
        let id = Number(projectIdRef.current.value)
        openTab({to: 'project', id}, 'Project - ' + String(id))
    }, [open])

    const onOpenStudio = useCallback(() => {
        let id = Number(studioIdRef.current.value)
        openTab({to: 'studio', id}, 'User - ' + id)
    }, [open])

    return (
        <div>
            <div className={`flex justify-center items-center h-[3rem] bg-light-main text-light-negative-main gap-[0.8rem]`}>
                <div className="font-bold">SSN</div>

                <div className={`px-[1rem] py-[0.2rem] bg-[] rounded-[0.2rem]`}>
                    <input className="text-light-negative-weak" placeholder="Search"></input>
                    <button className="cursor-pointer">Go!</button>
                </div>
            </div>

            <div className="flex p-[1rem]">
                <div></div>

                <News openTab={openTab}/>
            </div>

            <FrontPage openTab={openTab}/>
        </div>

    //     <div className="w-full flex flex-col items-center">
    //         <div className="text-[1.5rem] font-bold py-[2rem]">Home</div>
            
    //         <div className="flex flex-col items-center gap-[1rem] p-[1.5rem] bg-[#ffdecf] rounded-[1rem]">
    //             <div className="text-[1.2rem]">Login?</div>
    //             <input className="rounded-[0.2rem] p-[0.4rem]" placeholder="Username.." ref={nameRef}/>
    //             <input className="rounded-[0.2rem] p-[0.4rem]" placeholder="Password.." ref={passwordRef}/>
    //             <button className="rounded-[0.2rem] bg-[#cccbcb] px-[2rem] h-[2rem]" onClick={onLogin}>Authenticate me!</button>
    //         </div>

    //         <div className="flex gap-[1rem]">
    //             <div className="flex flex-col items-center gap-[1rem] p-[1.5rem] bg-[#ffdecf] rounded-[1rem]">
    //                 <div className="text-[1.2rem]">User:</div>
    //                 <input className="rounded-[0.2rem] p-[0.4rem]" placeholder="Username.." ref={userNameRef}/>
    //                 <button className="rounded-[0.2rem] bg-[#cccbcb] px-[2rem] h-[2rem]" onClick={onOpenUser}>Go!</button>
    //             </div>

    //             <div className="flex flex-col items-center gap-[1rem] p-[1.5rem] bg-[#ffdecf] rounded-[1rem]">
    //                 <div className="text-[1.2rem]">Project:</div>
    //                 <input className="rounded-[0.2rem] p-[0.4rem]" placeholder="Id.." ref={projectIdRef}/>
    //                 <button className="rounded-[0.2rem] bg-[#cccbcb] px-[2rem] h-[2rem]" onClick={onOpenProject}>Go!</button>
    //             </div>

    //             <div className="flex flex-col items-center gap-[1rem] p-[1.5rem] bg-[#ffdecf] rounded-[1rem]">
    //                 <div className="text-[1.2rem]">Studio:</div>
    //                 <input className="rounded-[0.2rem] p-[0.4rem]" placeholder="Id.." ref={studioIdRef}/>
    //                 <button className="rounded-[0.2rem] bg-[#cccbcb] px-[2rem] h-[2rem]" onClick={onOpenStudio}>Go!</button>
    //             </div>
    //         </div>
    //     </div>
    )
}