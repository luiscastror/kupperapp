import { Component } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(public MainService: MainService) {}
}
