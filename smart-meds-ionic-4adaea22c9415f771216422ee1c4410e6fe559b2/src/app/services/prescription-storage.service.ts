import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Firestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, getFirestore, setDoc, doc } from '@angular/fire/firestore';
import { update } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionStorageService {

  constructor(private firestore: Firestore) { }



  async addPrescription(selectedHour: any, startDate: any, endDate: any, UserID: any, MedID: any) {
    const dbref = collection(this.firestore, 'Prescripciones');
    return addDoc(dbref, { interval: selectedHour, start: startDate, end: endDate, UserID: UserID, MedID: MedID });
  }

  async addMeds(name: any, dosis: any, medida: any, presen: any) {
    const dbref = collection(this.firestore, 'Medicaciones');
    return addDoc(dbref, {
      name: name,
      dosis: dosis,
      medida: medida,
      presen: presen
    });

  }

  async addMedDetails(peso: any, repisa: any, contra: any, comentario: any, MedID: any) {
    const dbref =  doc(this.firestore, 'Medicaciones', MedID);
   
    return updateDoc(dbref, { Detalles: { peso: peso, repisa: repisa, contra: contra, comentario: comentario, MedID: MedID } });
  }

  async getMeds(UserID: string) {
    const dbref = collection(this.firestore, 'Medicaciones');
    const q = query(dbref, where('UserID', '==', UserID));
    const querySnapshot = await getDocs(q);
    const meds = querySnapshot.docs.map(doc => doc.data());
    return meds;
  }

  async getPrescriptions(UserID: string) {
    const dbref = collection(this.firestore, 'Prescripciones');
    const q = query(dbref, where('UserID', '==', UserID));
    const querySnapshot = await getDocs(q);
    const prescriptions = querySnapshot.docs.map(doc => doc.data());
    return prescriptions;
  }

  async getMedDetails(MedID: string) {
    const dbref = collection(this.firestore, 'Medicaciones');
    const q = query(dbref, where('MedID', '==', MedID));
    const querySnapshot = await getDocs(q);
    const medDetails = querySnapshot.docs.map(doc => doc.data());
    return medDetails;
  }


}
