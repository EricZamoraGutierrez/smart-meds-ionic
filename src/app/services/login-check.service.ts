import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {

  constructor() { }

  async checkLogin() {
    const email = await Preferences.get({ key: 'loginEmail' });
    const password = await Preferences.get({ key: 'loginPassword' });
    let check: boolean = true;
    let user = {email, password, check};
    if (email.value && password.value) {
      check = true;
      return user;
    } else { }
    check = false;
    return user;
  }

  async setLogin(email: string, password: string){
  await Preferences.set({ key: 'loginEmail', value: email });
  await Preferences.set({ key: 'loginPassword', value: password });
}
  async setLogout(){
  await Preferences.set({ key: 'loginEmail', value: '' });
  await Preferences.set({ key: 'loginPassword', value: '' });
}
}
