use tauri::State;
use crate::{AppState, entities::{Error, User, Project3, UserComment, Result, Studio2, Comment, UserFeatured, SendComment}, cursor::Cursor, from_vec::FromVec};

#[tauri::command]
pub(crate) async fn user(state: State<'_, AppState>, name: &str) -> Result<User> {
    Ok(state.api.read().await.user_meta(name).await?.into())
}

#[tauri::command]
pub(crate) async fn user_icon(state: State<'_, AppState>, id: u64, width: u16, height: u16) -> Result<Vec<u8>> {
    Ok(state.api.read().await.user_icon(id, width, height).await?)
}

#[tauri::command]
pub(crate) async fn user_projects(state: State<'_, AppState>, name: &str, cursor: Cursor) -> Result<Vec<Project3>> {
    let data = state.api.read().await.user_projects(name, cursor).await?;
    Ok(Project3::from_vec(data))
}

#[tauri::command]
pub(crate) async fn user_favorites(state: State<'_, AppState>, name: &str, cursor: Cursor) -> Result<Vec<Project3>> {
    let data = state.api.read().await.user_favorites(name, cursor).await?;
    Ok(Project3::from_vec(data))
}

#[tauri::command]
pub(crate) async fn user_curating_studios(state: State<'_, AppState>, name: &str, cursor: Cursor) -> Result<Vec<Studio2>> {
    let data = state.api.read().await.user_curating_studios(name, cursor).await?;
    Ok(Studio2::from_vec(data))
}

#[tauri::command]
pub(crate) async fn user_comments(state: State<'_, AppState>, name: &str, page: Option<u8>) -> Result<Vec<UserComment>> {
    let data = state.api.read().await.user_comments(name, page).await.map_err(|e|
        match e {
            s2rs::api::GetUserCommentsError::Parsing => Error::BadResponse,
            s2rs::api::GetUserCommentsError::This(error) => error.into()
        }
    )?;
    Ok(UserComment::vec_new(data))
}

#[tauri::command]
pub(crate) async fn user_project_comments(state: State<'_, AppState>, name: &str, id: u64, cursor: Cursor) -> Result<Vec<Comment>> {
    let data = state.api.read().await.user_project_comments(name, id, cursor).await?;
    Ok(Comment::from_vec(data))
}

#[tauri::command]
pub(crate) async fn send_user_comment(state: State<'_, AppState>, name: &str, data: SendComment) -> Result<()> {
    Ok(state.api.read().await.send_user_comment(name, &data.into()).await?)
}

#[tauri::command]
pub(crate) async fn follow_user(state: State<'_, AppState>, name: &str) -> Result<()> {
    state.api.read().await.follow_user(name).await?;
    Ok(())
}

#[tauri::command]
pub(crate) async fn unfollow_user(state: State<'_, AppState>, name: &str) -> Result<()> {
    state.api.read().await.unfollow_user(name).await?;
    Ok(())
}

#[tauri::command]
pub(crate) async fn user_featured(state: State<'_, AppState>, name: &str) -> Result<UserFeatured> {
    let data = state.api.read().await.user_featured(name).await?;
    Ok(UserFeatured::new(data))
}
