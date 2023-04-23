import { useCallback, useEffect, useRef, useState } from "react"

export type State<T, E> = {
    is: 'loading'
} | {
    is: 'ok'
    data: T
} | {
    is: 'err'
    err: E
}

export default function usePromiseState<T, E>(fn: () => Promise<T>): [State<T, E>] {
    const isInit = useRef(false)
    const [state, setState] = useState<State<T, E>>({is: 'loading'})
    
    const run = useCallback(async () => {
        try {
            let data = await fn()
            setState({ is: 'ok', data })
        } catch (e) {
            setState({ is: 'err', err: e as E })
        }
    }, [])

    useEffect(() => {
        if (isInit.current == false) { return }
        isInit.current = true
        run()
    }, [])

    return [state]
}