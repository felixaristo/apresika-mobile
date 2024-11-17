import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GeneralService } from '../../api/general.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// import FileSaver from 'file-saver';
import { Browser } from '@capacitor/browser';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
declare var window: { PreviewAnyFile: { previewBase64: (arg0: (win: any) => void, arg1: (error: any) => void, arg2: string) => void; }; };
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public selectPeriod: any = ""
  public payslipList: any = {};
  public payslipDetail: any = [];
  public profile: any = {};
  public periode: any = ''
  public id_payslip: any = 0
  // private opener: FileOpener
  // private file: File
  constructor(
    private storage: Storage,
    private service: GeneralService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
      console.log(this.actRoute.snapshot.params['periode']);
    this.periode = this.actRoute.snapshot.params['periode']
    this.id_payslip = this.actRoute.snapshot.params['id']
    // this.getCurrentPeriod();
    this.getData(this.id_payslip)
  }

  onBack(){
    this.navCtrl.back();
  }

  async openFile(base64: any) {
    const { uri } = await Filesystem.writeFile({
      path: 'image.pdf',
      data: base64,
      directory: Directory.Documents,
    });
    await FileOpener.openFile({
      path: uri,
    });
    // await FileOpener.openFile({
    //   path: 'https://onegml.com/assets/web/buletin/0324_Bulletin_Knowcap_Insight_Maret_FINAL.pdf',
    // });
  };

  async downloadSlipGaji(id_payslip: any){
    // this.openFile()
    // console.log(id_payslip);
    const loading = await this.loadingCtrl.create({
      message: 'Please wait ...',
    });

    loading.present();

    let resp = await this.service.downloadPayslip(id_payslip);

    resp.subscribe((res: any) => {
      loading.dismiss();
      let base64 = res.data.pdf_content.substring(2, (res.data.pdf_content.length - 1));
      console.log(base64);
      var blob = new Blob([base64], {type: "application/pdf"});
      console.log(blob);
      let test = this.base64toBlob(base64, 'application/pdf');
      console.log(test);
      
      // Browser.open({ url: URL.createObjectURL(test) }).then(() => {
      //   console.log("PDF OK");
      // }).catch(err => {
      //     console.log(err);
      // })

      window.PreviewAnyFile.previewBase64(
        win => console.log("open status",win),
        error => console.error("open failed", error),
        'data:application/pdf;base64,' + base64
    );
      // console.log();
      // let base64 = ''
      // this.blobToBase64(blob).then((data: any) => {
      //   console.log(data);
        
      // })
      // const base64Response = fetch(`data:image/jpeg;base64,${base64Data}`);
      // console.log(base64);
      // this.openFile(base64);
      // FileSaver.saveAs(blob, "filename");
      // this.payslipDetail = res.data;
      // this.payslipDetail.detail.forEach((element: any) => {
      //   element.amount_fix = this.formatRupiah(element.amount_fix).replace(',00', '');
      // }); 
      // this.payslipDetail.paid_amount = this.formatRupiah(this.payslipDetail.paid_amount).replace(',00', '');
    })
    // await Browser.open({ url: 'https://onegml.com/assets/web/buletin/0324_Bulletin_Knowcap_Insight_Maret_FINAL.pdf' });
  }

  // b64toBlob(base64: any, type = 'application/octet-stream'){ 
  //   fetch(`data:${type};base64,${base64}`).then(res => res.blob()).
  // }

  base64toBlob(base64Data: any, contentType: any) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

  blobToBase64(blob: any) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  getCurrentPeriod(){
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.selectPeriod = this.convert(firstDay.toString()).split('-')[1]

    // this.getData(this.convert(firstDay.toString()), this.convert(lastDay.toString()))
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
    // this.getData(this.convert(firstDay.toString()), this.convert(lastDay.toString()))
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

  async getData(id: any){
    
    let profile = await this.storage.get('profile')
    profile = JSON.parse(profile)
    this.profile = profile;
    console.log(this.profile);

    await this.getPayslipDetail(id);
  }

  async getPayslipDetail(id_payslip: any){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait ...',
    });

    loading.present();

    let resp = await this.service.payslipDetail(id_payslip);

    resp.subscribe((res: any) => {
      loading.dismiss();
      console.log(res);
      this.payslipDetail = res.data;
      this.payslipDetail.detail.forEach((element: any) => {
        element.amount_fix = this.formatRupiah(element.amount_fix).replace(',00', '');
      }); 
      this.payslipDetail.paid_amount = this.formatRupiah(this.payslipDetail.paid_amount).replace(',00', '');
    })
  }

  formatRupiah(val: any){
    const currency = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    })
    
    return currency.format(val);
  }
}