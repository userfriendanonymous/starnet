use serde::Serialize;
use ts_rs::TS;

#[derive(Serialize, Debug, Clone, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct StuffAuthor {
    pub admin: bool,
    pub id: u64,
    pub name: String,
}

impl From<s2rs::api::StuffAuthor> for StuffAuthor {
    fn from(data: s2rs::api::StuffAuthor) -> Self {
        Self {
            admin: data.admin,
            id: data.id,
            name: data.name
        }
    }
}

#[derive(Serialize, Debug, Clone, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct StuffProject {
    pub fields: StuffProjectFields,
    pub id: u64,
}

impl From<s2rs::api::StuffProject> for StuffProject {
    fn from(data: s2rs::api::StuffProject) -> Self {
        Self {
            fields: data.fields.into(),
            id: data.id,
        }
    }
}

#[derive(Serialize, Debug, Clone, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct StuffProjectFields {
    pub author: StuffAuthor,
    pub created_at: String,
    pub modified_at: String,
    pub shared_at: Option<String>,
    pub favorite_count: u32,
    pub public: bool,
    pub love_count: u32,
    pub remix_count: u32,
    pub title: String,
    pub view_count: u32,
    pub visibility: String,
    pub commenters_count: u64,
}

impl From<s2rs::api::StuffProjectFields> for StuffProjectFields {
    fn from(data: s2rs::api::StuffProjectFields) -> Self {
        Self {
            author: data.author.into(),
            commenters_count: data.commenters_count,
            created_at: data.created_at,
            favorite_count: data.favorite_count,
            love_count: data.love_count,
            modified_at: data.modified_at,
            public: data.public,
            remix_count: data.remix_count,
            shared_at: data.shared_at,
            title: data.title,
            view_count: data.view_count,
            visibility: data.visibility,
        }
    }
}

#[derive(Serialize, Debug, Clone, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct StuffSharedProject {
    pub fields: StuffSharedProjectFields,
    pub id: u64,
}


impl From<s2rs::api::StuffSharedProject> for StuffSharedProject {
    fn from(data: s2rs::api::StuffSharedProject) -> Self {
        Self {
            fields: data.fields.into(),
            id: data.id,
        }
    }
}


#[derive(Serialize, Debug, Clone, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct StuffSharedProjectFields {
    pub author: StuffAuthor,
    pub created_at: String,
    pub modified_at: String,
    pub shared_at: String,
    pub favorite_count: u32,
    pub public: bool,
    pub love_count: u32,
    pub remix_count: u32,
    pub title: String,
    pub view_count: u32,
    pub visibility: String,
    pub commenters_count: u64,
}

impl From<s2rs::api::StuffSharedProjectFields> for StuffSharedProjectFields {
    fn from(data: s2rs::api::StuffSharedProjectFields) -> Self {
        Self {
            author: data.author.into(),
            commenters_count: data.commenters_count,
            created_at: data.created_at,
            favorite_count: data.favorite_count,
            love_count: data.love_count,
            modified_at: data.modified_at,
            public: data.public,
            remix_count: data.remix_count,
            shared_at: data.shared_at,
            title: data.title,
            view_count: data.view_count,
            visibility: data.visibility,
        }
    }
}


#[derive(Serialize, Debug, Clone, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct StuffStudio {
    pub fields: StuffStudioFields,
    pub id: u64
}

impl From<s2rs::api::StuffStudio> for StuffStudio {
    fn from(data: s2rs::api::StuffStudio) -> Self {
        Self {
            fields: data.fields.into(),
            id: data.id,
        }
    }
}

#[derive(Serialize, Debug, Clone, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct StuffStudioFields {
    pub commenters_count: u64,
    pub curator_count: u32,
    pub created_at: String,
    pub modified_at: String,
    pub owner: StuffAuthor,
    pub projects_count: u32,
    pub title: String,
}


impl From<s2rs::api::StuffStudioFields> for StuffStudioFields {
    fn from(data: s2rs::api::StuffStudioFields) -> Self {
        Self {
            commenters_count: data.commenters_count,
            created_at: data.created_at,
            modified_at: data.modified_at,
            title: data.title,
            curator_count: data.curator_count,
            owner: data.owner.into(),
            projects_count: data.projects_count
        }
    }
}
