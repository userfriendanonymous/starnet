import { Studio } from '@bind/Studio';
import { User } from "@bind/User";
import { Cursor } from "@bind/Cursor";
import { invoke } from "@tauri-apps/api";
import { Project3 } from "@bind/Project3";
import { UserComment } from '@bind/UserComment';

export async function user(name: string): Promise<User> {
    return await invoke('user', {name})
}

export async function userIcon(id: number, width: number, height: number): Promise<number[]> {
    return await invoke('user_icon', {id, width, height})
}

export async function userProjects(name: string, cursor: Cursor): Promise<Project3[]> {
    return await invoke('user_projects', {name, cursor})
}

export async function userFavorites(name: string, cursor: Cursor): Promise<Project3[]> {
    return await invoke('user_favorites', {name, cursor})
}

export async function userCuratingStudios(name: string, cursor: Cursor): Promise<Studio[]> {
    return await invoke('user_curating_studios', {name, cursor})
}

export async function userComments(name: string, cursor: Cursor): Promise<UserComment[]> {
    return await invoke('user_comments', {name, cursor})
}
