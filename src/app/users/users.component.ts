import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnDestroy {
  users = [];
  currentPage = 1;
  totalPage = 2;
  subscription: Subscription;
  constructor(private usersService: UsersService) {
    this.subscription = usersService.getUsers().subscribe((x: any) => {
      {
        this.totalPage = x['total_pages'];

        this.users = x['data'];
      }
    });
  }
  changePage(num: number) {
    let nextPage = num + this.currentPage;
    if (nextPage == 3 || nextPage == 0) return;

    this.currentPage = nextPage;
    this.subscription.unsubscribe();
    this.subscription = this.usersService
      .getUsers(this.currentPage)
      .subscribe((x: any) => {
        this.users = x['data'];
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
