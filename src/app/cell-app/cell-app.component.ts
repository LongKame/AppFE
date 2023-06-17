import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import {MatDialog} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { editURL } from '../common/api';


export class User {
  private id: any;
  private name: any;
  private dob: any;
  private salary: any;
  
  constructor(id: any, name: any, dob: any,salary: any) {
    this.id = id;
    this.name = name;
    this.dob = dob;
    this.salary = salary;
  }
}


@Component({
  selector: 'app-cell-app',
  templateUrl: './cell-app.component.html',
  styleUrls: ['./cell-app.component.scss'],
})
export class CellAppComponent implements ICellRendererAngularComp {

  params: any;
  user: any;
  dialogCommon: any;

  constructor(public dialog: MatDialog,
    private httpClient: HttpClient,
    private toast: ToastrService,
    private appComponent: AppComponent,
    private httpParams: HttpParams) { }
    agInit(params: any): void {
    this.params = params;
  }
  
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  openDialog(template: TemplateRef<any>): void {
    this.dialogCommon = this.dialog.open(template);
  }

  updateData(id: any){
    this.user = new User(this.params.data.id, this.params.data.name, this.params.data.dob, this.params.data.salary);
    this.httpClient.put(`${editURL}`,this.user).subscribe(
      (response: any) => {
        if(response.status === true){
          this.toast.success("Cập nhật thành công");
          this.appComponent.onLoad();
          this.dialogCommon.close();
        }else{
          this.toast.error("Cập nhật thâts bại");
        }
      }
    )
  }

  deleteData(id: any){

    const params = new HttpParams().set('empId', id.toString());

    // return this.http.delete<number>(`${this.apiUrl}employee/DeleteEmployee`, { params });

    this.httpClient.delete('http://localhost:8081/worker/delete/${id}').subscribe(
      (response: any) => {
        if(response === true){
          this.toast.success("Xoas thành công");
          this.appComponent.onLoad();
          this.dialogCommon.close();
        }else{
          this.toast.error("Xoas thâts bại");
          this.dialogCommon.close();
        }
      }
    )
  }
}

