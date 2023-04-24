use serde::Serialize;
use ts_rs::TS;
use super::{Session, Project3, Studio, UserComment};

// region: User
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub scratch_team: bool,
    pub id: u64,
    pub bio: String,
    pub status: String,
    pub country: String,
    pub history: UserHistory,
    pub name: String,
}

impl User {
    pub fn new(data: s2rs::api::User) -> Self {
        Self {
            bio: data.profile.bio,
            country: data.profile.country,
            id: data.id,
            history: UserHistory::new(data.history),
            scratch_team: data.scratch_team,
            status: data.profile.status,
            name: data.name,
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::User>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}
// endregion: User

// region: UserHistory
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct UserHistory {
    pub joined: String
}

impl UserHistory {
    pub fn new(data: s2rs::api::UserHistory) -> Self {
        Self {
            joined: data.joined
        }
    }
}
// endregion: UserHistory

impl Session {
    pub async fn user(&self, name: &str) -> Result<User, ()> {
        let api = self.api.read().await;
        let data = api.user_meta(name).await.map_err(|_| ())?;
        Ok(User::new(data))
    }

    pub async fn user_icon(&self, id: u64, width: u16, height: u16) -> Result<Vec<u8>, ()> {
        let api = self.api.read().await;
        let data = api.user_icon(id, width, height).await.map_err(|_| ())?;
        Ok(data)
    }

    pub async fn user_projects(&self, name: &str, cursor: s2rs::Cursor) -> Result<Vec<Project3>, ()> {
        let api = self.api.read().await;
        let data = api.user_projects(name, cursor).await.map_err(|_| ())?;
        Ok(Project3::vec_new(data))
    }

    pub async fn user_favorites(&self, name: &str, cursor: s2rs::Cursor) -> Result<Vec<Project3>, ()> {
        let api = self.api.read().await;
        let data = api.user_favorites(name, cursor).await.map_err(|_| ())?;
        Ok(Project3::vec_new(data))
    }

    pub async fn user_curating_studios(&self, name: &str, cursor: s2rs::Cursor) -> Result<Vec<Studio>, ()> {
        let api = self.api.read().await;
        let data = api.user_curating_studios(name, cursor).await.map_err(|_| ())?;
        Ok(Studio::vec_new(data))
    }

    pub async fn user_comments(&self, name: &str, cursor: s2rs::Cursor) -> Result<Vec<UserComment>, ()> {
        let api = self.api.read().await;
        let data = api.user_comments(name, cursor).await.map_err(|e| {
            dbg!(e);
        })?;
        Ok(UserComment::vec_new(data))
    }
}