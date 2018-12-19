import { Injectable } from '@angular/core';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from '../../../node_modules/firebase';
import {fromEvent, Subject} from 'rxjs';
import {Word} from '../models/word.model';
import {Theme} from '../models/theme.model';
import {ThemeService} from './theme.service';


@Injectable({
  providedIn: 'root'
})
export class WordService {

    words: Word[] = [];
    themes: Theme[] = [];
    wordSubject = new Subject<Word[]>();

    loaderSubject = new Subject<boolean>();
    showLoader: boolean = true;
    isOnline: boolean = navigator.onLine;


    constructor(private srvTheme: ThemeService) {
        // On place un observer sur l'evenement ONLINE du navigateur
        const online = fromEvent(window, 'online');
        online.subscribe(
          () => { this.isOnline = true; console.log('Online :' + this.isOnline); },
          (error) => {console.log('Erreur bordel :' + error); },
          () => {console.log('Ok terminé'); }
        );

        // On place un observer sur l'evenement OFFLINE du navigateur
        const offline = fromEvent(window, 'offline');
        offline.subscribe(
          () => { this.isOnline = false; console.log('Online :' + this.isOnline); },
          (error) => {console.log('Erreur bordel :' + error); },
          () => {console.log('Ok terminé'); }
        );

        this.getWordsFromFirebase();
  }

  emitWords() {
    this.wordSubject.next(this.words);
  }

  emitShowLoader() {
      this.loaderSubject.next(this.showLoader);
  }

  getWordsFromFirebase() {
      firebase.database().ref('/words')
          .on('value', (data: DataSnapshot) => {
                  this.words = data.val() ? data.val() : [];
                  this.showLoader = false;
                  this.emitShowLoader();
                  this.emitWords();
              }
          );

      if (this.isOnline === false) {
          this.showLoader = false;
          this.emitShowLoader();
          this.emitWords();
      }
  }

  getWords() {
    return this.words;
  }

  getWordByIndex(id: number) {
    return this.words[id];
  }

    getSingleWordFromFirebase(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/words/' + id).once('value').then(
                    (data: DataSnapshot) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

}
