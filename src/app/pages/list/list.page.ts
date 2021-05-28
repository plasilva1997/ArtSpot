import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {ListService} from '../../services/list.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  private art: Object;

  constructor(public listService: ListService){}

  ngOnInit(){
    this.load();
  }

  load(){
    this.listService.getAll().subscribe( arts => {
      this.art = arts;
    });
  }
}
