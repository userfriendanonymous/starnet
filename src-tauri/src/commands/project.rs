use tauri::State;
use crate::{AppState, session::{Project, Comment}, cursor::Cursor};

#[tauri::command]
pub(crate) async fn project(state: State<'_, AppState>, id: u64) -> Result<Project, ()> {
    state.session.project(id).await
}

#[tauri::command]
pub(crate) async fn project_thumbnail(state: State<'_, AppState>, id: u64, width: u16, height: u16) -> Result<Vec<u8>, ()> {
    state.session.project_thumbnail(id, width, height).await
}

#[tauri::command]
pub(crate) async fn project_comments(state: State<'_, AppState>, id: u64, cursor: Cursor) -> Result<Vec<Comment>, ()> {
    state.session.project_comments(id, cursor.into()).await
}