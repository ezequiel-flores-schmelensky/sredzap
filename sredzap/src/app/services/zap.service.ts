import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export interface ZapData {
  _id?: string;
  name: string;
  isActive: boolean;
  trigger: any;
  action: any;
}

@Injectable({
  providedIn: 'root'
})
export class ZapService {
  private apiUrl = 'http://localhost:3000/api/zaps';
  
  constructor(private http: HttpClient) { }

  getZaps(): Observable<ZapData[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    });
    return this.http.get<ZapData[]>(this.apiUrl, { headers });
  }

  createZap(zap: ZapData): Observable<ZapData> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    });
    return this.http.post<ZapData>(this.apiUrl, zap, { headers });
  }
}
