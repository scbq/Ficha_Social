import { Component } from '@angular/core';

@Component({
  selector: 'app-searcher-table',
  imports: [],
  templateUrl: './searcher-table.component.html',
  styleUrl: './searcher-table.component.scss'
})
export class SearcherTableComponent {


  constructor() { }

  ngOnInit(): void {
  }

  itemsPerPage = 10;
  numberItems = 10;

  numberItem(valorItem: any) {
    this.numberItems = valorItem;
  }

}
