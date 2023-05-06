use s2rs::api::StudioInfo;
use tauri::State;
use crate::{AppState, entities::{Error, Studio, User, Comment, StudioAction, StudioProject, Result, SendComment}, cursor::Cursor, from_vec::FromVec};


#[tauri::command]
pub(crate) async fn studio(state: State<'_, AppState>, id: u64) -> Result<Studio> {
    Ok(state.api.read().await.studio_meta(id).await?.into())
}

#[tauri::command]
pub(crate) async fn studio_thumbnail(state: State<'_, AppState>, id: u64, width: u16, height: u16) -> Result<Vec<u8>> {
    let data = state.api.read().await.studio_thumbnail(id, width, height).await?;
    Ok(data)
}

#[tauri::command]
pub(crate) async fn studio_projects(state: State<'_, AppState>, id: u64, cursor: Cursor) -> Result<Vec<StudioProject>> {
    let data = state.api.read().await.studio_projects(id, cursor).await?;
    Ok(StudioProject::from_vec(data))
}

#[tauri::command]
pub(crate) async fn studio_curators(state: State<'_, AppState>, id: u64, cursor: Cursor) -> Result<Vec<User>> {
    let data = state.api.read().await.studio_curators(id, cursor).await?;
    Ok(User::from_vec(data))
}

#[tauri::command]
pub(crate) async fn studio_managers(state: State<'_, AppState>, id: u64, cursor: Cursor) -> Result<Vec<User>> {
    let data = state.api.read().await.studio_managers(id, cursor).await?;
    Ok(User::from_vec(data))
}

#[tauri::command]
pub(crate) async fn studio_comments(state: State<'_, AppState>, id: u64, cursor: Cursor) -> Result<Vec<Comment>> {
    let data = state.api.read().await.studio_comments(id, cursor).await?;
    Ok(Comment::from_vec(data))
}

#[tauri::command]
pub(crate) async fn studio_activity(state: State<'_, AppState>, id: u64, cursor: Cursor) -> Result<Vec<StudioAction>> {
    let data = state.api.read().await.studio_activity(id, cursor).await.map_err(|e|
        match e {
            s2rs::api::GetStudioActivityError::Parsing(_) => Error::BadResponse,
            s2rs::api::GetStudioActivityError::This(error) => error.into()
        }
    )?;
    Ok(StudioAction::from_vec(data))
}

#[tauri::command]
pub(crate) async fn follow_studio(state: State<'_, AppState>, id: u64) -> Result<()> {
    Ok(state.api.read().await.follow_studio(id).await?)
}

#[tauri::command]
pub(crate) async fn unfollow_studio(state: State<'_, AppState>, id: u64) -> Result<()> {
    Ok(state.api.read().await.unfollow_studio(id).await?)
}

#[tauri::command]
pub(crate) async fn add_studio_project(state: State<'_, AppState>, id: u64, project_id: u64) -> Result<()> {
    Ok(state.api.read().await.add_studio_project(id, project_id).await?)
}

#[tauri::command]
pub(crate) async fn remove_studio_project(state: State<'_, AppState>, id: u64, project_id: u64) -> Result<()> {
    Ok(state.api.read().await.remove_studio_project(id, project_id).await?)
}

#[tauri::command]
pub(crate) async fn send_studio_comment(state: State<'_, AppState>, id: u64, data: SendComment) -> Result<()> {
    Ok(state.api.read().await.send_studio_comment(id, &data.into()).await?)
}

#[tauri::command]
pub(crate) async fn invite_studio_curator(state: State<'_, AppState>, id: u64, name: &str) -> Result<()> {
    Ok(state.api.read().await.invite_studio_curator(id, name).await?)
}

#[tauri::command]
pub(crate) async fn remove_studio_curator(state: State<'_, AppState>, id: u64, name: &str) -> Result<()> {
    Ok(state.api.read().await.remove_studio_curator(id, name).await?)
}

#[tauri::command]
pub(crate) async fn set_studio_title(state: State<'_, AppState>, id: u64, content: String) -> Result<()> {
    Ok(state.api.read().await.set_studio_info(id, &StudioInfo {
        description: None,
        title: Some(content)
    }).await?)
}

#[tauri::command]
pub(crate) async fn set_studio_description(state: State<'_, AppState>, id: u64, content: String) -> Result<()> {
    Ok(state.api.read().await.set_studio_info(id, &StudioInfo {
        description: Some(content),
        title: None
    }).await?)
}

#[tauri::command]
pub(crate) async fn toggle_studio_commenting(state: State<'_, AppState>, id: u64) -> Result<()> {
    Ok(state.api.read().await.toggle_studio_commenting(id).await?)
}

#[tauri::command]
pub(crate) async fn accept_studio_invite(state: State<'_, AppState>, id: u64) -> Result<()> {
    Ok(state.api.read().await.accept_studio_invite(id).await?)
}

#[tauri::command]
pub(crate) async fn open_studio(state: State<'_, AppState>, id: u64) -> Result<()> {
    Ok(state.api.read().await.open_studio(id).await?)
}

#[tauri::command]
pub(crate) async fn close_studio(state: State<'_, AppState>, id: u64) -> Result<()> {
    Ok(state.api.read().await.close_studio(id).await?)
}

#[tauri::command]
pub(crate) async fn promote_studio_curator(state: State<'_, AppState>, id: u64, name: &str) -> Result<()> {
    Ok(state.api.read().await.promote_studio_curator(id, name).await?)
}