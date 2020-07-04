import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  copyright = 'Copyright';
  author = 'jkonst';
  gitUrl = 'https://github.com/jkonst';

  dateTime = new Date();

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
