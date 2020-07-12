import { Component, ViewChild, ElementRef } from '@angular/core';
// import { fromEvent, Observable } from 'rxjs';
// import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UserSearchService } from './user-search.service';
import { Router } from '@angular/router';
// import { PageResult } from '../../models/pageResults';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private router: Router, private searchService: UserSearchService) { }

  searchUser() {
    const searchTerm = this.input.nativeElement.value;
    this.searchService.search(searchTerm);
  }

  isInputLongEnough(): boolean {
    return this.input.nativeElement.value.length >= 4;
  }

  goHome() {
    console.log('home');
    this.router.navigate(['/']);
  }

}
