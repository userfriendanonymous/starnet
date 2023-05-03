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

impl Project {
    pub fn new(data: s2rs::api::Project) -> Self {
        Self {
            author: ProjectAuthor::new(data.author),
            stats: ProjectStats::new(data.stats),
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

impl ProjectAuthor {
    pub fn new(data: s2rs::api::ProjectAuthor) -> Self {
        Self {
            history: UserHistory::new(data.history),
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

impl ProjectStats {
    pub fn new(data: s2rs::api::ProjectStats) -> Self {
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

impl ProjectHistory {
    pub fn new(data: s2rs::api::ProjectHistory) -> Self {
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

impl Project3 {
    pub fn new(data: s2rs::api::Project3) -> Self {
        Self {
            author: Project3Author::new(data.author),
            comments_allowed: data.comments_allowed,
            description: data.description,
            history: ProjectHistory::new(data.history),
            id: data.id,
            instructions: data.instructions,
            is_published: data.is_published,
            public: data.public, 
            remix: ProjectRemix::new(data.remix),
            stats: ProjectStats::new(data.stats),
            title: data.title,
            visibility: data.visibility
        }
    }

    
    pub fn vec_new(data: Vec<s2rs::api::Project3>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
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

impl Project2 {
    pub fn new(data: s2rs::api::Project2) -> Self {
        Self {
            author: ProjectAuthor::new(data.author),
            comments_allowed: data.comments_allowed,
            description: data.description,
            history: ProjectHistory::new(data.history),
            id: data.id,
            instructions: data.instructions,
            is_published: data.is_published,
            public: data.public,
            remix: ProjectRemix::new(data.remix),
            stats: ProjectStats::new(data.stats),
            title: data.title,
            visibility: data.visibility
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::Project2>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
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

impl Project3Author {
    pub fn new(data: s2rs::api::Project3Author) -> Self {
        Self {
            history: UserHistory::new(data.history),
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

impl ProjectRemix {
    pub fn new(data: s2rs::api::ProjectRemix) -> Self {
        Self {
            parent: data.parent,
            root: data.root
        }
    }
}
// endregion: ProjectRemix

