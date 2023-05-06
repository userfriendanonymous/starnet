use serde::Serialize;
use ts_rs::TS;
use super::UserHistory;

// region: Project
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    pub author: ProjectAuthor,
    pub id: u64,
    pub title: String,
    pub description: String,
    pub instructions: String,
    pub visibility: String,
    pub public: bool,
    pub comments_allowed: bool,
    pub is_published: bool,
    pub stats: ProjectStats,
    pub token: String
}

impl From<s2rs::api::Project> for Project {
    fn from(data: s2rs::api::Project) -> Self {
        Self {
            author: data.author.into(),
            stats: data.stats.into(),
            comments_allowed: data.comments_allowed,
            description: data.description,
            id: data.id,
            instructions: data.instructions,
            is_published: data.is_published,
            public: data.public,
            title: data.title,
            token: data.token,
            visibility: data.visibility
        }
    }
}
// endregion: Project

// region: ProjectAuthor
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct ProjectAuthor {
    pub name: String,
    pub id: u64,
    pub scratch_team: bool,
    pub history: UserHistory,
}

impl From<s2rs::api::ProjectAuthor> for ProjectAuthor {
    fn from(data: s2rs::api::ProjectAuthor) -> Self {
        Self {
            history: data.history.into(),
            id: data.id,
            name: data.name,
            scratch_team: data.scratch_team
        }
    }
}
// endregion: ProjectAuthor

// region: ProjectStats
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct ProjectStats {
    loves: u64,
    views: u64,
    favorites: u64,
    remixes: u64,
}

impl From<s2rs::api::ProjectStats> for ProjectStats {
    fn from(data: s2rs::api::ProjectStats) -> Self {
        Self {
            favorites: data.favorites,
            loves: data.loves,
            remixes: data.remixes,
            views: data.views
        }
    }
}
// endregion: ProjectStats

// region: ProjectHistory
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct ProjectHistory {
    pub created: String,
    pub modified: String,
    pub shared: String,
}

impl From<s2rs::api::ProjectHistory> for ProjectHistory {
    fn from(data: s2rs::api::ProjectHistory) -> Self {
        Self {
            created: data.created,
            modified: data.modified,
            shared: data.shared
        }
    }
}
// endregion: ProjectHistory

// region: Project3
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Project3 {
    pub id: u64,
    pub title: String,
    pub description: String,
    pub instructions: String, 
    pub visibility: String,
    pub public: bool,
    pub comments_allowed: bool,
    pub is_published: bool,
    pub author: Project3Author,
    pub stats: ProjectStats,
    pub remix: ProjectRemix,
    pub history: ProjectHistory,
}

impl From<s2rs::api::Project3> for Project3 {
    fn from(data: s2rs::api::Project3) -> Self {
        Self {
            author: data.author.into(),
            comments_allowed: data.comments_allowed,
            description: data.description,
            history: data.history.into(),
            id: data.id,
            instructions: data.instructions,
            is_published: data.is_published,
            public: data.public, 
            remix: data.remix.into(),
            stats: data.stats.into(),
            title: data.title,
            visibility: data.visibility
        }
    }
}
// endregion: Project3

// region: Project2
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Project2 {
    pub id: u64,
    pub title: String,
    pub description: String,
    pub instructions: String,
    pub visibility: String,
    pub public: bool,
    pub comments_allowed: bool,
    pub is_published: bool,
    pub author: ProjectAuthor,
    pub stats: ProjectStats,
    pub remix: ProjectRemix,
    pub history: ProjectHistory,
}

impl From<s2rs::api::Project2> for Project2 {
    fn from(data: s2rs::api::Project2) -> Self {
        Self {
            author: data.author.into(),
            comments_allowed: data.comments_allowed,
            description: data.description,
            history: data.history.into(),
            id: data.id,
            instructions: data.instructions,
            is_published: data.is_published,
            public: data.public,
            remix: data.remix.into(),
            stats: data.stats.into(),
            title: data.title,
            visibility: data.visibility
        }
    }
}
// endregion: Project2

// region: Project3Author
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Project3Author {
    pub id: u64,
    pub scratch_team: bool,
    pub history: UserHistory,
}

impl From<s2rs::api::Project3Author> for Project3Author {
    fn from(data: s2rs::api::Project3Author) -> Self {
        Self {
            history: data.history.into(),
            id: data.id,
            scratch_team: data.scratch_team,
        }
    }
}
// endregion: Project3Author

// region: ProjectRemix
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct ProjectRemix {
    pub parent: Option<u64>,
    pub root: Option<u64>,
}

impl From<s2rs::api::ProjectRemix> for ProjectRemix {
    fn from(data: s2rs::api::ProjectRemix) -> Self {
        Self {
            parent: data.parent,
            root: data.root
        }
    }
}
// endregion: ProjectRemix

