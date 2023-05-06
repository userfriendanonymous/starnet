import useAuth from "@/auth"
import { useCallback } from "react"
import { PopupManager } from "../popup-manager"
import { TabManager, Reload as ReloadTab } from "../tab-manager"
import Button from "./button"

export default function ControlPanel({tabManager, popupManager}: {
    tabManager: TabManager
    popupManager: PopupManager
}) {
    const auth = useAuth(({state}) => state)

    const onReloadTab = useCallback(() => {
        if (tabManager.currentId) {
            tabManager.reload(tabManager.currentId)
        }
    }, [tabManager.reload, tabManager.currentId])

    return (
        <div className={`h-[2.5rem] bg-dark-weak flex items-center gap-[2rem] text-dark-negative-main px-[0.7rem] justify-between`}>
            <div className="flex items-center">
                <Button onClick={onReloadTab}>
                    R
                </Button>
            </div>

            <div className="flex items-center gap-[0.4rem]">
                <Button onClick={() => popupManager.open({to: 'user'})}>
                    P
                </Button>

                <Button onClick={() => popupManager.open({to: 'user'})}>
                    U
                </Button>

                <Button onClick={() => popupManager.open({to: 'user'})}>
                    S
                </Button>
                {
                    auth.is == 'out' ? <div>
                        <Button onClick={() => popupManager.open({to: 'auth'})}>
                            L
                        </Button>
                    </div>

                    : auth.is == 'in' ? <div className="flex items-center gap-[0.5rem]">
                        <div className="ml-[3rem] flex items-center gap-[0.3rem]">
                            <div className="text-[0.9rem]">{auth.data.name}</div>
                        </div>
                        <Button onClick={() => {}}>
                            O
                        </Button>
                        <Button onClick={() => {
                            tabManager.open({to: 'user', name: auth.data.name}, 'My Profile')
                        }}>
                            M
                        </Button>
                        <Button onClick={() => {
                            tabManager.open({to: 'stuff'}, 'My Stuff')
                        }}>
                            S
                        </Button>
                    </div>

                    :
                    <div>Loading..</div>
                }
                
            </div>
        </div>
    )
}