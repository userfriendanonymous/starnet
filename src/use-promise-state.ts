import { useCallback, useEffect, useRef, useState } from "react"
import Result from "./result"

export type State<T, E> = {
    is: 'loading'
} | {
    is: 'ok'
    data: T
} | {
    is: 'err'
    err: E
}

export default function usePromiseState<T, E>(fn: () => Promise<Result<T, E>>): [State<T, E>] {
    const isInit = useRef(false)
    const [state, setState] = useState<State<T, E>>({is: 'loading'})
    
    const run = useCallback(async () => {
        let result = await fn()
        if (result.is == 'ok') {
            setState({ is: 'ok', data: result.data })
        } else {
            console.log(result.err)
            setState({ is: 'err', err: result.err })
        }
    }, [])

    useEffect(() => {
        if (isInit.current == true) { return }
        isInit.current = true
        run()
    }, [])

    return [state]
}