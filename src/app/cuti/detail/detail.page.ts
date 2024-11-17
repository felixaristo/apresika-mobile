import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/api/general.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {


  @ViewChild('image1') searchElementRef!: ElementRef;
  @ViewChild('keywordsInput') keywordsInput: any;

  public userLeavesDetail: any = "";
  constructor(
    private storage: Storage,
    private service: GeneralService,
    private actRoute: ActivatedRoute,
    private navCtrl: NavController, public desiredElement: ElementRef,
    private loadingCtrl:LoadingController
  ) { }

  ionViewDidEnter(){
    console.log(this.actRoute.snapshot.params['id']);
    this.getUserLeavesDetail(this.actRoute.snapshot.params['id']);
  }

  ngOnInit() {
    
  }
  
  parseTanggal(date:string){
    let tgl = date.split('T')
    let temptgl = tgl[0].split('-')
    let tglFix = `${temptgl[2]}-${temptgl[1]}-${temptgl[0]}`
    
    let jam = tgl[1].split('+')
    let jamFix = jam[0].split('.')[0]
    return tglFix + ' ' + jamFix
  }

  async getUserLeavesDetail(id: any){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait ...',
    });

    loading.present();
    let profile = await this.storage.get('profile')
    profile = JSON.parse(profile)

    let resp = await this.service.userLeavesDetail(id);

    resp.subscribe((res: any) => {
      loading.dismiss();
      console.log(res);
      this.userLeavesDetail = res.data
      this.userLeavesDetail.request_date = this.parseTanggal(this.userLeavesDetail.request_date);
      if(this.userLeavesDetail.approved_date){
        this.userLeavesDetail.approved_date = this.parseTanggal(this.userLeavesDetail.approved_date);
      }
    })
  }

  async cancelLeaves(){
    let resp = await this.service.userLeavesCancel(this.actRoute.snapshot.params['id']);

    resp.subscribe((res: any) => {
      console.log(res);
      
    })
  }

  public alertButtons = [
    {
      text: 'Tidak',
      role: 'cancel',
      handler: () => {
        // console.log('Alert canceled');
      },
    },
    {
      text: 'Ya',
      role: 'confirm',
      handler: () => {
        this.cancelLeaves()
        this.navCtrl.navigateBack('/cuti')
        // console.log('Alert confirmed');
      },
    },
  ];


  onBack(){
    this.navCtrl.back();
  }
}
