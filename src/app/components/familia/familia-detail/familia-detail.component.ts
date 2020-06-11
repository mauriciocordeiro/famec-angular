import { Component, OnInit } from '@angular/core';
import { Familia } from 'src/app/model/familia';
import { UserRole } from 'src/app/enum/user-role.enum';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { FamiliaService } from 'src/app/services/familia.service';

@Component({
  selector: 'app-familia-detail',
  templateUrl: './familia-detail.component.html',
  styleUrls: ['./familia-detail.component.css']
})
export class FamiliaDetailComponent implements OnInit {

  familia:Familia;

  isAdmin = false;
  userRole = [
    { key: "USER", value: UserRole.USER },
    { key: "ADMIN", value: UserRole.ADMIN }
  ];

  formGroup:FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private familiaService: FamiliaService,
    private snackBar: SnackBarService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadFamilia();
  }

  loadFamilia() {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.familiaService.get(params.get('id'))
        .subscribe(
          familia => {
            this.familia = familia;
            this.formGroup = this.buildFormGroup(this.familia);

            console.log(familia)
          },
          err => {
            let error = err.error;
            this.snackBar.error(error.message, error.status);
          }
        );
      }
    });
  }

  buildFormGroup(familia: Familia): FormGroup {
    return new FormGroup({});
  }

}
