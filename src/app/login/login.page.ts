import { Component, inject, OnInit } from '@angular/core';
import { GeneralService } from '../api/general.service';
import { LoadingController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public username: string = '';
  public password: string = '';

  constructor(
    private service: GeneralService, 
    private loadingCtrl: LoadingController, 
    private storage: Storage,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // this.service.login({"username":"triwahyudisaja@gmail.com","password":"123456"});
    // this.service.userLeavesDetail(47);
    // this.service.createAttendance({"employee_id": 9,longitude: 106.7084412,"latitude": -6.2008551});
      // this.service.userAttendanceList({
      //   "employee_id": 9,
      //   "start_date":"01-07-2024",
      //   "end_date":"31-07-2024"
      // });
    // this.service.userLeavesType();
    // this.service.userLeavesList({
    //     "employee_id": 9,
    //     "start_date":"01-01-2024",
    //     "end_date":"31-12-2024"
    // })
    // this.service.userLeavesCreate({
    //   "employee_id": 9,
    //   "start_date":"01-07-2024",
    //   "end_date":"02-07-2024",
    //   "leave_type_id": 9, 
    //   "description":"Test Description",
    //   "attachment":"123"
    // })
    this.getData();
  }

  async showLoading() {
    
  }

  async login(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait ...',
    });

    loading.present();

    let resp = await this.service.login({"username":this.username,"password":this.password})
    
    resp.subscribe((res: any) => {
      console.log(res);
      loading.dismiss();
      if(res.success){
        // this.service.saveDataLocal({key:'profile', value:JSON.stringify(res.data[0])})
        // Preferences.set({key: 'profile', value: JSON.stringify(res.data[0]) });
        this.storage.set('profile', JSON.stringify(res.data[0]));
        this.navCtrl.navigateRoot('/tabs/tab1')
        
        // let data: any = this.service.getDataLocal({key:'profile'});
        // console.log(JSON.parse(data));
        // let tes = JSON.parse(data);
        // console.log(tes);
        
      }else{
        // this.username = '';
        // this.password = '';
        this.presentAlert(res.message);
      }
    })
  }

  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async getData() {
    // this.storage.clear();
    let getData = await this.storage.get('profile');
    console.log(getData);
    
    if(getData != null){
      this.navCtrl.navigateRoot('/tabs/tab1', {replaceUrl:true})
    }
  }
}
