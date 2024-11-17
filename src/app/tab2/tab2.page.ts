import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GeneralService } from '../api/general.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public fullname: string = ''
  public job_title: string = ''
  public greetings: string = ''
  public department: string = ''
  public photo: string = ''
  public isEvening: boolean = false;
  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private service: GeneralService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(){
    this.getData();
    this.getDataProfile();
  }

  onBack(){
    this.navCtrl.back();
  }

  logOut(){
    this.storage.clear();
    this.navCtrl.navigateRoot('login')
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

  async getDataProfile(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait ...',
    });

    loading.present();
    let profile = await this.storage.get('profile')
    profile = JSON.parse(profile)
    
    let resp = await this.service.userProfile({
      "employee_id": profile.employee_id
    });

    resp.subscribe((res: any) => {
      loading.dismiss();
      console.log(res);
      this.storage.set('profile_full', JSON.stringify(res.data[0]));
      // this.userLeavesList = res.data.detail_leaves
      // this.remainingLeaves = res.data.remaining_leaves
    })
  }
}
