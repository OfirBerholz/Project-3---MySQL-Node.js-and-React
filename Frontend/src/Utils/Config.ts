class Config {
  public authUrl = "http://localhost:3001/api/auth/";
  public vacationsUrl = "http://localhost:3001/api/vacations/";
  public followUrl = "http://localhost:3001/api/follow";
  public unFollowUrl = "http://localhost:3001/api/unFollow";
}

const appConfig = new Config();

export default appConfig;
