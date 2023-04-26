use serde::Serialize;
use ts_rs::TS;

// region: News
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct News {
    pub id: u64,
    pub at: String,
    pub title: String,
    pub url: String,
    pub description: String,
}

impl News {
    pub fn new(data: s2rs::api::News) -> Self {
        Self {
            at: data.at,
            description: data.description,
            id: data.id,
            title: data.title,
            url: data.url,
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::News>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}
// endregion: News

// region: FrontPage
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct FrontPage {
    pub new_projects: Vec<FrontPageProject>,
    pub featured_studios: Vec<FrontPageFeaturedStudio>,
    pub featured_projects: Vec<FrontPageProject>,
    pub curated_projects: Vec<FrontPageCuratedProject>,
    pub most_remixed_projects: Vec<FrontPageMostRemixedProject>,
    pub most_loved_projects: Vec<FrontPageProject>,
    pub design_studio_projects: Vec<FrontPageDesignStudioProject>,
}

impl FrontPage {
    pub fn new(data: s2rs::api::FrontPage) -> Self {
        Self {
            new_projects: FrontPageProject::vec_new(data.new_projects),
            featured_studios: FrontPageFeaturedStudio::vec_new(data.featured_studios),
            featured_projects: FrontPageProject::vec_new(data.featured_projects),
            curated_projects: FrontPageCuratedProject::vec_new(data.curated_projects),
            most_remixed_projects: FrontPageMostRemixedProject::vec_new(data.most_remixed_projects),
            most_loved_projects: FrontPageProject::vec_new(data.most_loved_projects),
            design_studio_projects: FrontPageDesignStudioProject::vec_new(data.design_studio_projects)
        }
    }
}

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct FrontPageProject {
    pub title: String,
    pub author_name: String,
    pub id: u64,
    pub love_count: u32,
}

impl FrontPageProject {
    pub fn new(data: s2rs::api::FrontPageProject) -> Self {
        Self {
            author_name: data.author_name,
            id: data.id,
            love_count: data.love_count,
            title: data.title
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::FrontPageProject>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct FrontPageMostRemixedProject {
    pub id: u64,
    pub title: String,
    pub remix_count: u32,
    pub love_count: u32,
    pub author_name: String,
}

impl FrontPageMostRemixedProject {
    pub fn new(data: s2rs::api::FrontPageMostRemixedProject) -> Self {
        Self {
            author_name: data.author_name,
            id: data.id,
            love_count: data.love_count,
            remix_count: data.remix_count,
            title: data.title
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::FrontPageMostRemixedProject>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct FrontPageDesignStudioProject {
    pub id: u64,
    pub studio_id: u64,
    pub studio_title: String,
    pub title: String,
    pub remix_count: u32,
    pub love_count: u32,
    pub author_name: String,
}

impl FrontPageDesignStudioProject {
    pub fn new(data: s2rs::api::FrontPageDesignStudioProject) -> Self {
        Self {
            author_name: data.author_name,
            id: data.id,
            love_count: data.love_count,
            remix_count: data.remix_count,
            title: data.title,
            studio_id: data.studio_id,
            studio_title: data.studio_title
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::FrontPageDesignStudioProject>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct FrontPageCuratedProject {
    pub id: u64,
    pub title: String,
    pub love_count: u32,
    pub author_name: String,
    pub curated_by_name: String,
}

impl FrontPageCuratedProject {
    pub fn new(data: s2rs::api::FrontPageCuratedProject) -> Self {
        Self {
            author_name: data.author_name,
            id: data.id,
            love_count: data.love_count,
            curated_by_name: data.curated_by_name,
            title: data.title
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::FrontPageCuratedProject>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct FrontPageFeaturedStudio {
    pub id: u64,
    pub title: String,
}

impl FrontPageFeaturedStudio {
    pub fn new(data: s2rs::api::FrontPageFeaturedStudio) -> Self {
        Self {
            id: data.id,
            title: data.title
        }
    }

    pub fn vec_new(data: Vec<s2rs::api::FrontPageFeaturedStudio>) -> Vec<Self> {
        data.into_iter().map(Self::new).collect()
    }
}
// endregion: FrontPage

// region: Health
#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Health {
    pub version: String,
    pub uptime: f32,
    pub load: Vec<f32>,
    pub sql: HealthSql,
    pub time_stamp: u64,
    pub cache: HealthCache,
}

impl Health {
    pub fn new(data: s2rs::api::Health) -> Self {
        Self {
            cache: HealthCache::new(data.cache),
            load: data.load,
            sql: HealthSql::new(data.sql),
            time_stamp: data.time_stamp,
            uptime: data.uptime,
            version: data.version
        }
    }
}

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct HealthCache {
    pub connected: bool,
    pub ready: bool
}

impl HealthCache {
    pub fn new(data: s2rs::api::HealthCache) -> Self {
        Self {
            connected: data.connected,
            ready: data.ready,
        }
    }
}

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct HealthSql {
    pub main: HealthSqlItem,
    pub project_comments: HealthSqlItem,
    pub studio_comments: HealthSqlItem,
    pub profile_comments: HealthSqlItem
}

impl HealthSql {
    pub fn new(data: s2rs::api::HealthSql) -> Self {
        Self {
            main: HealthSqlItem::new(data.main),
            project_comments: HealthSqlItem::new(data.project_comments),
            studio_comments: HealthSqlItem::new(data.studio_comments),
            profile_comments: HealthSqlItem::new(data.profile_comments),
        }
    }
}

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct HealthSqlItem {
    pub primary: HealthSqlItemItem,
    pub replica: HealthSqlItemItem
}

impl HealthSqlItem {
    pub fn new(data: s2rs::api::HealthSqlItem) -> Self {
        Self {
            primary: HealthSqlItemItem::new(data.primary),
            replica: HealthSqlItemItem::new(data.replica),
        }
    }
}

#[derive(Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct HealthSqlItemItem {
    pub ssl: bool,
    pub destroyed: bool,
    pub min: u32,
    pub max: u32,
    pub used_count: u32,
    pub free_count: u32,
    pub pending_acquires: u32,
    pub pending_creates: u32,
}

impl HealthSqlItemItem {
    pub fn new(data: s2rs::api::HealthSqlItemItem) -> Self {
        Self {
            destroyed: data.destroyed,
            free_count: data.free_count,
            max: data.max,
            min: data.min,
            pending_acquires: data.pending_acquires,
            pending_creates: data.pending_creates,
            ssl: data.ssl,
            used_count: data.used_count,
        }
    }
}
// endregion: Health
