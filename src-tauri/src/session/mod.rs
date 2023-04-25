use std::sync::Arc;
use serde::Serialize;
use tokio::sync::RwLock;
use ts_rs::TS;
pub use user::*;
pub use project::*;
pub use studio::*;
pub use user_comment::*;
pub use comment::*;
pub use studio_action::*;
pub use auth::*;

pub mod user;
pub mod project;
pub mod studio;
pub mod user_comment;
pub mod comment;
pub mod studio_action;
pub mod auth;

pub type Result<T> = std::result::Result<T, Error>;

#[derive(Serialize, TS, Debug)]
#[ts(export)]
#[serde( rename_all = "camelCase", tag = "is" )]
pub enum Error {
    Status(u16),
    BadResponse,
    Network
}

impl From<s2rs::api::Error> for Error {
    fn from(value: s2rs::api::Error) -> Self {
        type E = s2rs::api::Error;
        match value {
            E::Network(error) => Error::Network,
            E::Status(status) => Error::Status(status.as_u16()),
            E::Parsing(error) => Error::BadResponse
        }
    }
}

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