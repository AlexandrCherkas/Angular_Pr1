import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of, Subject } from 'rxjs';
import { IUser } from 'src/app/modules/users/interface/user';
import { IAddress } from '../interface/address';
import { IRemoteUser } from '../interface/remote_users';
import { HttpServiceService } from '../../shared/services/http-service.service';
import { ApiServiceService } from '../../shared/services/api-service.service';
import { getNsPrefix } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  public usersEmails: Array<string> = [];
  private users = [];

  constructor(private apiService: ApiServiceService) {}

  public getUsers(page: number, results: number, params?: any): Observable<any> {
    const path = `?page=${page}&results=${results}&seed=abc`;
    return this.apiService.getUsers(path).pipe(
      map((usersDTOs: IRemoteUser[]) => {
        return usersDTOs.map((user: IRemoteUser) =>
          this.mapUserDTOtoUser(user)
        );
      })
    );
  }

  public exportUserToExcel(dataUser): Observable<string> {
    console.log('Server loading::::: ' + dataUser);
    return of(dataUser)
      .pipe(
        delay(this.createDelay()));
  }

  public saveUser(dataUser): Observable<string> {
    console.log('Server loading::::: ' + dataUser);
    return of(dataUser)
      .pipe(
        delay(this.createDelay()));
  }

  public searchUsersByName(page: number, results: number, filter: any, defaultResults: number): Observable<any> {
    const path = `?page=${page}&results=${results}&seed=abc`;
    const defaultPath = `?page=${page}&results=${defaultResults}&seed=abc`;
    const params = { filter: filter, defaultPath: defaultPath };

    return this.apiService.searchUsersByName(path, params).pipe(
      map((usersDTOs: IRemoteUser[]) => {
        return usersDTOs.map((user: IRemoteUser) =>
          this.mapUserDTOtoUser(user)
        );
      })
    );
  }

  public getUserByID(id: string): Observable<any> {
    const params = { userId: id };
    const path = `?page=0&results=96&seed=abc`;
    return this.apiService.getUserByID(path, params).pipe(
      map((userDTO: IRemoteUser[]) => {
        const user = userDTO.map((user: IRemoteUser) =>
          this.mapUserDTOtoUser(user)
        );
        return user[0];
      })
    );
  }

  public getUsersEmail(): Observable<string[]> {
    this.usersEmails = this.users.map((user) => user.email);
    return of(this.usersEmails).pipe(delay(1000));
  }

  public createDelay(): number {
    const min = 1000;
    const max = 6000;
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  private mapUserDTOtoUser(userDTO: IRemoteUser): IUser {
    return {
      id: userDTO.login.uuid,
      title: userDTO.name.title,
      name: userDTO.name.first,
      secondName: userDTO.name.last,
      age: userDTO.dob.age,
      gender: this.whatGender(userDTO.gender),
      departament: userDTO.phone,
      company: userDTO.nat,
      email: userDTO.email,
      picture: userDTO.picture.large,
      address: [
        {
          addressLine: userDTO.location.country,
          city: userDTO.location.city,
          zip: userDTO.location.postcode,
        },
      ],
    };
  }

  public whatGender(genderName): boolean {
    return genderName == 'male' ? true : false;
  }

  public changeUser(user: IUser, userAddAddress: Array<IAddress>): void {
    // let modifiedUser: IUser = {
    //   id: user.id,
    //   name: user.name,
    //   secondName: user.secondName,
    //   email: user.email,
    //   age: user.age,
    //   gender: user.gender,
    //   departament: user.departament,
    //   company: user.company,
    //   picture: user.picture,
    //   address: userAddAddress,
    // };
    // this.users = this.users.map((user) => user.id === modifiedUser.id ? modifiedUser : user
    // );
  }

  public createNewUser(user: IUser, userAddAddress: Array<IAddress>): void {
    //   let newUserWithAddress: IUsersWithAddress = {
    //     id: user.id,
    //     name: user.name,
    //     secondName: user.secondName,
    //     email: user.email,
    //     age: user.age,
    //     gender: user.gender,
    //     departament: user.departament,
    //     company: user.company,
    //     imageUrl: user.imageUrl,
    //     address: userAddAddress,
    //   };
    //   this.users.push(newUserWithAddress);
  }
}
