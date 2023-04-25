use tauri::State;
use crate::{AppState, session::Result};

#[tauri::command]
pub(crate) async fn login(state: State<'_, AppState>, name: &str, password: &str) -> Result<()> {
    state.session.login(name, password).await
}