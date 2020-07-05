import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GitHubUser } from './models/user';
import { PageResult } from './models/pageResults';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  private pageResultSubject = new BehaviorSubject<PageResult>({ users: [], searchTerm: '', totalResults: 0, index: 0});
  pageResult$: Observable<PageResult> = this.pageResultSubject.asObservable();

  constructor(private http: HttpClient) {}

  search(term: string, pageParam?: string) {
    const baseUrl = !pageParam || pageParam === '' ? `https://api.github.com/search/users?q=${term}`
    : `https://api.github.com/search/users?q=${term}&page=${pageParam}`;
    this.http
      .get(baseUrl, {
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
            console.log(err);
            return throwError(err);
        }),
        map((res) => {
          const totalCount = res['body']['total_count'];
          const link = totalCount > 0 && res.headers.get('Link') ? this.parseLinkHeader(res.headers.get('Link')) : '';
          console.log(link);
          const items = res['body']['items'].map(i => this.constructGithubUser(i)) as GitHubUser[];
          return {
              users: items,
              totalResults: totalCount,
              searchTerm: term,
              index: this.findCurrentPageIdx(link)
          };
        })
      ).subscribe(pr => this.pageResultSubject.next(pr));
  }

  private constructGithubUser(item): GitHubUser {
      return {
          login: item.login,
          avatarUrl: item.avatar_url,
          htmlUrl: item.html_url
      };
  }

  private findCurrentPageIdx(link): number {
    if (link === '') {
      return 1;
    } else {
      if (link['next']) {
        return +link['next'].substring(link['next'].indexOf('page=') + 'page='.length) - 1;
      } else { // last page
        return +link['prev'].substring(link['prev'].indexOf('page=') + 'page='.length) + 1;
      }
    }
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
