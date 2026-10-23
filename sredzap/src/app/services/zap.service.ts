import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get<ZapData[]>(this.apiUrl);
  }

  createZap(zap: ZapData): Observable<ZapData> {
    return this.http.post<ZapData>(this.apiUrl, zap);
  }
}
