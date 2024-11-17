import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.page.html',
  styleUrls: ['./payroll.page.scss'],
})
export class PayrollPage implements OnInit {
  public fullname: string = ''
  public job_title: string = ''
  public greetings: string = ''
  public department: string = ''
  public photo: string = ''
  public isEvening: boolean = false;
  public dataProfile: any = ''
  constructor(
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  ngOnInit(){
    this.getData();
    this.getDataDetail();
  }

  onBack(){
    this.navCtrl.back();
  }

  async getData(){
    let data = await this.storage.get('profile');
    data = JSON.parse(data)
    console.log(data);
    this.fullname = data.employee_name
    this.job_title = data.job_title
    this.department = data.department
    this.photo = "data:image/jpeg;base64," + data.photo.substring(2, data.photo.length - 1);
  }

  async getDataDetail(){
    let data = await this.storage.get('profile_full');
    data = JSON.parse(data)
    console.log(data);
    this.dataProfile = data;
  }
}
