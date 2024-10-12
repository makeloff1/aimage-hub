// DBに登録する際の型
export interface MongoDbUser {
  id: string;
  loginType: "local" | "google";
  defaultLanguage: "jp" | "en";
  loginId: string;
  displayName: string;
  mail: string;
  role: "user" | "admin" | "maintainer";
  password: string;
}
