import { Component, OnInit } from '@angular/core';
import { FamiliaService } from 'src/app/services/familia.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { Familia } from 'src/app/model/familia';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {

  familias: Familia[];

  constructor(private familiaService: FamiliaService, private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.familiaService.getAll().subscribe(
      familias => {
        this.familias = familias;
      },
      err => {
        this.snackBar.error(err.error.message);
      }
    )
  }

}
