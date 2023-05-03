use serde::{Serialize, Deserialize};
use ts_rs::TS;

#[derive(Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct SendComment {
    pub content: String,
    pub parent_id: Option<u64>,
    pub to_id: Option<u64>,
}

impl From<SendComment> for s2rs::api::SendComment {
    fn from(value: SendComment) -> Self {
        Self {
            content: value.content,
            parent_id: value.parent_id,
            to_id: value.to_id
        }
    }
}

#[derive(Debug, Serialize, TS)]
#[ts(export)]
#[serde( rename_all = "camelCase" )]
pub struct Comment {
    pub id: u64,
    pub author: CommentAuthor,
    pub parent_id: Option<u64>,
    pub to_user_id: Option<u64>,
    pub content: String,
    pub created_at: String,
    pub modified_at: String,
    pub reply_count: u64,
}

impl Comment {
    pub fn new(data: s2rs::api::Comment) -> Self {
        Self {
            author: CommentAuthor::new(data.author),
            content: data.content,
            created_at: data.created_at,
            id: data.id,
            modified_at: data.modified_at,
            parent_id: data.parent_id,
            reply_count: data.reply_count,
            to_user_id: data.to_user_id
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::Comment>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}

#[derive(Debug, Serialize, TS)]
#[ts(export)]
#[serde( rename_all = "camelCase" )]
pub struct CommentAuthor {
    pub id: u64,
    pub name: String,
    pub scratch_team: bool,
}

impl CommentAuthor {
    pub fn new(data: s2rs::api::CommentAuthor) -> Self {
        Self {
            id: data.id,
            name: data.name,
            scratch_team: data.scratch_team
        }
    }
}
