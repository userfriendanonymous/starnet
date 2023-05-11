import { Open } from "@/app/tab-manager"
import { ProjectLink, StudioLink, UserLink } from "@/components/link"
import { Message } from "@bind/Message"

export default function Item({data, openTab}: {
    data: Message
    openTab: Open
}) {
    return (
        <div className="p-[0.8rem] bg-light-main rounded-[0.6rem]">
            {
                data.event.is == 'followUser' ?
                <div>
                    <UserLink open={openTab} name={data.actorName}/>
                    &nbsp;followed&nbsp;
                    <UserLink open={openTab} name={data.event.to_name}/>
                </div>

                : data.event.is == 'favoriteProject' ?
                <div>
                    <UserLink open={openTab} name={data.actorName}/>
                    &nbsp;favorited&nbsp;
                    <ProjectLink open={openTab} id={Number(data.event.id)}>{data.event.title}</ProjectLink>
                </div>

                : data.event.is == 'loveProject' ?
                <div>
                    <UserLink open={openTab} name={data.actorName}/>
                    &nbsp;loved&nbsp;
                    <ProjectLink open={openTab} id={Number(data.event.id)}>{data.event.title}</ProjectLink>
                </div>

                : data.event.is == 'remixProject' ?
                <div>
                    <UserLink open={openTab} name={data.actorName}/>
                    &nbsp;remixed as&nbsp;
                    <ProjectLink open={openTab} id={Number(data.event.id)}>{data.event.title}</ProjectLink>
                </div>

                : data.event.is == 'forumPost' ?
                <div>{data.actorName} forum posts {data.event.title}</div>

                : data.event.is == 'studioActivity' ?
                <div>{data.actorName} makes studio activity in {data.event.title}</div>

                : data.event.is == 'addComment' ?
                <div>
                    <UserLink open={openTab} name={data.actorName}/>
                    &nbsp;commented&nbsp;
                    {data.event.to_name ? <span>
                        to&nbsp;
                        <UserLink open={openTab} name={data.event.to_name}/>
                        &nbsp;
                    </span> : null}
                    on&nbsp;
                    {
                        data.event.location.is == 'profile' ?
                        <span>
                            <UserLink open={openTab} name={data.event.location.name}/>
                            's profile
                        </span>
                        : data.event.location.is == 'project' ?
                        <span>
                            <ProjectLink open={openTab} id={data.event.location.id}>{data.event.location.title}</ProjectLink>
                        </span>
                        :
                        <span>
                            <StudioLink open={openTab} id={data.event.location.id}>{data.event.location.title}</StudioLink>
                        </span>
                    }
                    :

                    <div className="border-light-primary border-[2px] p-[1rem] rounded-[1rem]">
                        {data.event.fragment}
                    </div>
                </div>

                : data.event.is == 'inviteCurator' ?
                <div>
                    <UserLink open={openTab} name={data.actorName}/>
                    &nbsp;invited you to&nbsp;
                    <StudioLink open={openTab} id={data.event.id}>{data.event.title}</StudioLink>
                </div>

                : data.event.is == 'promoteStudio' ?
                <div>
                    <UserLink open={openTab} name={data.actorName}/>
                    &nbsp;promoted you on&nbsp;
                    <StudioLink open={openTab} id={data.event.id}>{data.event.title}</StudioLink>
                </div>

                :
                <div>Welcome to Scratch! (LOL HELLO)</div>
            }
        </div>
    )
}