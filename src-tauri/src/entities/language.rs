use serde::Deserialize;
use ts_rs::TS;

#[derive(Debug, PartialEq, Eq, Clone, TS, Deserialize)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum Language {
    Abkhazian,
    Afrikaans,
    Arabic,
    Amharic,
    Aragonese,
    Asturian,
    Azerbaijani,
    Indonesian,
    Bengali,
    Belarusian,
    Bulgarian,
    Catalan,
    Czech,
    Welsh,
    Danish,
    German,
    Estonian,
    Greek,
    English,
    Spanish,
    SpanishLatinAmerica,
    Esperanto,
    Basque,
    Persian,
    Filipino,
    French,
    Frisian,
    Irish,
    Gaelish,
    Korean,
    Hausa,
    Armenian,
    Croatian,
    Xhosa,
    Zulu,
    Icelandic,
    Italian,
    Kannada,
    Kazakh,
    Quechua,
    Swahili,
    HatianCreole,
    Kurdish,
    CentralKurdish,
    Latvian,
    Lithuanian,
    Hungarian,
    Maori,
    Mongolian,
    Dutch,
    Japanese,
    JapaneseWithoutKanji,
    NorwegianBokmal,
    NorwegianNynorsk,
    Occitan,
    Oriya,
    Uzbek,
    Thai,
    CentralKhmer,
    Polish,
    Portuguese,
    PortugueseBrazil,
    RapaNui,
    Romanian,
    Russian,
    NorthernSotho,
    Tswana,
    Slovak,
    Slovenian,
    Serbian,
    Finish,
    Swedish,
    Vietnamese,
    Turkish,
    Ukrainian,
    SimplifiedChinese,
    TraditionalChinese,
    Custom(String)
}

impl Language {
    pub fn as_code(&self) -> &str {
        match self {
            Self::English => "en",
            Self::Russian => "ru",
            Self::Custom(name) => name,
            _ => panic!("Your language `{self:?}` is not yet supported, use Language::Custom(\"...\")")
        }
    }
}

impl From<Language> for s2rs::Language {
    fn from(value: Language) -> Self {
        match value {
            Language::English => Self::English,
            Language::Russian => Self::Russian,
            // Language::Custom(name) => Self::Custom(&name),
            _ => panic!["Your language `{value:?}` is not yet supported, use Language::Custom(\"...\")"]
        }
    }
}