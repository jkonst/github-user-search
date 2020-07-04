import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

}
