import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss'],
})
export class ModalItemComponent implements OnInit {
  item: any;

  quantity: any;
  unit: any;
  observation: any;

  canRemove: boolean = false;

  customOptions = {
    header: 'Unit',
    subHeader: 'Select your unit',
  };

  ngOnInit() {
    this.loadCart();
  }

  constructor(
    private modalCtrl: ModalController,
    private MainService: MainService
  ) {}

  loadCart() {
    const itemCart = this.MainService.cart.filter(
      (c: any) => c.uid == this.item.uid
    )[0];
    if (itemCart) {
      this.canRemove = true;
      this.unit = itemCart.cart_unit;
      this.quantity = itemCart.cart_quantity;
      this.observation = itemCart.cart_observation;
    }
  }

  addToCart() {
    const item = {
      ...this.item,
      cart_unit: this.unit,
      cart_quantity: this.quantity,
      cart_observation: this.observation,
    };
    this.MainService.addCart(item);
    this.close();
  }

  removeToCart() {
    this.MainService.removeCart(this.item);
    this.close();
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
