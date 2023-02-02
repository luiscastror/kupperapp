import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalItemComponent } from '../components/modals/modal-item/modal-item.component';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  items: any[] = [];
  collection: string = 'items';

  constructor(
    public MainService: MainService,
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.get();
  }

  results: any;
  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.items.filter(
      (d) => d.name.toLowerCase().indexOf(query) > -1
    );
  }

  get() {
    this.items = [];
    this.MainService.get_collection(this.collection).subscribe((resp) => {
      resp.forEach((doc: any) => {
        this.items.push({ ...doc.data(), uid: doc.id });
      });
      console.log(this.items);

      this.results = [...this.items];
    });
  }

  addCart(item: any) {
    const pos = this.MainService.cart.findIndex((x: any) => x.uid == item.uid);
    if (pos == -1) {
      this.MainService.cart.push({
        count: 1,
        ...item,
      });
    } else {
      this.MainService.cart[pos].count++;
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Item added correctly',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  async openModal(item: any) {
    const modal = await this.modalCtrl.create({
      component: ModalItemComponent,
      componentProps: {
        item: item,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
}
