import { StudioAction } from '@bind/StudioAction';
import { Comment } from "@bind/Comment";
import { Cursor } from "@bind/Cursor";
import { Studio } from "@bind/Studio";
import { StudioProject } from "@bind/StudioProject";
import { User } from "@bind/User";
import { invoke } from "@tauri-apps/api";
import { resultifyPromise } from '@/result';
import { Error } from '@bind/Error';

export function studio(id: number) {
    return resultifyPromise<Studio, Error>( invoke('studio', {id}) )
}

export function studioThumbnail(id: number, width: number, height: number) {
    return resultifyPromise<number[], Error>( invoke('studio_thumbnail', {id, width, height}) )
}

export function studioProjects(id: number, cursor: Cursor) {
    return resultifyPromise<StudioProject[], Error>( invoke('studio_projects', {id, cursor}) )
}

export function studioComments(id: number, cursor: Cursor) {
    return resultifyPromise<Comment[], Error>( invoke('studio_comments', {id, cursor}) )
}

export function studioCurators(id: number, cursor: Cursor) {
    return resultifyPromise<User[], Error>( invoke('studio_curators', {id, cursor}) )
}

export function studioManagers(id: number, cursor: Cursor) {
    return resultifyPromise<User[], Error>( invoke('studio_managers', {id, cursor}) )
}

export function studioActivity(id: number, cursor: Cursor) {
    return resultifyPromise<StudioAction[], Error>( invoke('studio_activity', {id, cursor}) )
}
