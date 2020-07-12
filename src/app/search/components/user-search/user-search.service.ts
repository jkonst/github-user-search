import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GitHubUser } from '../../models/user';
import { PageResult } from '../../models/pageResults';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  private pageResultSubject = new BehaviorSubject<PageResult>({
    users: [],
    searchTerm: '',
    totalResults: 0,
    index: 0,
  });
  pageResult$: Observable<PageResult> = this.pageResultSubject.asObservable();

  private resultsCache: { [key: string]: PageResult };

  constructor(private http: HttpClient, private userProfileService: UserProfileService) {
    this.resultsCache = {};
  }

  search(term: string, pageParam?: string) {
    const pageNo = !pageParam || pageParam === '' ? '1' : pageParam;
    const baseUrl = `https://api.github.com/search/users?q=${term}&per_page=3&page=${pageNo}`;
    if (this.existsInCache(term, baseUrl)) {
      this.pageResultSubject.next(this.resultsCache[baseUrl]);
    } else {
      this.makeRequest(term, baseUrl);
    }
  }

  private existsInCache(term: string, url: string): boolean {
    // clear cache when searching different terms
    if (!this.resultsCache[url] && !this.cacheContainsTerm(term)) {
      this.resultsCache = {};
      this.userProfileService.clearCache();
    }
    return !!this.resultsCache[url];
  }

  private cacheContainsTerm(term: string): boolean {
    const searchParam = `q=${term}`;
    return Object.keys(this.resultsCache).filter(k => k.indexOf(searchParam) > -1).length > 0;
  }

  private makeRequest(term: string, url: string) {
    this.http
      .get(url, {
        observe: 'response',
      })
      .pipe(
        map((res) => {
          const totalCount = res['body']['total_count'];
          const link =
            totalCount > 0 && res.headers.get('Link')
              ? this.parseLinkHeader(res.headers.get('Link'))
              : '';
          const items = res['body']['items'].map((i) =>
            this.constructGithubUser(i)
          ) as GitHubUser[];
          return {
            users: items,
            totalResults: totalCount,
            searchTerm: term,
            index: this.findCurrentPageIdx(link),
          };
        })
      )
      .subscribe((pr) => {
        this.pageResultSubject.next(pr);
        this.resultsCache = {...this.resultsCache, [url]: pr};
      });
  }

  private constructGithubUser(item): GitHubUser {
    return {
      login: item.login
    };
  }

  private findCurrentPageIdx(link): number {
    if (link === '') {
      return 1;
    } else {
      if (link['next']) {
        const idx = (
          +link['next'].substring(
            link['next'].indexOf('&page=') + '&page='.length
          ) - 1
        );
        return idx;
      } else {
        // last page
        const idx = (
          +link['prev'].substring(
            link['prev'].indexOf('&page=') + '&page='.length
          ) + 1
        );
        return idx;
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
