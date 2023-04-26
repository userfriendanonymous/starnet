import { Studio2 } from '@bind/Studio2'
import { User } from "@bind/User"
import { Cursor } from "@bind/Cursor"
import { Project3 } from "@bind/Project3"
import { UserComment } from '@bind/UserComment'
import { Comment } from '@bind/Comment'
import { command } from '.'

export const user = (name: string) =>
    command<User, Error>('user', {name})

export const userIcon = (id: number, width: number, height: number) =>
    command<number[], Error>('user_icon', {id, width, height})

export const userProjects = (name: string, cursor: Cursor) =>
    command<Project3[], Error>('user_projects', {name, cursor})

export const userFavorites = (name: string, cursor: Cursor) =>
    command<Project3[], Error>('user_favorites', {name, cursor})

export const userCuratingStudios = (name: string, cursor: Cursor) =>
    command<Studio2, Error>('user_curating_studios', {name, cursor})

export const userComments = (name: string, cursor: Cursor) =>
    command<UserComment[], Error>('user_comments', {name, cursor})

export const userProjectComments = (name: string, id: number, cursor: Cursor) =>
    command<Comment[], Error>('user_project_comments', {name, id, cursor})

export const sendUserComment = (name: string, content: string, parentId?: number, toId?: number) =>
    command<UserComment[], Error>('send_user_comment', {name, content, parentId, toId})
