import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUserService } from './create-user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  showForms = false;
  selectedCardDetails: any;
  listOfForms = [];
  allFieldsFilled = true;
  headerTxt = 'Create User!';
  updateDone = true;
  btnTxt = 'Submit';
  constructor(private fb: FormBuilder, private userService: CreateUserService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
    });

    this.userForm.valueChanges.subscribe(ele => {
      if (ele.email && ele.name && ele.phone) {
        this.allFieldsFilled = false;
      } else {
        this.allFieldsFilled = true;
      }
    });
  }

  onSubmit(form) {
    this.showForms = true;
    if (this.btnTxt !== 'Update') {
      this.userService.userForm(this.userForm.value).subscribe(res => {
        this.listOfForms.push(res);
      }, error => {
        console.log(error);
      });
    } else {
      const payload = Object.assign(this.userForm.value);
      const cardId = this.selectedCardDetails.id;
      this.userService.updateUserDetails(this.selectedCardDetails.id, this.userForm.value).subscribe(res => {
        this.listOfForms[this.selectedCardDetails.id] = res;
      }, error => {
        this.headerTxt = 'Create User';
        this.btnTxt = 'Submit';
        const foundMatch = this.listOfForms.findIndex(item => item.id === cardId);
        if (foundMatch !== -1) {
          this.listOfForms[foundMatch] = payload;
          this.updateDone = true;
        }
      });
    }
    this.allFieldsFilled = true;
    this.userForm.reset();
    this.listOfForms.reverse();
  }

  onCardEmit(event) {
    if (!event.isCardClicked) {
      this.headerTxt = 'Edit User';
      this.btnTxt = 'Update';
      this.userForm.get('email').setValue(event.selectedCardData.email);
      this.userForm.get('name').setValue(event.selectedCardData.name);
      this.userForm.get('phone').setValue(event.selectedCardData.phone);
      this.userForm.get('website').setValue(event.selectedCardData.website);
      this.selectedCardDetails = event.selectedCardData;
    }
  }
}
