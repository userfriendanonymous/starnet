import { Open } from "@/app/tab-manager";
import ProjectCover from "@/components/project/project-cover";
import { StuffProject } from "@bind/StuffProject";

export default function ProjectShared({data, openTab}: {
    data: StuffProject
    openTab: Open
}) {
    return (
        <div className="flex items-center justify-between">
            <ProjectCover data={{...data.fields, id: data.id}} open={openTab}/>
            <button>See inside</button>
            <div className="flex flex-col gap-[0.4rem]">
                <div>Loves: {data.fields.loveCount}</div>
                <div>Faves: {data.fields.favoriteCount}</div>
                <div>Remixes: {data.fields.remixCount}</div>
                <div>Comments: {Number(data.fields.commentersCount)}</div>
            </div>
        </div>
    )
}