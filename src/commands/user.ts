import { SendComment } from '@bind/SendComment';
import { UserFeatured } from '@bind/UserFeatured';
import { Studio2 } from '@bind/Studio2'
import { User } from "@bind/User"
import { Cursor } from "@bind/Cursor"
import { Project3 } from "@bind/Project3"
import { UserComment } from '@bind/UserComment'
import { Comment } from '@bind/Comment'
import { command } from '.'
import { Error } from '@bind/Error'

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

export const userComments = (name: string, page?: number) =>
    command<UserComment[], Error>('user_comments', {name, page})

export const userProjectComments = (name: string, id: number, cursor: Cursor) =>
    command<Comment[], Error>('user_project_comments', {name, id, cursor})

export const sendUserComment = (name: string, data: SendComment) =>
    command<null, Error>('send_user_comment', {name, data})

export const followUser = (name: string) =>
    command<null, Error>('follow_user', {name})

export const unfollowUser = (name: string) =>
    command<null, Error>('unfollow_user', {name})
    
export const userFeatured = (name: string) =>
    command<UserFeatured, Error>('user_featured', {name})
    