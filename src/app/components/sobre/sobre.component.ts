import { Component, OnInit } from '@angular/core';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openSite(about) {
    if(about == 'famec')
      window.open('http://www.famec.org.br/', '_blank');
    else if(about == 'dev')
      window.open('https://github.com/mauriciocordeiro/famec-angular', '_blank');
    else if(about == 'issue')
      window.open('https://github.com/mauriciocordeiro/famec-angular/issues/new', '_blank');
  }

}
