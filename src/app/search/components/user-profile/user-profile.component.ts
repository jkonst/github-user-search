import { Component, Input, OnChanges, SimpleChanges, OnInit, Inject } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { GitHubUserProfile } from '../../models/userProfile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnChanges {

  @Input()
  login: string;
  profile$: Observable<GitHubUserProfile>;

  constructor(private userProfileService: UserProfileService, @Inject(DOCUMENT) private document: Document) {}

  ngOnChanges(changes: SimpleChanges) {
    const { login } = changes;
    if (login && login.currentValue) {
      this.profile$ = this.userProfileService.fetchProfile(login.currentValue);
    }
  }

  navigateToGitHub(profileUrl: string) {
    this.document.location.href = profileUrl;
  }

}
