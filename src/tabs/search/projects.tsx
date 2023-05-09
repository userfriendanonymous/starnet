import { Open } from "@/app/tab-manager"
import { exploreProjects, searchProjects } from "@/commands/me"
import ActionLoader from "@/components/action-loader"
import ProjectCover from "@/components/project/project-cover"
import StateLoader from "@/components/state-loader"
import usePromiseAction from "@/promise-action"
import usePromiseState from "@/promise-state"
import { ExploreQuery } from "@bind/ExploreQuery"
import { Project2 } from "@bind/Project2"
import { SearchQuery } from "@bind/SearchQuery"
import { useCallback, useEffect, useState } from "react"

export default function Projects({openTab, query}: {
    openTab: Open
    query: SearchQuery
}) {
    const [items, setItems] = useState<Project2[]>([])
    const [load, isLoading] = usePromiseAction(
        () => searchProjects(query, {start: 0, end: null}),
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
                            <ProjectCover data={item} open={openTab}/>
                        )}
                    </div>
                    <ActionLoader fn={() => searchProjects(query, {start: items.length, end: null})}
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