import { Component, OnInit, Input } from '@angular/core';
import { Familia } from 'src/app/model/familia';

@Component({
  selector: 'app-familia-item',
  templateUrl: './familia-item.component.html',
  styleUrls: ['./familia-item.component.css']
})
export class FamiliaItemComponent implements OnInit {

  @Input() familia: Familia;

  constructor() { }

  ngOnInit(): void {
  }

}
