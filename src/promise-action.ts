import { useCallback } from 'react';
import { useState } from 'react';
import Result from "./result";

export default function usePromiseAction<T, E>(fn: () => Promise<Result<T, E>>, ok: (data: T) => void, err: (err: E) => void)
:[() => void, boolean] {
    const [isLoading, setIsLoading] = useState(false)

    const run = useCallback(async () => {
        if (!isLoading) {
            setIsLoading(true)
            let result = await fn()
            if (result.is == 'ok') {
                ok(result.data)
            } else {
                err(result.err)
            }
            setIsLoading(false)
        }
    }, [isLoading])
    
    return [run, isLoading]
}