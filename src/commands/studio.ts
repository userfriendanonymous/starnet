import { Cursor } from "@bind/Cursor";
import { Studio } from "@bind/Studio";
import { StudioProject } from "@bind/StudioProject";
import { invoke } from "@tauri-apps/api";

export async function studio(id: number): Promise<Studio> {
    return await invoke('studio', {id})
}

export async function studioThumbnail(id: number, width: number, height: number): Promise<number[]> {
    return await invoke('studio_thumbnail', {id, width, height})
}

export async function studioProjects(id: number, cursor: Cursor): Promise<StudioProject[]> {
    return await invoke('studio_projects', {id, cursor})
}
