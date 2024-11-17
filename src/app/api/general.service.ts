import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private http = inject(HttpClient);
  private tokenBearer = "123456";
  // private baseURL = "https://dev-apresika.anysoft.id";
  private baseURL = "https://apresika.com";
  constructor() { }

  generalCallApi(method: string, url: any, body: any): any{
    var headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + this.tokenBearer,
    });
    if(method == "post"){
      return this.http.post(url, body, {headers: headers});
    }else if(method == "get"){
      return this.http.get(url, {headers: headers});
    }
  }

  login(body: any){
    return this.generalCallApi('post', `${this.baseURL}/api/user/login`, body)
  }

  userAttendanceList(body: any){
    return this.generalCallApi('post', `${this.baseURL}/api/user/attendance/list`, body)
  }

  createAttendance(body: any){
    return this.generalCallApi('post', `${this.baseURL}/api/user/attendance`, body)
  }

  userLeavesType(){
    return this.generalCallApi('get', `${this.baseURL}/api/user/leaves/type`, null)
  }

  userLeavesList(body:any){
    return this.generalCallApi('post', `${this.baseURL}/api/user/leaves/list`, body)
  }

  userLeavesCreate(body: any){
    return this.generalCallApi('post', `${this.baseURL}/api/user/leaves/create`, body)
  }

  userLeavesDetail(param: any){
    return this.generalCallApi('get', `${this.baseURL}/api/user/leaves/detail/${param}`, null)
  }

  userLeavesCancel(param: any){
    return this.generalCallApi('get', `${this.baseURL}/api/user/leaves/cancel/${param}`, null)
  }

  userAttendanceStatus(param: any){
    return this.generalCallApi('get', `${this.baseURL}/api/user/attendance/status/${param}`, null)
  }

  payslipList(body: any){
    return this.generalCallApi('post', `${this.baseURL}/api/user/payslip/list`, body)
  }

  payslipDetail(id: any){
    return this.generalCallApi('get', `${this.baseURL}/api/user/payslip/detail/${id}`, null)
  }

  leavesRemaining(body: any){
    return this.generalCallApi('post', `${this.baseURL}/api/user/leaves/remaining`, body)
  }

  leavesRemainingDetail(body: any){
    return this.generalCallApi('post', `${this.baseURL}/api/user/leaves/remaining/detail`, body)
  }

  userProfile(body: any){
    return this.generalCallApi('post', `${this.baseURL}/api/user/profile`, body)
  }

  downloadPayslip(id: any){
    return this.generalCallApi('get', `${this.baseURL}/api/user/payslip/download/${id}`, null)
  }

  async saveDataLocal(data: any){
    await Preferences.set(data);
  }

  async getDataLocal(data: any){
    return await Preferences.get(data);
  }
}
