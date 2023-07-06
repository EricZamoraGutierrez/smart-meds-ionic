import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {

  constructor() { }

  async checkLogin(){
    const email = await Preferences.get({ key: 'loginEmail' });
    const password = await Preferences.get({ key: 'loginPassword' });
    if (email.value && password.value){
      return email.value, password.value;
    }else{
      return false;
    }
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
