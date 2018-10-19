import { Component, Input } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {
    
    @Input()
    user: User = new User();

}
