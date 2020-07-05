import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GitHubUser } from '../../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { PageResult } from '../../models/pageResults';
import { Observable, Subject } from 'rxjs';
import { UserSearchService } from '../../user-search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private readonly destroy$ = new Subject();
  pageResult$: Observable<PageResult>;
  dataSource: MatTableDataSource<GitHubUser>;
  displayedColumns: string[] = ['login', 'avatarUrl', 'htmlUrl'];
  totalResults = 0;
  index = 0;
  searchTerm = '';
  constructor(private userSearchService: UserSearchService) { }

  ngOnInit() {
    this.pageResult$ = this.userSearchService.pageResult$;
    this.pageResult$.pipe(takeUntil(this.destroy$))
    .subscribe(pageResult => {
      this.dataSource = new MatTableDataSource(pageResult.users);
      this.totalResults = pageResult.totalResults;
      this.index = pageResult.index - 1;
      this.searchTerm = pageResult.searchTerm;
    });
  }

  getDifferentPage(event: PageEvent) {
    console.log(event.pageSize);
    console.log(event.pageIndex);
    const pageNo = event.pageIndex + 1;
    this.userSearchService.search(this.searchTerm, pageNo.toString());
  }

}
