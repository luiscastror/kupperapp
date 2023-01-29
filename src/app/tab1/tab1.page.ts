import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  items: any[] = [];
  collection: string = 'items';

  constructor(public MainService: MainService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.items = [];
    this.MainService.get_collection(this.collection).subscribe((resp) => {
      resp.forEach((doc: any) => {
        this.items.push({ ...doc.data(), uid: doc.id });
      });
      console.log(this.items);
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
}
