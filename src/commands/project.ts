
import Result, { resultifyPromise } from "@/result"
import { Comment } from "@bind/Comment"
import { Cursor } from "@bind/Cursor"
import { Project } from "@bind/Project"
import { invoke } from "@tauri-apps/api"
import { Error } from '@bind/Error'

export function project(id: number) {
    return resultifyPromise<Project, Error>( invoke('project', {id}) )
}

export function projectThumbnail(id: number, width: number, height: number) {
    return resultifyPromise<number[], Error>( invoke('project_thumbnail', {id, width, height}) )
}

export function loveProject(id: number) {
    return resultifyPromise<null, Error>( invoke('love_project', {id}) )
}

export function favoriteProject(id: number) {
    return resultifyPromise<null, Error>( invoke('favorite_project', {id}) )
}
