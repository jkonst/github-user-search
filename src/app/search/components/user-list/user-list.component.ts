import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GitHubUser } from '../../models/user';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnChanges {

  @Input()
  results: GitHubUser[];

  dataSource: MatTableDataSource<GitHubUser>;
  displayedColumns: string[] = ['login', 'avatarUrl', 'htmlUrl'];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const { results } = changes;
    if (results) {
      this.dataSource = new MatTableDataSource(results.currentValue);
    }
  }

}
