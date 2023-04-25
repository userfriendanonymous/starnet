
type Result<T, E> = {
    is: 'ok'
    data: T
} | {
    is: 'err'
    err: E
}

export default Result

export function resultify<T, E>(fn: () => T): () => Result<T, E> {
    return () => {
        try {
            return {
                is: 'ok',
                data: fn()
            }
        } catch(e) {
            return {
                is: 'err',
                err: e as E
            }
        }
    }
}

export async function resultifyPromise<T, E>(promise: Promise<any>): Promise<Result<T, E>> {
    try {
        return {
            is: 'ok',
            data: await promise
        }
    } catch(e) {
        return {
            is: 'err',
            err: e as E
        }
    }
}