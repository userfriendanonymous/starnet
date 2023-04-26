use tauri::State;
use crate::{AppState, entities::{Project, Result}};

#[tauri::command]
pub(crate) async fn project(state: State<'_, AppState>, id: u64) -> Result<Project> {
    let data = state.api.read().await.project_meta(id).await?;
    Ok(Project::new(data))
}

#[tauri::command]
pub(crate) async fn project_thumbnail(state: State<'_, AppState>, id: u64, width: u16, height: u16) -> Result<Vec<u8>> {
    let data = state.api.read().await.project_thumbnail(id, width, height).await?;
    Ok(data)
}

#[tauri::command]
pub(crate) async fn love_project(state: State<'_, AppState>, id: u64) -> Result<()> {
    Ok(state.api.read().await.love_project(id).await?)
}

#[tauri::command]
pub(crate) async fn favorite_project(state: State<'_, AppState>, id: u64) -> Result<()> {
    Ok(state.api.read().await.favorite_project(id).await?)
}