import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GlouTon';

  constructor() {
     const config = {
        apiKey: "AIzaSyCiIfagw2n71jGY6gx9jU9hM944-UtdjvE",
        authDomain: "cdadt-glossaire.firebaseapp.com",
        databaseURL: "https://cdadt-glossaire.firebaseio.com",
        projectId: "cdadt-glossaire",
        storageBucket: "",
        messagingSenderId: "132092844401"
    };
    firebase.initializeApp(config);
  }
}
