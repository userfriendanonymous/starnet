use serde::Serialize;
use ts_rs::TS;

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

impl From<s2rs::api::Studio> for Studio {
    fn from(data: s2rs::api::Studio) -> Self {
        Self {
            comments_allowed: data.comments_allowed,
            description: data.description,
            history: data.history.into(),
            host: data.host,
            id: data.id,
            open_to_all: data.open_to_all,
            public: data.public,
            stats: data.stats.into(),
            title: data.title,
            visibility: data.visibility
        }
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
    pub history: StudioHistory,
}

impl From<s2rs::api::Studio2> for Studio2 {
    fn from(data: s2rs::api::Studio2) -> Self {
        Self {
            comments_allowed: data.comments_allowed,
            description: data.description,
            history: data.history.into(),
            host: data.host,
            id: data.id,
            open_to_all: data.open_to_all,
            public: data.public,
            title: data.title,
            visibility: data.visibility
        }
    }
}

#[derive(Serialize, Debug, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct StudioHistory {
    pub created: String,
    pub modified: String,
}

impl From<s2rs::api::StudioHistory> for StudioHistory {
    fn from(data: s2rs::api::StudioHistory) -> Self {
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

impl From<s2rs::api::StudioStats> for StudioStats {
    fn from(data: s2rs::api::StudioStats) -> Self {
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

impl From<s2rs::api::StudioProject> for StudioProject {
    fn from(data: s2rs::api::StudioProject) -> Self {
        Self {
            actor_id: data.actor_id,
            creator_id: data.creator_id,
            id: data.id,
            name: data.name,
            title: data.title
        }
    }
}
