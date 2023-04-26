import { Project } from "@bind/Project"
import { Error } from '@bind/Error'
import { command } from "."

export const project = (id: number) =>
    command<Project, Error>('project', {id})

export const projectThumbnail = (id: number, width: number, height: number) =>
    command<number[], Error>('project_thumbnail', {id, width, height})

export const loveProject = (id: number) =>
    command<null, Error>('love_project', {id})

export const favoriteProject = (id: number) =>
    command<null, Error>('favorite_project', {id})
