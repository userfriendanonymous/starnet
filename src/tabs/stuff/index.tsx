import { Open } from "@/app/tab-manager"
import MaybeVisible from "@/components/maybe-visible"
import { ReactNode, useState } from "react"
import { useImmer } from "use-immer"
import All from "./all"
import Select from "./select"
import Shared from "./shared"
import Studios from "./studios"
import Trashed from "./trashed"
import Unshared from "./unshared"

type Tab = 'all' | 'shared' | 'unshared' | 'trashed' | 'studios'

let tabs: Map<Tab, ReactNode> = new Map()
tabs.set('all', 'All projects')
tabs.set('shared', 'Shared projects')
tabs.set('unshared', 'Unshared projects')
tabs.set('studios', 'Studios')
tabs.set('trashed', 'Trashed')

export default function Stuff({openTab}: {
    openTab: Open
}) {
    const [currentTab, setCurrentTab] = useState<Tab>('all')

    const [checked, setChecked] = useImmer<Map<Tab, boolean>>(new Map())

    if (!checked.get(currentTab))
        setChecked($ => $.set(currentTab, true))

    return (
        <div className="p-[1rem]">
            <Select setCurrent={setCurrentTab} current={currentTab}>{tabs}</Select>
            <div>
                {checked.get('all') && (
                    <MaybeVisible is={currentTab == 'all'}>
                        <All openTab={openTab}/>
                    </MaybeVisible>
                )}
                {checked.get('shared') && (
                    <MaybeVisible is={currentTab == 'shared'}>
                        <Shared openTab={openTab}/>
                    </MaybeVisible>
                )}
                {checked.get('unshared') && (
                    <MaybeVisible is={currentTab == 'unshared'}>
                        <Unshared openTab={openTab}/>
                    </MaybeVisible>
                )}
                {checked.get('studios') && (
                    <MaybeVisible is={currentTab == 'studios'}>
                        <Studios openTab={openTab}/>
                    </MaybeVisible>
                )}
                {checked.get('trashed') && (
                    <MaybeVisible is={currentTab == 'trashed'}>
                        <Trashed openTab={openTab}/>
                    </MaybeVisible>
                )}
            </div>
        </div>
    )
}

