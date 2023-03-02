import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';

const baseUrl = 'https://tnt-backend.vercel.app/api/menu';

const token = window.sessionStorage.getItem("auth-token");
const httpOptions = {
  headers: new HttpHeaders({ "x-access-token": `${token}`})
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(shopId: string | null): Observable<Product[]>{   
    return this.http.get<Product[]>(`${baseUrl}/${shopId}/all`)
  }

  get(id: any): Observable<Product> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: Product, shopId: any): Observable<Product> { 
    return this.http.post(`${baseUrl}/${shopId}`, data, httpOptions);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(shopId: any): Observable<Product> {
    return this.http.delete(`${baseUrl}/${shopId}/all`);
  }

  findByTitle(name: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/all/?name=${name}`);
  }
}
