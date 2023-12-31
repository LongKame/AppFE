import { Component, OnInit } from '@angular/core';
// import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { CellAppComponent } from './cell-app/cell-app.component';
import { ICellRendererAngularComp } from 'ag-grid-angular';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  // standalone: true,
  // imports: [MatTableModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
   this.onLoad();
  }

  title = 'AngularApp';

  constructor(private httpClient: HttpClient,
     ){};

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  data = 'ok';
  columnDefs = [
		{headerName: 'Id', field: 'id', sortable: true, filter: true, },
		{headerName: 'Name', field: 'name', sortable: true, filter: true, },
		{headerName: 'Dob', field: 'dob', sortable: true, filter: true,},
    {headerName: 'Salary', field: 'salary', sortable: true, filter: true,},
    {headerName: 'Action', cellRendererFramework: CellAppComponent},
	];

  rowData = [];

  change(){
    this.data = "null";
  }

  onLoad(){
    this.httpClient.get<any>('http://localhost:8081/worker/getAll').subscribe(
      response => {
        this.dataSource = response;
        this.rowData = response;
        console.log('???',JSON.stringify(response));
      }
    )
  }
}
