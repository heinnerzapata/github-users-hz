export interface IGitHubUser {
  name: string;
  lastName: string;
  email: string;
  id: string;
  date: Date;
  gitUser: string;
  avatar?: string;
}

export interface IGitHubUserRepo {
  name: string;
  default_branch: string;
  language: string;
  git_url: string;
  description: string;
}