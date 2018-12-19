import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {Theme} from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themes: Theme[] = [];

  constructor() {
    this.getThemesFromFirebase();
  }

  getThemesFromFirebase() {
    firebase.database().ref('/themes')
        .on('value', (data: DataSnapshot) => {
              this.themes = data.val() ? data.val() : [];
            }
        );
  }

  getThemes() {
    return this.themes;
  }

  getThemeByIndex(i: number) {
    return this.themes[i];
  }

}
