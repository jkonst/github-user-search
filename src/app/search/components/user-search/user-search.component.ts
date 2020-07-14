import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UserSearchService } from './user-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private router: Router, private searchService: UserSearchService) { }

  ngOnInit() {
    this.searchService.init();
  }

  searchUser() {
    const searchTerm = this.input.nativeElement.value;
    this.searchService.search(searchTerm);
  }

  isInputLongEnough(): boolean {
    return this.input.nativeElement.value.length >= 4;
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
