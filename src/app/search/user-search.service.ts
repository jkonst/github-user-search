import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GitHubUser } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  constructor(private http: HttpClient) {}

  search(login: string): Observable<GitHubUser[]> {
    return this.http
      .get(`https://api.github.com/search/users?q=${login}`, {
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
        map((res) => {
          console.log(res['body']);
          const totalCount = res['body']['total_count'];
          const link = totalCount > 0 && res.headers.get('Link') ? this.parseLinkHeader(res.headers.get('Link')) : '';
          console.log(link);
          const items = res['body']['items'].map(i => ({login: i.login, avatarUrl: i.avatar_url, htmlUrl: i.html_url})) as GitHubUser[];
          return items;
        })
      );
  }

  private parseLinkHeader(header) {
    if (header.length === 0) {
      return;
    }
    const parts = header.split(',');
    const links = {};
    parts.forEach((p) => {
      const section = p.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });
    return links;
  }
}
