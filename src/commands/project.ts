
import { Project } from "@bind/Project";
import { invoke } from "@tauri-apps/api";

export async function project(id: number): Promise<Project> {
    return await invoke('project', {id})
}

export async function projectThumbnail(id: number, width: number, height: number): Promise<number[]> {
    return await invoke('project_thumbnail', {id, width, height})
}
