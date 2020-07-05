import { GitHubUser } from './user';

export class PageResult {
    users: GitHubUser[];
    searchTerm: string;
    totalResults: number;
    index: number;
}
