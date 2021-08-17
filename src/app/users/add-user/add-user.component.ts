import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, 
    private userService: UserService, private _snackbar: MatSnackBar ) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      'username': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', [Validators.required, Validators.maxLength(10)])
    })
  }

  createUser() {
    this.userService.addUser(this.addUserForm.value).subscribe(data => {
      this._snackbar.open("User Created Successfully");
    }, err => {
      this._snackbar.open("Unable to create User");
    })
  }

}
