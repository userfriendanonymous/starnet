use serde::Serialize;
use ts_rs::TS;
pub use user::*;
pub use project::*;
pub use studio::*;
pub use user_comment::*;
pub use comment::*;
pub use studio_action::*;
pub use stuff::*;
pub use front_page::*;
pub use user_featured::*;
pub use explore::*;
pub use language::*;
pub use search::*;

pub mod user;
pub mod project;
pub mod studio;
pub mod user_comment;
pub mod comment;
pub mod studio_action;
pub mod stuff;
pub mod front_page;
pub mod user_featured;
pub mod explore;
pub mod language;
pub mod search;

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
            E::Network(_) => Error::Network,
            E::Status(status) => Error::Status(status.as_u16()),
            E::Parsing(_) => Error::BadResponse
        }
    }
}
