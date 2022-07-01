import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { IAuthUser } from 'src/app/modules/authorization/interfaces/IAuthUser';
import { AuthorizationService } from 'src/app/modules/authorization/services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{

  public logo: string = '../assets/images/apple-touch-icon.png';
  public user: string;
  public photo: string;

  private componentActive = true;

  constructor(
    private authorizationService: AuthorizationService,
    ) {}

  ngOnInit(): void {
    this.authorizationService
      .getCurrentUser()
      .pipe(takeWhile( () => this.componentActive))
      .subscribe((data) => {
        (this.user = data.username), (this.photo = '../assets/images/user.png');
      });
  }

  logOut(): void {
    this.authorizationService.signOut({username: '', pass: ''})
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
