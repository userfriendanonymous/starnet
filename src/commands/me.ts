import { Project2 } from '@bind/Project2';
import { News } from '@bind/News';
import { FrontPage } from '@bind/FrontPage';
import { Login } from '@bind/Login';
import { command } from ".";
import { Cursor } from '@bind/Cursor';
import { Error } from '@bind/Error'

export const login = (name: string, password: string) =>
    command<Login, Error>('login', {name, password})

export const frontPage = () =>
    command<FrontPage, Error>('front_page', {})

export const news = () =>
    command<News[], Error>('news', {})

export const projectsLovedByFollowing = (cursor: Cursor) =>
    command<Project2[], Error>('projects_loved_by_following', {cursor})

export const projectsSharedByFollowing = (cursor: Cursor) =>
    command<Project2[], Error>('projects_shared_by_following', {cursor})

export const viewedProjects = (cursor: Cursor) =>
    command<Project2[], Error>('viewed_projects', {cursor})

export const setProfileBio = (content: string) =>
    command<null, Error>('set_profile_bio', {content})

export const setProfileStatus = (content: string) =>
    command<null, Error>('set_profile_status', {content})

export const toggleProfileCommenting = () =>
    command<Project2[], Error>('toggle_profile_commenting', {})
    