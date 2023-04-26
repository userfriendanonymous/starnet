use serde::Serialize;
use ts_rs::TS;

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct UserFeatured {
    pub id: u64, // not sure what this field is for
    pub label: FeaturedLabel,
    pub project: UserFeaturedProject,
    pub profile: UserFeaturedProfile,
}

impl UserFeatured {
    pub fn new(data: s2rs::api::UserFeatured) -> Self {
        Self {
            id: data.id,
            label: FeaturedLabel::new(data.label),
            profile: UserFeaturedProfile::new(data.profile),
            project: UserFeaturedProject::new(data.project)
        }
    }
}

// region: FeaturedLabel
#[derive(Serialize, TS, Debug, Clone, Copy, PartialEq, Eq)]
#[ts(export)]
pub enum FeaturedLabel {
    FeaturedProject,
    FeaturedTutorial,
    WorkInProgress,
    RemixThis,
    MyFavoriteThings,
    WhyIScratch,
}

impl FeaturedLabel {
    pub fn new(data: s2rs::api::FeaturedLabel) -> Self {
        type D = s2rs::api::FeaturedLabel;
        match data {
            D::FeaturedProject => Self::FeaturedProject,
            D::FeaturedTutorial => Self::FeaturedTutorial,
            D::MyFavoriteThings => Self::MyFavoriteThings,
            D::RemixThis => Self::RemixThis,
            D::WhyIScratch => Self::WhyIScratch,
            D::WorkInProgress => Self::WorkInProgress
        }
    }
}
// endregion: FeaturedLabel

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct UserFeaturedProject {
    pub author_name: String,
    pub id: u64,
    pub title: String,
    pub modified_at: String,
}

impl UserFeaturedProject {
    pub fn new(data: s2rs::api::UserFeaturedProject) -> Self {
        Self {
            author_name: data.author_name,
            id: data.id,
            modified_at: data.modified_at,
            title: data.title
        }
    }
}

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct UserFeaturedProfile {
    pub name: String,
    pub id: u64,
}

impl UserFeaturedProfile {
    pub fn new(data: s2rs::api::UserFeaturedProfile) -> Self {
        Self {
            id: data.id,
            name: data.name
        }
    }
}
