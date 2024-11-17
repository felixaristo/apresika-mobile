import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GeneralService } from '../api/general.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-slipgaji',
  templateUrl: './slipgaji.page.html',
  styleUrls: ['./slipgaji.page.scss'],
})
export class SlipgajiPage implements OnInit {
  public selectPeriod: any = ""
  public payslipList: any = [];
  public payslipDetail: any = [];
  public profile: any = {};
  constructor(
    private storage: Storage,
    private service: GeneralService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getCurrentPeriod();
  }

  onBack(){
    this.navCtrl.back();
  }

  detailPayslip(id: any, periode: any){
    console.log(id);
    this.navCtrl.navigateForward("/slipgaji-detail/" + id + "/" + periode)
  }

  getCurrentPeriod(){
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.selectPeriod = this.convert(firstDay.toString()).split('-')[1]

    this.getData(this.convert(firstDay.toString()), this.convert(lastDay.toString()))
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
    this.getData(this.convert(firstDay.toString()), this.convert(lastDay.toString()))
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

  async getData(startDate: string, endDate: string){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait ...',
    });

    loading.present();
    let profile = await this.storage.get('profile')
    profile = JSON.parse(profile)
    this.profile = profile;
    console.log(this.profile);
    
    let resp = await this.service.payslipList({
      "employee_id": profile.employee_id,
      "periode": new Date().getFullYear()
    });

    resp.subscribe((res: any) => {
      loading.dismiss();
      console.log(res);
      this.payslipList = res.data
      this.payslipList.forEach((element: any) => {
        element.amount = this.formatRupiah(element.amount).replace(',00', '');
      }); 
      // this.userLeavesList = res.data.detail_leaves
      // this.remainingLeaves = res.data.remaining_leaves
    })

    // await this.getPayslipDetail();
  }

  // async getPayslipDetail(){
  //   let resp = await this.service.payslipDetail();

  //   resp.subscribe((res: any) => {
  //     console.log(res);
  //     this.payslipDetail = res.data;
  //     this.payslipDetail.detail.forEach((element: any) => {
  //       element.amount_fix = this.formatRupiah(element.amount_fix).replace(',00', '');
  //     }); 
  //     this.payslipDetail.paid_amount = this.formatRupiah(this.payslipDetail.paid_amount).replace(',00', '');
  //   })
  // }

  formatRupiah(val: any){
    const currency = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    })
    
    return currency.format(val);
  }
}
