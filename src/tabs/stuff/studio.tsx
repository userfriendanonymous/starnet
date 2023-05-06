import { Open } from "@/app/tab-manager";
import ProjectCover from "@/components/project/project-cover";
import StudioCover from "@/components/studio/studio-cover";
import { StuffProject } from "@bind/StuffProject";
import { StuffStudio } from "@bind/StuffStudio";

export default function Studio({data, openTab}: {
    data: StuffStudio
    openTab: Open
}) {
    return (
        <div className="flex items-center justify-between">
            <StudioCover data={{...data.fields, id: data.id}} open={openTab}/>
            <div className="flex flex-col gap-[0.4rem]">
                <div>Curators: {Number(data.fields.curatorCount)}</div>
                <div>Projects: {Number(data.fields.projectsCount)}</div>
                <div>Comments: {Number(data.fields.commentersCount)}</div>
            </div>
        </div>
    )
}