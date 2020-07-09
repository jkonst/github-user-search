import { Observable, throwError, of } from 'rxjs';
import { catchError, map, take, share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitHubUserProfile } from '../../models/userProfile';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private profileCache: { [key: string]: Observable<GitHubUserProfile> };

  constructor(private http: HttpClient) {
    this.profileCache = {};
  }

  fetchProfile(login: string): Observable<GitHubUserProfile> {
    const baseUrl = `https://api.github.com/users/${login}`;
    if (this.existsInCache(baseUrl)) {
      return this.profileCache[baseUrl];
    } else {
      return this.makeRequest(baseUrl);
    }
  }

  clearCache() {
    this.profileCache = {};
  }

  private existsInCache(url: string): boolean {
    return !!this.profileCache[url];
  }

  private makeRequest(url: string): Observable<GitHubUserProfile> {
    const profile$ = this.http
      .get(url, {
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(err);
        }),
        map((res) => this.constructProfile(res['body'])),
        share()
      );
    profile$.pipe(take(1)).subscribe((p) => {
      this.profileCache = { ...this.profileCache, [url]: of(p) };
    });
    return profile$;
  }

  private constructProfile(body): GitHubUserProfile {
    return {
      login: body.login,
      avatarUrl: body.avatar_url,
      htmlUrl: body.html_url,
      name: body.name,
      company: body.company,
      location: body.location,
      followers: body.followers,
      following: body.following,
      blog: body.blog,
      bio: body.bio,
      repos: body.public_repos,
    };
  }
}
