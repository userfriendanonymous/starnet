use tauri::State;
use crate::{AppState, entities::{Error, Result, FrontPage, News, Project2}, cursor::Cursor};
use s2rs::api::{Tokens, UserInfo};

#[tauri::command]
pub(crate) async fn login(state: State<'_, AppState>, name: &str, password: &str) -> Result<()> {
    type E = s2rs::api::LoginError;

    let data = state.api.read().await.login(name, password).await.map_err(|e| 
        match e {
            E::HeaderParsing(_) | E::CookiesParsing(_) | E::HeadersConverting(_) | E::Parsing(_)
            | E::SessionIdCookieNotFound | E::SetCookieHeaderNotFound => Error::BadResponse,
            E::This(error) => error.into(),
        }
    )?;

    let tokens = Tokens {
        csrf: "a".to_owned(),
        x: data.x_token,
        session: data.session_token
    };

    let mut api = state.api.write().await;
    *api = s2rs::Api::with_auth(data.name, &tokens).map_err(|e|
        match e {
            s2rs::api::WithAuthError::Client(_) => Error::Network,
            s2rs::api::WithAuthError::Headers(_) => Error::BadResponse
        }
    )?;

    Ok(())
}

#[tauri::command]
pub(crate) async fn front_page(state: State<'_, AppState>) -> Result<FrontPage> {
    let data = state.api.read().await.front_page().await?;
    Ok(FrontPage::new(data))
}

#[tauri::command]
pub(crate) async fn news(state: State<'_, AppState>) -> Result<Vec<News>> {
    let data = state.api.read().await.news().await?;
    Ok(News::vec_new(data))
}

#[tauri::command]
pub(crate) async fn projects_loved_by_following(state: State<'_, AppState>, cursor: Cursor) -> Result<Vec<Project2>> {
    let data = state.api.read().await.projects_loved_by_following(cursor).await?;
    Ok(Project2::vec_new(data))
}

#[tauri::command]
pub(crate) async fn projects_shared_by_following(state: State<'_, AppState>, cursor: Cursor) -> Result<Vec<Project2>> {
    let data = state.api.read().await.projects_shared_by_following(cursor).await?;
    Ok(Project2::vec_new(data))
}

#[tauri::command]
pub(crate) async fn viewed_projects(state: State<'_, AppState>, cursor: Cursor) -> Result<Vec<Project2>> {
    let data = state.api.read().await.viewed_projects(cursor).await?;
    Ok(Project2::vec_new(data))
}

#[tauri::command]
pub(crate) async fn set_profile_bio(state: State<'_, AppState>, content: String) -> Result<()> {
    state.api.read().await.set_profile_info(&UserInfo {
        bio: Some(content),
        ..Default::default()
    }).await?;
    Ok(())
}

#[tauri::command]
pub(crate) async fn set_profile_status(state: State<'_, AppState>, content: String) -> Result<()> {
    state.api.read().await.set_profile_info(&UserInfo {
        status: Some(content),
        ..Default::default()
    }).await?;
    Ok(())
}

#[tauri::command]
pub(crate) async fn toggle_profile_commenting(state: State<'_, AppState>) -> Result<()> {
    Ok(state.api.read().await.toggle_profile_commenting().await?)
}