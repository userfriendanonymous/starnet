use serde::Serialize;
use ts_rs::TS;

#[derive(Debug, Serialize, TS)]
#[ts(export)]
#[serde( rename_all = "camelCase" )]
pub struct StudioAction {
    pub id: u64,
    pub actor_name: String,
    pub actor_id: u64,
    pub created_at: String,
    pub event: StudioActionEvent,
}

impl StudioAction {
    pub fn new(data: s2rs::api::StudioAction) -> Self {
        Self {
            actor_id: data.actor_id,
            actor_name: data.actor_name,
            created_at: data.created_at,
            event: StudioActionEvent::new(data.event),
            id: data.id
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::StudioAction>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}

#[derive(Debug, Serialize, TS)]
#[ts(export)]
#[serde( rename_all = "camelCase", tag = "is" )]
pub enum StudioActionEvent {
    Update,
    AddProject {
        id: u64, // project_id
        title: String // project_title
    },
    RemoveProject {
        id: u64, // both same as on add project
        title: String,
    },
    AcceptInvite {
        from_name: String, // username
    },
    Promote {
        name: String // recipient_username
    },
}

impl StudioActionEvent {
    pub fn new(data: s2rs::api::StudioActionEvent) -> Self {
        type D = s2rs::api::StudioActionEvent;
        match data {
            D::AcceptInvite { from_name } => Self::AcceptInvite { from_name },
            D::AddProject { id, title } => Self::AddProject { id, title },
            D::Promote { name } => Self::Promote { name },
            D::RemoveProject { id, title } => Self::RemoveProject { id, title },
            D::Update => Self::Update
        }
    }
}
