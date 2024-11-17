import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public fullname: string = ''
  public job_title: string = ''
  public greetings: string = ''
  public department: string = ''
  public photo: string = ''
  public isEvening: boolean = false;
  constructor(
    private storage: Storage
  ) {}

  ngOnInit(){
    this.getData();
  }

  async getData(){
    let data = await this.storage.get('profile');
    data = JSON.parse(data)
    console.log(data);
    this.fullname = data.employee_name
    this.job_title = data.job_title
    this.department = data.department
    this.photo = "data:image/jpeg;base64," + data.photo.substring(2, data.photo.length - 1);
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      this.isEvening = false;
      this.greetings = 'Good Morning!';
    } else if (curHr < 18) {
      this.isEvening = false;
      this.greetings = 'Good Afternoon!'
    } else {
      this.isEvening = true;
      this.greetings = 'Good Evening!'
    }
  }
}
