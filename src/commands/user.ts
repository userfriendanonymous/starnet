import { Studio } from '@bind/Studio';
import { User } from "@bind/User";
import { Cursor } from "@bind/Cursor";
import { invoke } from "@tauri-apps/api";
import { Project3 } from "@bind/Project3";
import { UserComment } from '@bind/UserComment';
import { resultifyPromise } from '@/result';

export function user(name: string) {
    return resultifyPromise<User, Error>( invoke('user', {name}) )
}

export function userIcon(id: number, width: number, height: number) {
    return resultifyPromise<number[], Error>( invoke('user_icon', {id, width, height}) )
}

export function userProjects(name: string, cursor: Cursor) {
    return resultifyPromise<Project3[], Error>( invoke('user_projects', {name, cursor}) )
}

export function userFavorites(name: string, cursor: Cursor) {
    return resultifyPromise<Project3[], Error>( invoke('user_favorites', {name, cursor}) )
}

export function userCuratingStudios(name: string, cursor: Cursor) {
    return resultifyPromise<Studio, Error>( invoke('user_curating_studios', {name, cursor}) )
}

export function userComments(name: string, cursor: Cursor) {
    return resultifyPromise<UserComment[], Error>( invoke('user_comments', {name, cursor}) )
}

export function sendUserComment(name: string, content: string, parentId?: number, toId?: number) {
    return resultifyPromise<UserComment[], Error>( invoke('send_user_comment', {name, content, parentId, toId}) )
}
