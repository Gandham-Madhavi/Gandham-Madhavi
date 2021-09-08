import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateUserService } from './../create-user.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  constructor(
    private readonly userSer: CreateUserService
  ) { }

  @Input() listOfCards;
  @Input() updateDetails;
  isCardClicked = true;
  isUpdated = false;
  @Output() isCardEmitted = new EventEmitter();

  ngOnInit() {
    this.userDetails();
    this.isUpdated = this.updateDetails;
  }

  userDetails() {
    this.userSer.getUserDetails().subscribe((res) => {
      if (res) {
        res.forEach((ele, i) => {
          ele.id = !ele.hasOwnProperty('id') ? i : ele.id;
          this.listOfCards.push(ele);
        });
      }
    });
    this.listOfCards.reverse();
  }
  deleteIcon(form) {
    console.log('delete', form);
    const found = this.listOfCards.findIndex(item => item.id === form.id);
    this.listOfCards.splice(found, 1);
    this.userSer.deleteUserDetails(found).subscribe(res => {
      console.log('delete', res);
    },
      error => {
        console.log(error);
      });
  }

  onCardClick(form) {
    this.isCardClicked = false;
    const emitVal = {
      isCardClicked: false,
      selectedCardData: form
    };
    this.isCardEmitted.emit(emitVal);
  }
}
