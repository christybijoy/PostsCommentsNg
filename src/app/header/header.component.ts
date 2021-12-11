import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * Holds the title
   */
   public title: string = 'Digital Assignment – Posts & Comments';

  constructor() { }

  ngOnInit(): void {
  }

}
