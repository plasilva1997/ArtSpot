import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ListModel} from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private url = 'http://localhost:3000/art';

  constructor(public http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url);
  }

  getById(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  add(place: ListModel) {
    return this.http.post<ListModel>(this.url, place);
  }
}
