import { Message } from '@bind/Message';
import { SearchQuery } from '@bind/SearchQuery';
import { StuffStudio } from '@bind/StuffStudio';
import { StuffSharedProject } from '@bind/StuffSharedProject';
import { StuffProject } from '@bind/StuffProject';
import { Project2 } from '@bind/Project2';
import { News } from '@bind/News';
import { FrontPage } from '@bind/FrontPage';
import { Login } from '@bind/Login';
import { command } from ".";
import { Cursor } from '@bind/Cursor';
import { Error } from '@bind/Error'
import { ExploreQuery } from '@bind/ExploreQuery';
import { Studio2 } from '@bind/Studio2';

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
    
export const stuffAll = (page: number, sortBy: string) =>
    command<StuffProject[], Error>('stuff_all', {page, sortBy})

export const stuffShared = (page: number, sortBy: string) =>
    command<StuffSharedProject[], Error>('stuff_shared', {page, sortBy})

export const stuffUnshared = (page: number, sortBy: string) =>
    command<StuffProject[], Error>('stuff_unshared', {page, sortBy})

export const stuffTrashed = (page: number, sortBy: string) =>
    command<StuffProject[], Error>('stuff_trashed', {page, sortBy})

export const stuffStudios = (page: number, sortBy: string) =>
    command<StuffStudio[], Error>('stuff_studios', {page, sortBy})
    
export const exploreProjects = (query: ExploreQuery, cursor: Cursor) =>
    command<Project2[], Error>('explore_projects', {query, cursor})
    
export const exploreStudios = (query: ExploreQuery, cursor: Cursor) =>
    command<Studio2[], Error>('explore_studios', {query, cursor})
    
export const searchProjects = (query: SearchQuery, cursor: Cursor) =>
    command<Project2[], Error>('search_projects', {query, cursor})

export const searchStudios = (query: SearchQuery, cursor: Cursor) =>
    command<Studio2[], Error>('search_studios', {query, cursor})

export const messages = (cursor: Cursor) =>
    command<Message[], Error>('messages', {cursor})
