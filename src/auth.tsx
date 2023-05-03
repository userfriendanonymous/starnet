import { Error } from "@bind/Error";
import { create } from "zustand";
import {immer} from 'zustand/middleware/immer'
import { login } from "./commands/me";
import Result from "./result";

interface Auth {
    name: string
}

export type AuthState = {
    is: 'in'
    data: Auth
} | {
    is: 'out'
} | {
    is: 'unknown'
}

interface State {
    state: AuthState
    login(name: string, password: string): Promise<Result<null, Error>>
}

const useAuth = create(immer<State>((set, get) => ({
    state: {is: 'out'},
    
    async login(name, password) {
        let result = await login(name, password)
        
        if (result.is == 'ok') {
            let data = result.data
            set($ => {
                $.state = {is: 'in', data: {
                    name: data.name
                }}
            })
            return {is: 'ok', data: null}

        } else {
            console.log(result.err)
            return result
        }

    }
})))

export default useAuth