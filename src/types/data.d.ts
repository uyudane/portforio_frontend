// ロードマップデータ
export type Roadmap = {
  title: string;
  introduction: text;
  start_skill: text;
  end_skill: text;
};

// プロフィールデータ
export type User = {
  sub?: string;
  name: string;
  github_account: string;
  twitter_account: string;
};

// プロフィール一覧データ
export type Users = User[];
