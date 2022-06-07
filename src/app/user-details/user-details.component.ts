import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  userDetails = {};
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
    let id = this.route.snapshot.params['id'];
    this.usersService.userDetail(id).subscribe((x: any) => {
      this.userDetails = x['userData$']['data'];
      Object.assign(this.userDetails, x['userResource$']['data']);
      console.log(this.userDetails);
    });
  }
}
