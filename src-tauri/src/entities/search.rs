use serde::Deserialize;
use ts_rs::TS;

use super::ExploreMode;


#[derive(Clone, Debug, TS, Deserialize)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct SearchQuery {
    pub mode: Option<ExploreMode>,
    pub query: Option<String>,
}

impl From<SearchQuery> for s2rs::api::SearchQuery {
    fn from(value: SearchQuery) -> Self {
        Self {
            mode: value.mode.map(|e| e.into()),
            query: value.query
        }
    }
}