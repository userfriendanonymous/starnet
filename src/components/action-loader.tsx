import usePromiseAction from "@/promise-action"
import Result from "@/result"
import { ReactNode } from "react"

export default function ActionLoader<T, E>({fn, ok, err, children}: {
    fn: () => Promise<Result<T, E>>
    ok: (data: T) => void
    err: (err: E) => void
    children: (run: () => void, isLoading: boolean) => ReactNode
}) {
    const [run, isLoading] = usePromiseAction(fn, ok, err)
    return (
        <>{children(run, isLoading)}</>
    )
}