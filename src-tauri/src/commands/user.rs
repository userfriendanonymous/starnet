use tauri::State;
use crate::{AppState, session::{User, Project3}};

#[tauri::command]
pub(crate) async fn user(state: State<'_, AppState>, name: &str) -> Result<User, ()> {
    state.session.user(name).await
}

#[tauri::command]
pub(crate) async fn user_projects(state: State<'_, AppState>, name: &str) -> Result<Vec<Project3>, ()> {
    state.session.user_projects(name).await
}
