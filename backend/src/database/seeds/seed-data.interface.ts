export interface SeedUser {
  username: string;
  password: string;
}

export interface SeedPost {
  title: string;
  content: string;
  authorUsername: string;
}

export interface SeedData {
  users: SeedUser[];
  posts: SeedPost[];
}
