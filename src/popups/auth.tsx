import useAuth from "@/auth"
import ActionLoader from "@/components/action-loader"
import { useCallback, useRef } from "react"

export default function Auth() {
    const nameRef = useRef<HTMLInputElement>(null!)
    const passwordRef = useRef<HTMLInputElement>(null!)

    const login = useAuth(({login}) => login)

    return (
        <div className="flex flex-col gap-[0.2rem]">
            Username
            <input ref={nameRef} className="bg-dark-negative-main text-dark-main"/>
            Password
            <input ref={passwordRef} className="bg-dark-negative-main text-dark-main"/>

            <ActionLoader fn={async () => await login(nameRef.current.value, passwordRef.current.value)} ok={() => {}} err={() => {}}>{(run, isLoading) => 
                <button onClick={run} className="mt-[0.6rem] cursor-pointer font-bold bg-dark-active rounded-[0.3rem] h-[2rem] flex items-center justify-center">
                    {isLoading ? 'Loading' : 'Log in'}
                </button>
            }</ActionLoader>
            
        </div>
    )
}