import { invoke } from "@tauri-apps/api"
import { Open } from "@/app/tab-manager"
import usePromiseState from "@/promise-state"
import {favoriteProject, loveProject, project, projectThumbnail} from "@/commands/project"
import { sendUserComment, userIcon, userProjectComments } from "@/commands/user"
import UserIcon from "@/components/user/user-icon"
import CommentsDisplay from "@/components/comments"

export default function Project({open, id}: {
    id: number
    open: Open
}) {
    const [state] = usePromiseState(() => project(id))

    return (
        <div>{
            state.is == 'ok' ?
            <div className="p-[1rem] flex flex-col gap-[1rem]">
                <div className="flex gap-[0.7rem] items-center">
                    <div className="w-[3rem] h-[3rem]">
                        <UserIcon id={Number(state.data.author.id)} size={80}/>
                    </div>
                    <div>
                        <div className="text-[1.5rem]">{state.data.title}</div>
                        <span>
                            by
                            <span className="pl-[0.4rem] text-light-negative-active cursor-pointer" onClick={() => {
                                open({to: 'user', name: state.data.author.name}, 'Project Author - ' + state.data.author.name)
                            }}>
                                {state.data.author.name}
                            </span>
                        </span>
                    </div>
                </div>

                <div className="flex gap-[0.7rem] h-[25rem]">
                    <div className="w-[25rem] flex flex-col gap-[0.5rem] flex-shrink-0">
                        <iframe height='350' src={`https://scratch.mit.edu/projects/${state.data.id}/embed`} allowTransparency={true} scrolling="no" allowFullScreen/>

                        <div className="flex items-center gap-[2rem]">
                            <div className="flex items-center gap-[0.4rem]">
                                <button onClick={() => {
                                    loveProject(id)
                                }}><img src='https://scratch.mit.edu/svgs/project/love-gray.svg'/></button>
                                <div>{String(state.data.stats.loves)}</div>
                            </div>

                            <div className="flex items-center gap-[0.4rem]">
                                <button onClick={() => {
                                    favoriteProject(id)
                                }}><img src='https://scratch.mit.edu/svgs/project/fav-gray.svg'/></button>
                                <div>{String(state.data.stats.favorites)}</div>
                            </div>

                            <div className="flex items-center gap-[0.4rem]">
                                <div><img src='https://scratch.mit.edu/svgs/project/remix-gray.svg'/></div>
                                <div>{String(state.data.stats.remixes)}</div>
                            </div>

                            <div className="flex items-center gap-[0.4rem]">
                                <div><img src='https://scratch.mit.edu/svgs/project/views-gray.svg'/></div>
                                <div>{String(state.data.stats.views)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[1rem] flex-grow">
                        <div className="p-[1rem] bg-light-weak rounded-[1rem] flex-grow flex flex-col">
                            <div className="font-bold text-[1.3rem]">Instructions</div>
                            <div className="overflow-y-scroll relative w-[100%] flex-grow">
                                <div className="absolute top-0 left-0 right-0 bottom-0">
                                    {state.data.instructions}
                                </div>
                            </div>
                        </div>

                        <div className="p-[1rem] bg-light-weak rounded-[1rem] flex-grow flex flex-col">
                            <div className="font-bold text-[1.3rem]">Notes and Credits</div>
                            <div className="overflow-y-scroll relative w-[100%] flex-grow">
                                <div className="absolute top-0 left-0 right-0 bottom-0">
                                    {state.data.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Comments authorName={state.data.author.name} id={id}/>
            </div>
            : state.is == 'loading' ?
            <div>Loading...</div>
            :
            <div>Error</div>
        }</div>
    )
}

function Comments({authorName, id}: {
    authorName: string
    id: number
}) {
    const [state] = usePromiseState(() => userProjectComments(authorName, id, {start: 0, end: null}))

    return (
        state.is == 'ok' ?
        <CommentsDisplay data={state.data}/>
        : state.is == 'loading' ?
        <div>Loading...</div>
        :
        <div>Error</div>
    )
}