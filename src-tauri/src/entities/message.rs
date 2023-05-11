use serde::Serialize;
use ts_rs::TS;

#[derive(Serialize, TS, Debug, Clone)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Message {
    pub id: u64,
    pub created_at: String,
    pub actor_name: String,
    pub actor_id: u64,
    pub event: MessageEvent,
}

impl From<s2rs::api::Message> for Message {
    fn from(data: s2rs::api::Message) -> Self {
        Self {
            actor_id: data.actor_id,
            actor_name: data.actor_name,
            created_at: data.created_at,
            event: data.event.into(),
            id: data.id
        }
    }
}

#[derive(Serialize, TS, Debug, Clone)]
#[ts(export)]
#[serde(rename_all = "camelCase", tag = "is" )]
pub enum MessageEvent {
    FollowUser {
        to_id: u64,
        to_name: String,
    },
    LoveProject {
        id: u64,
        title: String,
    },
    FavoriteProject {
        id: u64,
        title: String,
    },
    RemixProject {
        id: u64,
        title: String,
        parent_id: u64,
        parent_title: String,
    },
    AddComment {
        location: MessageCommentLocation,
        fragment: String,
        to_name: Option<String>,
    },
    InviteCurator {
        id: u64,
        title: String,
    },
    PromoteStudio {
        id: u64,
        title: String,
    },
    StudioActivity {
        id: u64,
        title: String,
    },
    ForumPost {
        id: u64,
        title: String,
    },
    Welcome
}

impl From<s2rs::api::MessageEvent> for MessageEvent {
    fn from(data: s2rs::api::MessageEvent) -> Self {
        type E = s2rs::api::MessageEvent;
        match data {
            E::AddComment { location, location_type, location_id, location_title, id, fragment, to_name } => {
                type L = s2rs::api::MessageCommentLocation;
                Self::AddComment {
                    location: match location {
                        L::Profile => MessageCommentLocation::Profile { id: location_id, name: location_title },
                        L::Project => MessageCommentLocation::Project { id: location_id, title: location_title },
                        L::Studio => MessageCommentLocation::Studio { id: location_id, title: location_title }
                    },
                    fragment,
                    to_name
                }
            }
            E::FavoriteProject { id, title } => Self::FavoriteProject { id, title },
            E::FollowUser { to_id, to_name } => Self::FollowUser { to_id, to_name },
            E::ForumPost { id, title } => Self::ForumPost { id, title },
            E::InviteCurator { id, title } => Self::InviteCurator { id, title },
            E::LoveProject { id, title } => Self::LoveProject { id, title },
            E::PromoteStudio { id, title } => Self::PromoteStudio { id, title },
            E::RemixProject { id, title, parent_id, parent_title } => Self::RemixProject { id, title, parent_id, parent_title },
            E::StudioActivity { id, title } => Self::StudioActivity { id, title },
            E::Welcome => Self::Welcome
        }
    }
}

#[derive(Serialize, TS, Debug, Clone)]
#[ts(export)]
#[serde(rename_all = "camelCase", tag = "is" )]
pub enum MessageCommentLocation {
    Profile {
        id: u64,
        name: String,
    },
    Project {
        id: u64,
        title: String
    },
    Studio {
        id: u64,
        title: String,
    }
}
