// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { UserCommentContent } from "./UserCommentContent";
import type { UserReply } from "./UserReply";

export interface UserComment { id: bigint, authorName: string, authorId: bigint, content: UserCommentContent, createdAt: string, replies: Array<UserReply>, }