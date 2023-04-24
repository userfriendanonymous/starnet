use tauri::State;
use crate::{AppState, session::{Studio, User, Comment, StudioAction, StudioProject}, cursor::Cursor};

#[tauri::command]
pub(crate) async fn studio(state: State<'_, AppState>, id: u64) -> Result<Studio, ()> {
    state.session.studio(id).await
}

#[tauri::command]
pub(crate) async fn studio_thumbnail(state: State<'_, AppState>, id: u64, width: u16, height: u16) -> Result<Vec<u8>, ()> {
    state.session.studio_thumbnail(id, width, height).await
}

#[tauri::command]
pub(crate) async fn studio_projects(state: State<'_, AppState>, id: u64, cursor: Cursor) -> Result<Vec<StudioProject>, ()> {
    state.session.studio_projects(id, cursor.into()).await
}

#[tauri::command]
pub(crate) async fn studio_curators(state: State<'_, AppState>, id: u64, cursor: Cursor) -> Result<Vec<User>, ()> {
    state.session.studio_curators(id, cursor.into()).await
}

#[tauri::command]
pub(crate) async fn studio_managers(state: State<'_, AppState>, id: u64, cursor: Cursor) -> Result<Vec<User>, ()> {
    state.session.studio_managers(id, cursor.into()).await
}

#[tauri::command]
pub(crate) async fn studio_comments(state: State<'_, AppState>, id: u64, cursor: Cursor) -> Result<Vec<Comment>, ()> {
    state.session.studio_comments(id, cursor.into()).await
}

#[tauri::command]
pub(crate) async fn studio_activity(state: State<'_, AppState>, id: u64, cursor: Cursor) -> Result<Vec<StudioAction>, ()> {
    state.session.studio_activity(id, cursor.into()).await
}