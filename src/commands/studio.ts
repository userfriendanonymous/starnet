import { StudioAction } from '@bind/StudioAction';
import { Comment } from "@bind/Comment";
import { Cursor } from "@bind/Cursor";
import { Studio } from "@bind/Studio";
import { StudioProject } from "@bind/StudioProject";
import { User } from "@bind/User"
import { Error } from '@bind/Error'
import { command } from '.';
import { SendComment } from '@bind/SendComment';

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

export const followStudio = (id: number) =>
    command<null, Error>('follow_studio', {id})

export const unfollowStudio = (id: number) =>
    command<null, Error>('unfollow_studio', {id})

export const addStudioProject = (id: number) =>
    command<null, Error>('add_studio_project', {id})

export const removeStudioProject = (id: number, projectId: number) =>
    command<null, Error>('remove_studio_project', {id, projectId})

export const sendStudioComment = (id: number, data: SendComment) =>
    command<null, Error>('send_studio_comment', {id, data})

export const inviteStudioCurator = (id: number, name: string) =>
    command<null, Error>('invite_studio_curator', {id, name})

export const removeStudioCurator = (id: number, name: string) =>
    command<null, Error>('remove_studio_curator', {id, name})

export const setStudioTitle = (id: number, content: string) =>
    command<null, Error>('set_studio_title', {id, content})

export const setStudioDescription = (id: number, content: string) =>
    command<null, Error>('set_studio_description', {id, content})

export const toggleStudioCommenting = (id: number) =>
    command<null, Error>('toggle_studio_commenting', {id})

export const acceptStudioInvite = (id: number) =>
    command<null, Error>('accept_studio_invite', {id})

export const openStudio = (id: number) =>
    command<null, Error>('open_studio', {id})

export const closeStudio = (id: number) =>
    command<null, Error>('close_studio', {id})

export const promoteStudioCurator = (id: number, name: string) =>
    command<null, Error>('promote_studio_curator', {id, name})