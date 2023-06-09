// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { Project3Author } from "./Project3Author";
import type { ProjectHistory } from "./ProjectHistory";
import type { ProjectRemix } from "./ProjectRemix";
import type { ProjectStats } from "./ProjectStats";

export interface Project3 { id: bigint, title: string, description: string, instructions: string, visibility: string, public: boolean, commentsAllowed: boolean, isPublished: boolean, author: Project3Author, stats: ProjectStats, remix: ProjectRemix, history: ProjectHistory, }