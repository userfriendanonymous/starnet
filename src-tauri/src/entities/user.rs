use serde::Serialize;
use ts_rs::TS;

// region: User
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub scratch_team: bool,
    pub id: u64,
    pub bio: String,
    pub status: String,
    pub country: String,
    pub history: UserHistory,
    pub name: String,
}

impl User {
    pub fn new(data: s2rs::api::User) -> Self {
        Self {
            bio: data.profile.bio,
            country: data.profile.country,
            id: data.id,
            history: UserHistory::new(data.history),
            scratch_team: data.scratch_team,
            status: data.profile.status,
            name: data.name,
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::User>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}
// endregion: User

// region: UserHistory
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct UserHistory {
    pub joined: String
}

impl UserHistory {
    pub fn new(data: s2rs::api::UserHistory) -> Self {
        Self {
            joined: data.joined
        }
    }
}
// endregion: UserHistory
