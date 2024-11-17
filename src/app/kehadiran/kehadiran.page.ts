import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-kehadiran',
  templateUrl: './kehadiran.page.html',
  styleUrls: ['./kehadiran.page.scss'],
})
export class KehadiranPage implements OnInit {
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
    this.getUserAttendanceStatus();
  }

  ngOnInit() {
    let currentDate: any = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    currentDate = currentDate.getDate() + ' ' + month + ' ' + currentDate.getFullYear();
    this.dateShow = currentDate;
    console.log(currentDate);
    
    // this.getCoordinates();
    this.getCurrentPeriod();
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

  getCurrentPeriod(){
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.selectPeriod = this.convert(firstDay.toString()).split('-')[1]

    this.getUserAttendanceList(this.convert(firstDay.toString()), this.convert(lastDay.toString()))
  }

  changePeriod(){
    console.log(this.selectPeriod);
    this.getFilter(this.selectPeriod);
  }

  getFilter(month: any){
    var find = month + '/01/2024';
    var date = new Date(find);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.getUserAttendanceList(this.convert(firstDay.toString()), this.convert(lastDay.toString()))
  }

  convert(str: any) {
    var mnths: any = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
      },
      date = str.split(" ");
  
    return [date[2], mnths[date[1]], date[3]].join("-");
  }
  
  setOpen(isOpen: boolean) {
    this.popupLocation = isOpen;
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

  async getUserAttendanceList(startDate: any, endDate: any){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait ...',
    });

    loading.present();
    let profile = await this.storage.get('profile')
    profile = JSON.parse(profile)

    let resp = await this.service.userAttendanceList({
      "employee_id": profile.employee_id,
      "start_date": startDate,
      "end_date": endDate
    });

    resp.subscribe((res: any) => {
      loading.dismiss();
      console.log(res);
      res.data.forEach((res: any) => {
        
        if(!res.check_in){
          res.check_in = '-'
        }else{
          res.check_in = this.parseTanggal(res.check_in)
        }

        if(!res.check_out){
          res.check_out = '-'
        }else{
          res.check_out = this.parseTanggal(res.check_out)
        }
        
      });
      this.userAttendance = res.data
    })
    
  }

  parseTanggal(date:string){
    let tgl = date.split('T')
    let temptgl = tgl[0].split('-')
    let tglFix = `${temptgl[2]}-${temptgl[1]}-${temptgl[0]}`
    
    let jam = tgl[1].split('+')
    let jamFix = jam[0]
    return tglFix + ' ' + jamFix
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
      this.getCurrentPeriod();
      this.getUserAttendanceStatus();
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

  onBack(){
    this.navCtrl.back();
  }

}
