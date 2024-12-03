import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public userAttendance: any = [];
  public longitude: any = 0;
  public latitude: any = 0;
  public selectPeriod: any = ""
  public titleButton: any = "";
  public disabledButton: boolean = false;
  public popupLocation: boolean = false;
  
  public dateShow: any = "";
  alertButtons = [{
    text: 'Ok',
    handler: () => {
      this.getCoordinates()
    },
  },];
  constructor(
    private storage: Storage,
    private service: GeneralService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController, 
  ) { }

  ionViewDidEnter(){
    // this.getCoordinates();
    // this.getUserAttendanceStatus();
  }

  ngOnInit() {
    
  }

  async getCoordinates(){
    try{
      const permissions = await Geolocation.checkPermissions();

      console.log(permissions);
      if (permissions.location !== 'granted') {
        // console.log("you have both ACCESS_COARSE_LOCATION and ACCESS_FINE_LOCATION permissions!")
        await Geolocation.requestPermissions();
        // const coordinates = await Geolocation.getCurrentPosition();
        this.disabledButton = true;
        this.popupLocation = true;
        
      } else{
        const coordinates = await Geolocation.getCurrentPosition();
        this.longitude = coordinates.coords.longitude;
        this.latitude = coordinates.coords.latitude;
        console.log('Current position:', coordinates.coords);
        this.disabledButton = false;
      }
    }catch(e){
      console.log(e);
      console.log('ga nyala');
      this.disabledButton = true;
      this.popupLocation = true;
    }
// Geolocation.
    
    // this.currentCoordinates = await Geolocation.getCurrentPosition();
  }

  setOpen(isOpen: boolean) {
    this.popupLocation = isOpen;
  }

  async createAttendance(){
    console.log(this.longitude);
    console.log(this.latitude);
    
    let profile = await this.storage.get('profile')
    profile = JSON.parse(profile)

    let resp = await this.service.createAttendance({
      "employee_id": profile.employee_id,
      "longitude":this.longitude,
      "latitude":this.latitude
    });

    resp.subscribe((res: any) => {
      console.log(res);
      if(res.success){
        this.toastCall('Create Attendance Success')
      }else{
        this.toastCall('Create Attendance Failed')
      }
      // this.getCurrentPeriod();
      this.getUserAttendanceStatus();
      // this.userAttendance = res.data
    })
    
  }

  async getUserAttendanceStatus(){
    
    let profile = await this.storage.get('profile')
    profile = JSON.parse(profile)

    let resp = await this.service.userAttendanceStatus(profile.employee_id)

    resp.subscribe((res: any) => {
      console.log(res);
      if(res.data.attendance_status == 'checked_in'){
        this.titleButton = "Check Out"
        // this.disabledButton = false;
      }else if(res.data.attendance_status == 'checked_out'){
        this.titleButton = "Check In"
        // this.disabledButton = true;
      }
      // this.userAttendance = res.data
    })
    
  }

  async toastCall(message: any){
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
