import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleEvery, ScheduleOptions, } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  //usar esta funcion en el nuevo formulario de medicamentos
  async schedulePrescription(MedName: string, MedInterval: number, MedComment: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: MedName + "cada" + MedInterval + "horas",
          body: MedComment,
          schedule: { on: { hour: MedInterval}, repeats: true},
        }]
    });
  }

  async scheduleTest(MedName: string, MedInterval: number, MedComment: string) {
    let options: ScheduleOptions ={
      notifications: [
        {
          id: 1,
          title: MedName,
          body: MedComment,
          summaryText: "Pls work",
          schedule: { on: { hour: MedInterval}, repeats: true, allowWhileIdle: true,},
        }]
    }

    try {
      await LocalNotifications.schedule(options);
    }catch
    {
      console.log("error")
    }


    // await LocalNotifications.schedule({
    //   notifications: [
    //     {
    //       id: 1,
    //       title: MedName,
    //       body: MedComment
          
    //     }]
    // }).then(() => {
    //   console.log("Notification set");
    // });
  }
}