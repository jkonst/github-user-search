import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { UserSearchService } from '../../user-search.service';
import { GitHubUser } from '../../models/user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements AfterViewInit {

  users$: Observable<GitHubUser[]>;
  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private searchService: UserSearchService) { }

  ngAfterViewInit() {

    this.users$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      tap(s => console.log(s)),
      switchMap(s => this.searchService.search(s))
    );
  }

}
