import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { UserService } from 'src/shared/services/user/user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

    users: User[];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getUsers().subscribe(
            res => this.users = res,
            err => console.error(err)
        );
    }

}
