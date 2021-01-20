import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Item } from '../item';

const url = 'http://localhost:4200//items';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  item: Item = this.setEmptyItem();
  items: Item[];

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    this.getData();
  }

  setEmptyItem(): Item {
    return {
      id: null,
      name: null
    };
  }

  getData(): void {
    const headers = new HttpHeaders({'Content-Type': 'application/json' });
    let params = new HttpParams();

    if (this.item.id) {
      params = params.set('id', `${this.item.id}`);
    }
    if (this.item.name) {
      params = params.set('name', `${this.item.name}`);
    }

    const options = {headers, params};
    this.http.get<Item[]>(url, options).subscribe(
      res => {
        this.items = res;
      },
    );
    }

  postData(): void | boolean {
  if (!this.item.id || !this.item.name) {
    alert('Поля ID / name  не заполнены');
    return false;
   } else if (this.item.id <= this.items[this.items.length - 1].id) {
     alert('Введенный ID существует');
     return false;
   }

   const data = this.item;

   const headers = new HttpHeaders({'Content-Type': 'application/json' });

   const options = {headers};
    this.http.post<Item>(url, data, options).subscribe(
      res => this.items.push(res),
      err => console.log(err)
    );
  }

  clearAndGet(): void {
    this.items.length = 0;
    this.item = this.setEmptyItem();

    this.getData();
  }

}
