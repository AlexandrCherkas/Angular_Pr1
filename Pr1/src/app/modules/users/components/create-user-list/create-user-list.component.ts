import {trigger,  state,  style,  animate,  transition} from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidateEmail } from 'src/app/modules/shared/validators/checkDomenEmail';

import { UserserviceService } from '../../services/userservice.service';
import { UsernameValidator } from '../../validators/isRepeatEmail';

@Component({
  selector: 'app-create-user-list',
  templateUrl: './create-user-list.component.html',
  styleUrls: ['./create-user-list.component.scss']

})
export class CreateUserListComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() isValid: boolean

  public createID(): number{
    return Math.floor(Math.random() * 1000000);
  }

  constructor(private fb: FormBuilder, private userService: UserserviceService) {  }

   formFields = this.fb.group({
    id: this.createID(),
    name: ['',Validators.required],
    secondName: ['',Validators.required],
    email:['', [Validators.required, Validators.email, ValidateEmail(/^.+@gmail.com$/)], [UsernameValidator.createValidator(this.userService)] ],
    company: ['',[Validators.required, Validators.maxLength(35)]],
    departament: ['',[Validators.required, Validators.minLength(6)]],
    age: ['', [Validators.required, Validators.min(15),Validators.max(100)]],
    gender: ['',Validators.required],
    imageUrl: 'http://s1.iconbird.com/ico/2013/6/382/w256h2561372594116ManRed2.png'
  })

  childFormGroup: FormGroup = this.formFields

  ngOnInit(): void {
    this.formGroup.addControl('user', this.childFormGroup)
  }
  log(){
    console.log(this.childFormGroup)
  }

}
