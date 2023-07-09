import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userID: any;
  constructor(private auth: Auth, private firestore: Firestore) { }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  addUser({ Apellido, Nombre, Phone, email, id }: any) {
    const dbref = collection(this.firestore, 'Users');
    this.userID = id;
    return addDoc(dbref, { Apellido, Nombre, Phone, email, id });

  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  store(id: any) {
    this.userID = id;
  }
  getUser() {
    return this.userID;
  }
} 
