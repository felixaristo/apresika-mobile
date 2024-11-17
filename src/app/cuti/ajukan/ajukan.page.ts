import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GeneralService } from 'src/app/api/general.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-ajukan',
  templateUrl: './ajukan.page.html',
  styleUrls: ['./ajukan.page.scss'],
})
export class AjukanPage implements OnInit {

  public userLeavesType: any = [];
  public selectedLeaveType: any = 0;
  public description: any = '';
  public startDate: any = '';
  public endDate: any = '';

  constructor(
    private storage: Storage,
    private service: GeneralService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getUserLeavesType();
  }

  async getUserLeavesType(){
    let resp = await this.service.userLeavesType();

    resp.subscribe((res: any) => {
      console.log(res);
      this.userLeavesType = res.data
    })
  }

  onBack(){
    this.navCtrl.back();
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  async submitLeave(){
    let profile = await this.storage.get('profile')
    profile = JSON.parse(profile)
    console.log(this.selectedLeaveType);
    console.log(this.reformatingDate(this.startDate));
    console.log(this.reformatingDate(this.endDate));
    console.log(this.description);
    let resp = await this.service.userLeavesCreate({
      "employee_id": profile.employee_id,
      "start_date":this.reformatingDate(this.startDate),
      "end_date":this.reformatingDate(this.endDate),
      "leave_type_id": this.selectedLeaveType, 
      "description":this.description,
      "attachment":""
    })
    
    resp.subscribe((res: any) => {
      console.log(res);
      if(res.success){
        this.toastCall('Success Create Leaves');

        this.navCtrl.navigateForward('/cuti');
      }else{
        this.toastCall('Failed Create Leaves');
      }
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

  reformatingDate(date: any): string{
    let data = date.split('-')
    let day = data[2]
    let month = data[1]
    let year = data[0]
    return `${day}-${month}-${year}`;
  }
}
