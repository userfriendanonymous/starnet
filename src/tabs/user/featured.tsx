import { userFeatured } from "@/commands/user"
import ProjectThumbnail from "@/components/project/project-thumbnail"
import StateLoader from "@/components/state-loader"
import usePromiseState from "@/use-promise-state"
import { FeaturedLabel } from "@bind/FeaturedLabel"

function labelToString(label: FeaturedLabel) {
    switch (label) {
        case 'FeaturedProject': return 'Featured Project'
        case 'FeaturedTutorial': return 'Featured Tutorial'
        case 'MyFavoriteThings': return 'My Favorite Things'
        case 'RemixThis': return 'Remix This!'
        case 'WhyIScratch': return 'Why I Scratch'
        case 'WorkInProgress': return 'Work In Progress'
    }
}

export default function Featured({name}: {
    name: string
}) {
    const [state] = usePromiseState(() => userFeatured(name))

    return (
        <div className="w-[20rem] flex-shrink-0 p-[1rem] rounded-[1rem] bg-[#f7f6f6]">
            <StateLoader state={state}>{data => 
                <div className="flex flex-col gap-[0.7rem]">
                    <div className="font-bold text-[1.3rem]">{labelToString(data.label)}</div>
                    <ProjectThumbnail height={200} width={160} id={Number(data.project.id)}/>
                    <div className="text-[1.3rem]">{data.project.title}</div>
                </div>
            }</StateLoader>
        </div>
    )
}