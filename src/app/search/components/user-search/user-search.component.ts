import { Component, ViewChild, ElementRef } from '@angular/core';
// import { fromEvent, Observable } from 'rxjs';
// import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UserSearchService } from '../../user-search.service';
// import { PageResult } from '../../models/pageResults';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {

  // pageResult$: Observable<PageResult>;
  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private searchService: UserSearchService) { }

  // ngAfterViewInit() {

  //   this.pageResult$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
  //     map((event: any) => event.target.value),
  //     debounceTime(400),
  //     distinctUntilChanged(),
  //     switchMap(s => this.searchService.search(s))
  //   );
  // }

  searchUser() {
    const searchTerm = this.input.nativeElement.value;
    console.log(searchTerm);
    this.searchService.search(searchTerm);
  }

  isInputLongEnough(): boolean {
    return this.input.nativeElement.value.length >= 4;
  }

}
