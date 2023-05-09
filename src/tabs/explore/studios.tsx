import { Open } from "@/app/tab-manager"
import { exploreStudios } from "@/commands/me"
import ActionLoader from "@/components/action-loader"
import StudioCover from "@/components/studio/studio-cover"
import usePromiseAction from "@/promise-action"
import { ExploreQuery } from "@bind/ExploreQuery"
import { Studio2 } from "@bind/Studio2"
import { useEffect, useState } from "react"

export default function Studios({openTab, query}: {
    openTab: Open
    query: ExploreQuery
}) {
    const [items, setItems] = useState<Studio2[]>([])
    const [load, isLoading] = usePromiseAction(
        () => exploreStudios(query, {start: 0, end: null}),
        (data) => setItems(data),
        (err) => console.log(err)
    )

    useEffect(() => {
        if (isLoading){return}
        load()
    }, [query])

    return (
        <div>
            {
                isLoading ?
                <div>Loading...</div>
                :
                <div>
                    <div className="grid grid-cols-3">
                        {items.map(item => 
                            <StudioCover data={item} open={openTab}/>
                        )}
                    </div>
                    <ActionLoader fn={() => exploreStudios(query, {start: items.length, end: null})}
                        ok={(data) => setItems($ => [...$, ...data])}
                        err={console.log}
                    >{(run, isLoading) => 
                        <button onClick={() => {
                            if (!isLoading){run()}
                        }}>{isLoading ? 'Loading...' : 'Load more'}</button>
                    }</ActionLoader>
                    
                </div>
            }
        </div>
    )
}