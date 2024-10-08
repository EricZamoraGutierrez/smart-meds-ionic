import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, getFirestore } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc } from 'firebase/firestore';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: Auth, private firestore: Firestore) { }

  public UserId = '';

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // async addUser({ Apellido, Nombre, Phone, id }: any) {
  //   const dbref = collection(this.firestore, 'Users');
  //   const PicRoute = "";
  //   this.store(email);
  //   return addDoc(dbref, { Apellido, Nombre, Phone, email, id, PicRoute});

  // }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async store(email: any) {
    const db = collection(this.firestore, 'Users');
    const q = query(db, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.UserId = doc.id;
    });
    await Preferences.set({ key: 'userId', value: this.UserId });
  }

  async getUser() {
    const user = await Preferences.get({ key: 'userId' });
    let data: any = '';
    if (user.value == null) {
      data = user.value;
    } else {
      data = user.value;
    }
    return data;
  }

  async saveProfilePic(file: File) {
    const storage = getStorage();
    const storageRef = ref(storage, "images"+ file.name)

    uploadBytes(storageRef, file).then((snapshot) => {
      
    }, (error) => {
      console.log(error);
    });
  }


  async getProfilePicURL(picUrl:any) {
    const url = await getDownloadURL(ref(getStorage(), picUrl));
   
    return url;
  }

  async updateUserData(Apellido:any, Nombre:any, Phone:any, id:any, docref:any) {
    const db = getFirestore();
    const data = {
      phone: Phone,
      name: Nombre,
      lastname: Apellido,
    };
    updateDoc(docref, data);
  }
} 
