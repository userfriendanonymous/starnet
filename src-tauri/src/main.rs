// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;
use tokio::sync::RwLock;

mod entities;
mod commands;
mod from_vec;
mod cursor;
#[cfg(test)] mod tests;

struct AppState {
    api: RwLock<Arc<s2rs::Api>>
}

fn main() {
    use commands::*;
    let api = RwLock::new(s2rs::Api::new("".to_owned()));

    let state = AppState {
        api
    };

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![

            user, user_projects, user_icon, user_curating_studios, user_favorites, user_comments,
            send_user_comment, user_project_comments, follow_user, unfollow_user, set_profile_bio, set_profile_status,
            toggle_profile_commenting, user_featured,

            project, project_thumbnail, love_project, favorite_project,

            studio, studio_thumbnail, studio_curators, studio_managers, studio_comments, studio_activity,
            studio_projects, follow_studio, unfollow_studio, add_studio_project, remove_studio_project, send_studio_comment,
            invite_studio_curator, remove_studio_curator, set_studio_title, set_studio_description, toggle_studio_commenting,
            accept_studio_invite, open_studio, close_studio, promote_studio_curator,

            login, front_page, news, projects_loved_by_following, projects_shared_by_following, viewed_projects,

            stuff_all, stuff_shared, stuff_unshared, stuff_trashed, stuff_studios,
            messages,

            explore_projects, explore_studios,
            search_projects, search_studios,

        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}