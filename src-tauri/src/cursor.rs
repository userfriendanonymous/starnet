use serde::Deserialize;
use ts_rs::TS;

#[derive(Deserialize, Debug, TS)]
#[ts(export)]
#[serde( rename_all = "camelCase" )]
pub struct Cursor {
    pub start: u32,
    pub end: Option<u32>,
}

impl From<Cursor> for s2rs::Cursor {
    fn from(value: Cursor) -> s2rs::Cursor {
        s2rs::Cursor::new(value.start as usize, value.end.map(|v| v as usize))
    }
}