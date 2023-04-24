use tauri::State;
use crate::{AppState, session::{User, Project3, Studio, UserComment}, cursor::Cursor};

#[tauri::command]
pub(crate) async fn user(state: State<'_, AppState>, name: &str) -> Result<User, ()> {
    state.session.user(name).await
}

#[tauri::command]
pub(crate) async fn user_icon(state: State<'_, AppState>, id: u64, width: u16, height: u16) -> Result<Vec<u8>, ()> {
    state.session.user_icon(id, width, height).await
}

#[tauri::command]
pub(crate) async fn user_projects(state: State<'_, AppState>, name: &str, cursor: Cursor) -> Result<Vec<Project3>, ()> {
    state.session.user_projects(name, cursor.into()).await
}

#[tauri::command]
pub(crate) async fn user_favorites(state: State<'_, AppState>, name: &str, cursor: Cursor) -> Result<Vec<Project3>, ()> {
    state.session.user_favorites(name, cursor.into()).await
}

#[tauri::command]
pub(crate) async fn user_curating_studios(state: State<'_, AppState>, name: &str, cursor: Cursor) -> Result<Vec<Studio>, ()> {
    state.session.user_curating_studios(name, cursor.into()).await
}

#[tauri::command]
pub(crate) async fn user_comments(state: State<'_, AppState>, name: &str, cursor: Cursor) -> Result<Vec<UserComment>, ()> {
    state.session.user_comments(name, cursor.into()).await
}
