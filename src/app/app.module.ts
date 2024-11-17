import { NgModule } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Router } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';

import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { App as CapacitorApp } from '@capacitor/app';

import { AlertController } from '@ionic/angular';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } ,
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        // console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        // console.log('Alert confirmed');
        CapacitorApp.exitApp();
      },
    },
  ];
  constructor(
    private platform: Platform, 
    private navCtrl: NavController, 
    private router: Router, 
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      
  //   if(someCondition) { // if not login
  //     this.router.navigateByUrl('/');
  //  /*
  //  this will also work
  //  this.navCtrl.goRoot('/');
  // */
  //   } else { // if login
     this.router.navigateByUrl('/login');
  //  /* this will also work
    // this.navCtrl.goRoot('/app');
  //  */
  //   }
  
  
  CapacitorApp.addListener('backButton', ({canGoBack}) => {
    // console.log(window.location.pathname);
    if(window.location.pathname == '/tabs/tab1'){
      console.log('keluar');
      this.presentAlert('Apakah Anda yakin untuk keluar App?')
      // CapacitorApp.exitApp();
    } 
    // else {
    //   console.log('back');
      
    //   window.history.back();
    // }
  });
    });
  }

  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  async ngOnInit() {
    // await this.storage.defineDriver(IonicSecureStorageDriver);
    await this.storage.create();
  }
}
