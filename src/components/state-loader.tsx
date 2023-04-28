import { State } from "@/promise-state"
import { ReactNode } from "react"

export default function StateLoader<T, E>({state, children}: {
    state: State<T, E>
    children: (data: T) => ReactNode
}) {
    return (
        state.is == 'ok' ?
        <>{children(state.data)}</>

        : state.is == 'loading' ?
        <div>
            Loading.!!
        </div>

        :
        <div>Error: {JSON.stringify(state.err)}</div>
    )
}