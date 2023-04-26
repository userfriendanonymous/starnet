import { StudioAction } from '@bind/StudioAction';
import { Comment } from "@bind/Comment";
import { Cursor } from "@bind/Cursor";
import { Studio } from "@bind/Studio";
import { StudioProject } from "@bind/StudioProject";
import { User } from "@bind/User"
import { Error } from '@bind/Error'
import { command } from '.';

export const studio = (id: number) =>
    command<Studio, Error>('studio', {id})

export const studioThumbnail = (id: number, width: number, height: number) =>
    command<number[], Error>('studio_thumbnail', {id, width, height})

export const studioProjects = (id: number, cursor: Cursor) =>
    command<StudioProject[], Error>('studio_projects', {id, cursor})

export const studioComments = (id: number, cursor: Cursor) =>
    command<Comment[], Error>('studio_comments', {id, cursor})

export const studioCurators = (id: number, cursor: Cursor) =>
    command<User[], Error>('studio_curators', {id, cursor})

export const studioManagers = (id: number, cursor: Cursor) =>
    command<User[], Error>('studio_managers', {id, cursor})

export const studioActivity = (id: number, cursor: Cursor) =>
    command<StudioAction[], Error>('studio_activity', {id, cursor})

