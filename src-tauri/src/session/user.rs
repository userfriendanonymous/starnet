use s2rs::api::UserInfo;
use serde::Serialize;
use ts_rs::TS;
use super::{Session, Project3, UserComment, Comment, Studio2};

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
    pub async fn user(&self, name: &str) -> super::Result<User> {
        let api = self.api.read().await;
        let data = api.user_meta(name).await?;
        Ok(User::new(data))
    }

    pub async fn user_icon(&self, id: u64, width: u16, height: u16) -> super::Result<Vec<u8>> {
        let api = self.api.read().await;
        let data = api.user_icon(id, width, height).await?;
        Ok(data)
    }

    pub async fn user_projects(&self, name: &str, cursor: s2rs::Cursor) -> super::Result<Vec<Project3>> {
        let api = self.api.read().await;
        let data = api.user_projects(name, cursor).await?;
        Ok(Project3::vec_new(data))
    }

    pub async fn user_favorites(&self, name: &str, cursor: s2rs::Cursor) -> super::Result<Vec<Project3>> {
        let api = self.api.read().await;
        let data = api.user_favorites(name, cursor).await?;
        Ok(Project3::vec_new(data))
    }

    pub async fn user_curating_studios(&self, name: &str, cursor: s2rs::Cursor) -> super::Result<Vec<Studio2>> {
        let api = self.api.read().await;
        let data = api.user_curating_studios(name, cursor).await?;
        Ok(Studio2::vec_new(data))
    }

    pub async fn user_project_comments(&self, name: &str, id: u64, cursor: s2rs::Cursor) -> super::Result<Vec<Comment>> {
        let data = self.api.read().await.user_project_comments(name, id, cursor).await?;
        Ok(Comment::vec_new(data))
    }

    pub async fn user_comments(&self, name: &str, cursor: s2rs::Cursor) -> super::Result<Vec<UserComment>> {
        let api = self.api.read().await;
        let data = api.user_comments(name, cursor).await.map_err(|e|
            match e {
                s2rs::api::GetUserCommentsError::Parsing => super::Error::BadResponse,
                s2rs::api::GetUserCommentsError::This(error) => error.into()
            }
        )?;
        Ok(UserComment::vec_new(data))
    }

    pub async fn send_user_comment(&self, name: &str, content: String, parent_id: Option<u64>, to_id: Option<u64>) -> super::Result<()> {
        Ok(self.api.read().await.send_user_comment(name, content, parent_id, to_id).await?)
    }

    pub async fn follow_user(&self, name: &str) -> super::Result<()> {
        self.api.read().await.follow_user(name).await?;
        Ok(())
    }

    pub async fn unfollow_user(&self, name: &str) -> super::Result<()> {
        self.api.read().await.unfollow_user(name).await?;
        Ok(())
    }

    pub async fn set_my_bio(&self, content: String) -> super::Result<()> {
        self.api.read().await.set_user_info(&UserInfo {
            bio: Some(content),
            ..Default::default()
        }).await?;
        Ok(())
    }

    pub async fn set_my_status(&self, content: String) -> super::Result<()> {
        self.api.read().await.set_user_info(&UserInfo {
            status: Some(content),
            ..Default::default()
        }).await?;
        Ok(())
    }

    pub async fn toggle_user_commenting(&self, content: String) -> super::Result<()> {
        self.api.read().await.toggle_user_commenting(&UserInfo {
            status: Some(content),
            ..Default::default()
        }).await?;
        Ok(())
    }
}