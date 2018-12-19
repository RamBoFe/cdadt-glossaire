import {Component, OnDestroy, OnInit} from '@angular/core';
import {Word} from "../../models/word.model";
import {WordService} from "../../services/word.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-word',
  templateUrl: './list-word.component.html',
  styleUrls: ['./list-word.component.scss']
})
export class ListWordComponent implements OnInit, OnDestroy {

  public mots  = ["Anonymisation","ANSSI","API","Big data","CdCF","Chiffrement","CNIL","Coworking","Datafari","DCP","Deep learning","Design thinking","Devops","DevSecOps","DGNUM","Disruptif","Docker","DPD (DPO)","EBIOS","FABNUM","FCM","FEROS","Format JSON","Full stack (développeur)","G2912","Hachage (hash fonction)","IA","Idéation","LABNUM","Machine Learning","Micro-services","Open Source","Persona","Pitch","Pseudonymisation","PWA","RGPD (GDPR en anglais)","SI","Tokenisation","UI design","UX design","UX","XML"];
  public lettres = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  public active = 0;
  public words: Word[] = [];
  public showLoader = true;

  private wordsSubscription: Subscription;
  private loaderSubscription: Subscription;

  constructor(private srvWord: WordService) { }

  ngOnInit() {
    this.wordsSubscription = this.srvWord.wordSubject.subscribe(
        (words: Word[])  => {
          this.words = words;
        }
    );

    this.loaderSubscription = this.srvWord.loaderSubject.subscribe(
        (loader: boolean) => {
            this.showLoader = loader;
            // console.log('Post-List => loader :' + this.showLoader);
        }
    );
    this.srvWord.emitWords();
    this.srvWord.emitShowLoader();

  }

  idForScroll(i: number) {
    const lettreIndex = this.words[i].name.substring(0, 1).toLowerCase();
    const lettreIndexLesssOne = i - 1 >= 0 ? this.words[i - 1].name.substring(0, 1).toLowerCase() : null;

    if ((i === 0) || ( lettreIndex !== lettreIndexLesssOne)) {
      return lettreIndex;
    } else {
        return null;
    }
  }

  activeClassLetterMenu(i: number) {
      this.active = i;
  }

  scrollToId(i: number) {
    this.activeClassLetterMenu(i);
    const lettreToScroll = this.lettres[i];
    document.getElementById(lettreToScroll).scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth' });

  }

    ngOnDestroy() {
      this.wordsSubscription.unsubscribe();
      this.loaderSubscription.unsubscribe();
    }


    // json() {
    //   const motsDb: object[] = [];
    //
    //     this.mots.forEach(function(word) {
    //         const objMot: Word = {name: '', theme: '', note: 0, definition: ''};
    //         objMot.name = word;
    //         objMot.definition = word + ' bla bla bla...';
    //         objMot.note = 2.5;
    //         objMot.theme = '';
    //         motsDb.push(objMot);
    //     });
    //
    //   console.log(motsDb);
    //   console.log(JSON.stringify(motsDb));
    // }

}
