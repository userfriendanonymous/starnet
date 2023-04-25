use s2rs::api::Tokens;
use super::Session;

impl Session {
    pub async fn login(&self, name: &str, password: &str) -> Result<(), super::Error> {
        type E = s2rs::api::LoginError;

        let data = self.api.read().await.login(name, password).await.map_err(|e| 
            match e {
                E::HeaderParsing(_) | E::CookiesParsing(_) | E::HeadersConverting(_) | E::Parsing(_)
                | E::SessionIdCookieNotFound | E::SetCookieHeaderNotFound => super::Error::BadResponse,
                E::This(error) => error.into(),
            }
        )?;

        let tokens = Tokens {
            csrf: "a".to_owned(),
            x: data.x_token,
            session: data.session_token
        };

        let mut api = self.api.write().await;
        *api = s2rs::Api::with_auth(data.name, &tokens).map_err(|e|
            match e {
                s2rs::api::WithAuthError::Client(_) => super::Error::Network,
                s2rs::api::WithAuthError::Headers(_) => super::Error::BadResponse
            }
        )?;

        Ok(())
    }
}