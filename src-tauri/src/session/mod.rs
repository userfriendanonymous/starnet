use std::sync::Arc;
use tokio::sync::RwLock;
pub use user::*;
pub use project::*;
pub use studio::*;
pub use user_comment::*;
pub use comment::*;
pub use studio_action::*;

pub mod user;
pub mod project;
pub mod studio;
pub mod user_comment;
pub mod comment;
pub mod studio_action;

pub struct Session {
    api: RwLock<Arc<s2rs::Api>>
}

impl Session {
    pub fn new(api: RwLock<Arc<s2rs::Api>>) -> Self {
        Self {
            api
        }
    }
}