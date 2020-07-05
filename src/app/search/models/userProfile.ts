import { GitHubUser } from './user';

export class GitHubUserProfile extends GitHubUser {
    name: string;
    company: string;
    location: string;
    followers: string;
    following: string;
    blog: string;
    bio: string;
}
