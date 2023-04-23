use std::sync::Arc;
use tokio::sync::RwLock;
pub use user::*;
pub use project::*;
pub use studio::*;

pub mod user;
pub mod project;
pub mod studio;

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