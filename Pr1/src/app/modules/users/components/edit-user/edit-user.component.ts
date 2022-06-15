import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IUser } from '../../interface/user';
import { UserdataService } from '../../services/userdata.service';
import { FormArray, FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { DialogLeavePageComponent } from 'src/app/modules/shared/components/dialog-leave-page/dialog-leave-page.component';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],

})
export class EditUserComponent implements OnInit  {

  @ViewChild("editUserForm")

  private _editUserForm: NgForm;
  parentFormGroup: FormGroup = new FormGroup({});
  formGroup: FormGroup
  id: any;
  user$: Observable <IUser>;


  constructor(
    private _route: ActivatedRoute,
    private _userdataService: UserdataService,
    private _router: Router) {  }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id')
    this.user$ = this._userdataService.getUserByID(this.id)
  }

  onChengeUser(key: string, Form: FormArray | FormGroup): void{
    this.parentFormGroup.addControl(key, Form)
  }

  hasUnsavedData(): boolean {
    return this._editUserForm.dirty;
  }

  editUser(): void{
    console.log(this.parentFormGroup)
    this.parentFormGroup.markAllAsTouched();

    if (this.parentFormGroup.status == 'VALID') {
      this._userdataService.changeUser(this.parentFormGroup.value.user, this.parentFormGroup.getRawValue().address);
      this._router.navigate(['/users']);
    }
  }
}
