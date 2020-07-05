import { GitHubUser } from './user';

export class GitHubUserProfile extends GitHubUser {
    htmlUrl: string;
    avatarUrl: string;
    name: string;
    company: string;
    location: string;
    followers: string;
    following: string;
    blog: string;
    bio: string;
    repos: string;
}
