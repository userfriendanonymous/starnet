// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use session::Session;
use tokio::sync::RwLock;

mod session;
mod commands;
mod cursor;
#[cfg(test)] mod tests;

struct AppState {
    pub session: Session
}

fn main() {
    let api = RwLock::new(s2rs::Api::new("".to_owned()));

    let state = AppState {
        session: Session::new(api)
    };

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![

            commands::user, commands::user_projects, commands::user_icon, commands::user_curating_studios, commands::user_favorites,
            commands::user_comments,
            commands::project, commands::project_thumbnail, commands::project_comments,
            commands::studio, commands::studio_thumbnail, commands::studio_curators, commands::studio_managers, commands::studio_comments, commands::studio_activity,
            commands::studio_projects

        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}