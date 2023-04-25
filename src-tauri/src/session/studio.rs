use serde::Serialize;
use ts_rs::TS;
use super::{Session, User, Comment, StudioAction};

// region: structs
#[derive(Serialize, Debug, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Studio {
    pub id: u64,
    pub title: String,
    pub host: u64,
    pub description: String,
    pub visibility: String,
    pub public: bool,
    pub open_to_all: bool,
    pub comments_allowed: bool,
    pub history: StudioHistory,
    pub stats: StudioStats
}

impl Studio {
    pub fn new(data: s2rs::api::Studio) -> Self {
        Self {
            comments_allowed: data.comments_allowed,
            description: data.description,
            history: StudioHistory::new(data.history),
            host: data.host,
            id: data.id,
            open_to_all: data.open_to_all,
            public: data.public,
            stats: StudioStats::new(data.stats),
            title: data.title,
            visibility: data.visibility
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::Studio>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}


#[derive(Serialize, Debug, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Studio2 {
    pub id: u64,
    pub title: String,
    pub host: u64,
    pub description: String,
    pub visibility: String,
    pub public: bool,
    pub open_to_all: bool,
    pub comments_allowed: bool,
    pub image: String,
    pub history: StudioHistory,
}

#[derive(Serialize, Debug, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct StudioHistory {
    pub created: String,
    pub modified: String,
}

impl StudioHistory {
    pub fn new(data: s2rs::api::StudioHistory) -> Self {
        Self {
            created: data.created,
            modified: data.modified
        }
    }
}

#[derive(Serialize, Debug, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct StudioStats {
    pub comments: u64,
    pub followers: u64,
    pub managers: u64,
    pub projects: u64,
}

impl StudioStats {
    pub fn new(data: s2rs::api::StudioStats) -> Self {
        Self {
            comments: data.comments,
            followers: data.followers,
            managers: data.managers,
            projects: data.projects
        }
    }
}

#[derive(Serialize, Debug, TS)]
#[ts(export)]
#[serde( rename_all = "camelCase" )]
pub struct StudioProject {
    pub id: u64,
    pub title: String,
    pub name: String,
    pub actor_id: u64,
    pub creator_id: u64,
}

impl StudioProject {
    pub fn new(data: s2rs::api::StudioProject) -> Self {
        Self {
            actor_id: data.actor_id,
            creator_id: data.creator_id,
            id: data.id,
            name: data.name,
            title: data.title
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::StudioProject>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}
// endregion: structs

impl Session {
    pub async fn studio(&self, id: u64) -> super::Result<Studio> {
        let data = self.api.read().await.studio_meta(id).await?;
        Ok(Studio::new(data))
    }

    pub async fn studio_thumbnail(&self, id: u64, width: u16, height: u16) -> super::Result<Vec<u8>> {
        let data = self.api.read().await.studio_thumbnail(id, width, height).await?;
        Ok(data)
    }

    pub async fn studio_projects(&self, id: u64, cursor: s2rs::Cursor) -> super::Result<Vec<StudioProject>> {
        let data = self.api.read().await.studio_projects(id, cursor).await?;
        Ok(StudioProject::vec_new(data))
    }

    pub async fn studio_curators(&self, id: u64, cursor: s2rs::Cursor) -> super::Result<Vec<User>> {
        let data = self.api.read().await.studio_curators(id, cursor).await?;
        Ok(User::vec_new(data))
    }

    pub async fn studio_managers(&self, id: u64, cursor: s2rs::Cursor) -> super::Result<Vec<User>> {
        let data = self.api.read().await.studio_managers(id, cursor).await?;
        Ok(User::vec_new(data))
    }

    pub async fn studio_comments(&self, id: u64, cursor: s2rs::Cursor) -> super::Result<Vec<Comment>> {
        let data = self.api.read().await.studio_comments(id, cursor).await?;
        Ok(Comment::vec_new(data))
    }

    pub async fn studio_activity(&self, id: u64, cursor: s2rs::Cursor) -> super::Result<Vec<StudioAction>> {
        let data = self.api.read().await.studio_activity(id, cursor).await.map_err(|e|
            match e {
                s2rs::api::GetStudioActivityError::Parsing(_) => super::Error::BadResponse,
                s2rs::api::GetStudioActivityError::This(error) => error.into()
            }
        )?;
        Ok(StudioAction::vec_new(data))
    }
}