import { Component, inject } from '@angular/core';
import { Database, getDatabase, ref } from '@angular/fire/database';
import { get } from 'firebase/database';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private database: Database = inject(Database)
  constructor() { }
  public db = getDatabase()
  public reference = ref(this.db, 'Peso/peso' )
  public weight = 0;
  readWeight() {
    get(this.reference).then((snapshot) => {
      console.log(this.reference)
      const value = snapshot.val()
      console.log(value)
      this.weight = value;
    }
    )

  }

}

