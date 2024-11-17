import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GeneralService } from '../api/general.service';
import { LoadingController } from '@ionic/angular';
import { CheckboxCustomEvent } from '@ionic/angular';
@Component({
  selector: 'app-cuti',
  templateUrl: './cuti.page.html',
  styleUrls: ['./cuti.page.scss'],
})
export class CutiPage implements OnInit {
  public userLeavesList:any = [];
  public userRemainingDetailList: any = [];
  public selectPeriod: any = ""
  public remainingLeaves: any = 0;
  public isModalOpen = false;

  presentingElement = null;
  constructor(
    private storage: Storage,
    private service: GeneralService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ionViewDidEnter(){
    this.getCurrentPeriod();
    this.getUserLeavesRemaining();
  }

  ngOnInit() {
  }

  onTermsChanged(event: Event) {
    const ev = event as CheckboxCustomEvent;
    // this.canDismiss = ev.detail.checked;
  }

  closeModal(){
    this.isModalOpen=false;
  }

  async getDetailRemainingLeaves(){
    this.isModalOpen= true;
    const loading = await this.loadingCtrl.create({
      message: 'Please wait ...',
    });

    loading.present();
    let profile = await this.storage.get('profile')
    profile = JSON.parse(profile)
    // try{
      let resp = await this.service.leavesRemainingDetail({
        "employee_id": profile.employee_id,
        "periode":new Date().getFullYear()
      });

      resp.subscribe((res: any) => {
        loading.dismiss();
        console.log(res);
        this.userRemainingDetailList = res.data.allocation_leaves
        // this.remainingLeaves = res.data.remaining_leaves
      })
    // }catch(e){
    //   loading.dismiss();
    // }
  }
  

  getCurrentPeriod(){
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.selectPeriod = this.convert(firstDay.toString()).split('-')[1]

    this.getUserLeavesList(this.convert(firstDay.toString()), this.convert(lastDay.toString()))
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
    this.getUserLeavesList(this.convert(firstDay.toString()), this.convert(lastDay.toString()))
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

  async getUserLeavesList(startDate: string, endDate: string){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait ...',
    });

    loading.present();
    let profile = await this.storage.get('profile')
    profile = JSON.parse(profile)

    let resp = await this.service.userLeavesList({
      "employee_id": profile.employee_id,
      "start_date":startDate,
      "end_date":endDate
    });

    resp.subscribe((res: any) => {
      loading.dismiss();
      console.log(res);
      this.userLeavesList = res.data.detail_leaves
      // this.remainingLeaves = res.data.remaining_leaves
    })
  }

  async getUserLeavesRemaining(){
    let profile = await this.storage.get('profile')
    profile = JSON.parse(profile)

    let resp = await this.service.leavesRemaining({
      "employee_id": profile.employee_id
    });

    resp.subscribe((res: any) => {
      this.remainingLeaves = res.data.remaining_leaves
    })
  }

  goToDetail(id: any){
    this.navCtrl.navigateForward("/cuti-detail/" + id)
  }

  onBack(){
    this.navCtrl.back();
  }

}
