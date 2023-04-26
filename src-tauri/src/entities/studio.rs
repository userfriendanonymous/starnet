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

impl Studio2 {
    pub fn new(data: s2rs::api::Studio2) -> Self {
        Self {
            comments_allowed: data.comments_allowed,
            description: data.description,
            history: StudioHistory::new(data.history),
            host: data.host,
            id: data.id,
            open_to_all: data.open_to_all,
            public: data.public,
            title: data.title,
            visibility: data.visibility
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::Studio2>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
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