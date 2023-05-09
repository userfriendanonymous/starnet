use serde::Deserialize;
use ts_rs::TS;
use super::Language;


#[derive(Debug, Clone, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct ExploreQuery {
    pub query: Option<String>,
    pub mode: Option<ExploreMode>,
    pub language: Option<Language>,
}

impl From<ExploreQuery> for s2rs::api::ExploreQuery {
    fn from(value: ExploreQuery) -> Self {
        Self {
            language: value.language.map(|e| e.into()),
            mode: value.mode.map(|e| e.into()),
            query: value.query
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, TS, Deserialize)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum ExploreMode {
    Popular,
    Trending,
}

impl From<ExploreMode> for s2rs::api::ExploreMode {
    fn from(value: ExploreMode) -> Self {
        match value {
            ExploreMode::Popular => Self::Popular,
            ExploreMode::Trending => Self::Trending,
        }
    }
}