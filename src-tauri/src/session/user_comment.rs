use serde::Serialize;
use ts_rs::TS;

// region: entities
#[derive(Debug, Serialize, TS)]
#[ts(export)]
#[serde( rename_all = "camelCase", tag = "is" )]
pub enum UserCommentContentFragment {
    Link {
        to: String,
        content: String,
    },
    Text {
        content: String,
    },
    Emoji {
        to: String,
    }
}

impl UserCommentContentFragment {
    pub fn new(data: s2rs::api::CommentContentFragment) -> Self {
        type D = s2rs::api::CommentContentFragment;
        match data {
            D::Emoji(to) => Self::Emoji { to },
            D::Link { to, content } => Self::Link { to, content },
            D::Text(content) => Self::Text { content }
        }
    }
}

#[derive(Debug, Serialize, TS)]
#[ts(export)]
pub struct UserCommentContent(pub Vec<UserCommentContentFragment>);

impl UserCommentContent {
    pub fn new(data: s2rs::api::CommentContent) -> Self {
        Self(data.0.into_iter().map(UserCommentContentFragment::new).collect())
    }
}

#[derive(Debug, Serialize, TS)]
#[ts(export)]
#[serde( rename_all = "camelCase" )]
pub struct UserReply {
    pub id: u64,
    pub author_name: String,
    pub author_id: u64,
    pub content: UserCommentContent,
    pub created_at: String,
}

impl UserReply {
    pub fn new(data: s2rs::api::UserReply) -> Self {
        Self {
            author_id: data.author_id,
            author_name: data.author_name,
            content: UserCommentContent::new(data.content),
            created_at: data.created_at,
            id: data.id,
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::UserReply>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}

#[derive(Debug, Serialize, TS)]
#[ts(export)]
#[serde( rename_all = "camelCase" )]
pub struct UserComment {
    pub id: u64,
    pub author_name: String,
    pub author_id: u64,
    pub content: UserCommentContent,
    pub created_at: String,
    pub replies: Vec<UserReply>,
}

impl UserComment {
    pub fn new(data: s2rs::api::UserComment) -> Self {
        Self {
            author_id: data.author_id,
            author_name: data.author_name,
            content: UserCommentContent::new(data.content),
            created_at: data.created_at,
            id: data.id,
            replies: UserReply::vec_new(data.replies)
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::UserComment>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}

// endregion: entities

