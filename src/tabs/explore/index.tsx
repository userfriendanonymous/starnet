import { Open } from "@/app/tab-manager"
import { useImmer } from "use-immer"
import { ExploreQuery } from '@bind/ExploreQuery'
import { useEffect, useState } from "react"
import MaybeVisible from "@/components/maybe-visible"
import Projects from "./projects"
import Studios from "./studios"

type Tab = 'projects' | 'studios'

export default function Explore({openTab}: {
    openTab: Open,
}) {
    const [tempQuery, setTempQuery] = useImmer<ExploreQuery>({
        language: 'english',
        mode: 'popular',
        query: ''
    })
    const [query, setQuery] = useImmer<ExploreQuery | undefined>(undefined)
    const [currentTab, setCurrentTab] = useState<Tab>('projects')

    const [checked, setChecked] = useImmer<Map<Tab, boolean>>(new Map())
    if (!checked.get(currentTab))
        setChecked($ => {$.set(currentTab, true)})

    return (
        <div>
            <div>Explore</div>
            <input onChange={e => setTempQuery($ => {$.query = e.target.value})} placeholder="Query?"/>
            <button onClick={() => {
                setCurrentTab('projects')
                setQuery(tempQuery)
            }}>Projects</button>
            <button onClick={() => {
                setCurrentTab('studios')
                setQuery(tempQuery)
            }}>Studios</button>
            {
                query ?
                <div>
                    {checked.get('projects') && 
                    <MaybeVisible is={currentTab == 'projects'}>
                        <Projects openTab={openTab} query={query}/>
                    </MaybeVisible>}
                    {checked.get('studios') && 
                    <MaybeVisible is={currentTab == 'studios'}>
                        <Studios openTab={openTab} query={query}/>
                    </MaybeVisible>}
                </div>

                :
                <div>Lol</div>
            }
        </div>
    )
}