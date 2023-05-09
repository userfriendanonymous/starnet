use serde::Serialize;
use tauri::State;
use ts_rs::TS;
use crate::{AppState, entities::{Error, Result, FrontPage, News, Project2, StuffProject, StuffSharedProject, StuffStudio, ExploreQuery, Studio2, SearchQuery}, cursor::Cursor, from_vec::FromVec};
use s2rs::api::{Tokens, UserInfo};

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Login {
    pub name: String,
    pub message: String,
}

#[tauri::command]
pub(crate) async fn login(state: State<'_, AppState>, name: &str, password: &str) -> Result<Login> {
    type E = s2rs::api::LoginError;

    let data = state.api.read().await.login(name, password).await.map_err(|e| {
        dbg![ &e ];
        match e {
            E::HeaderParsing(_) | E::CookiesParsing(_) | E::HeadersConverting(_) | E::Parsing(_)
            | E::SessionIdCookieNotFound | E::SetCookieHeaderNotFound => Error::BadResponse,
            E::This(error) => error.into(),
        }
    })?;

    let tokens = Tokens {
        csrf: "a".to_owned(),
        x: data.x_token,
        session: data.session_token
    };

    let mut api = state.api.write().await;
    *api = s2rs::Api::with_auth(data.name.clone(), &tokens).map_err(|e|
        match e {
            s2rs::api::WithAuthError::Client(_) => Error::Network,
            s2rs::api::WithAuthError::Headers(_) => Error::BadResponse
        }
    )?;

    Ok(Login {
        name: data.name,
        message: data.message
    })
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
    Ok(Project2::from_vec(data))
}

#[tauri::command]
pub(crate) async fn projects_shared_by_following(state: State<'_, AppState>, cursor: Cursor) -> Result<Vec<Project2>> {
    let data = state.api.read().await.projects_shared_by_following(cursor).await?;
    Ok(Project2::from_vec(data))
}

#[tauri::command]
pub(crate) async fn viewed_projects(state: State<'_, AppState>, cursor: Cursor) -> Result<Vec<Project2>> {
    let data = state.api.read().await.viewed_projects(cursor).await?;
    Ok(Project2::from_vec(data))
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

#[tauri::command]
pub(crate) async fn stuff_all(state: State<'_, AppState>, page: u32, sort_by: &str) -> Result<Vec<StuffProject>> {
    println!("Hello");
    Ok(StuffProject::from_vec(state.api.read().await.stuff_all(page, sort_by).await.map_err(|e| {dbg![&e]; e})?))
}

#[tauri::command]
pub(crate) async fn stuff_shared(state: State<'_, AppState>, page: u32, sort_by: &str) -> Result<Vec<StuffSharedProject>> {
    Ok(StuffSharedProject::from_vec(state.api.read().await.stuff_shared(page, sort_by).await.map_err(|e| {dbg![&e]; e})?))
}

#[tauri::command]
pub(crate) async fn stuff_unshared(state: State<'_, AppState>, page: u32, sort_by: &str) -> Result<Vec<StuffProject>> {
    Ok(StuffProject::from_vec(state.api.read().await.stuff_unshared(page, sort_by).await.map_err(|e| {dbg![&e]; e})?))
}

#[tauri::command]
pub(crate) async fn stuff_trashed(state: State<'_, AppState>, page: u32, sort_by: &str) -> Result<Vec<StuffProject>> {
    Ok(StuffProject::from_vec(state.api.read().await.stuff_trashed(page, sort_by).await.map_err(|e| {dbg![&e]; e})?))
}

#[tauri::command]
pub(crate) async fn stuff_studios(state: State<'_, AppState>, page: u32, sort_by: &str) -> Result<Vec<StuffStudio>> {
    // StuffProject::from_vec(state.api.read().await.stuff_studios(page, sort_by).await?);
    Ok(vec![]) // TODO!!
}

#[tauri::command]
pub(crate) async fn explore_projects(state: State<'_, AppState>, query: ExploreQuery, cursor: Cursor) -> Result<Vec<Project2>> {
    Ok(Project2::from_vec(state.api.read().await.explore_projects(&query.into(), cursor).await?))
}


#[tauri::command]
pub(crate) async fn explore_studios(state: State<'_, AppState>, query: ExploreQuery, cursor: Cursor) -> Result<Vec<Studio2>> {
    Ok(Studio2::from_vec(state.api.read().await.explore_studios(&query.into(), cursor).await?))
}

#[tauri::command]
pub(crate) async fn search_projects(state: State<'_, AppState>, query: SearchQuery, cursor: Cursor) -> Result<Vec<Project2>> {
    Ok(Project2::from_vec(state.api.read().await.search_projects(&query.into(), cursor).await?))
}

#[tauri::command]
pub(crate) async fn search_studios(state: State<'_, AppState>, query: SearchQuery, cursor: Cursor) -> Result<Vec<Studio2>> {
    Ok(Studio2::from_vec(state.api.read().await.search_studios(&query.into(), cursor).await?))
}
