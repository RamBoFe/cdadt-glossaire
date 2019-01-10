import { Component, OnInit } from '@angular/core';
import {WordService} from '../services/word.service';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // private form: string;
  private longSearch = false;
  private valueSearch: string;
  public resultSearch = {'words': [], 'themes': []};

  constructor(private srvWord: WordService,
              private srvTheme: ThemeService) { }

  ngOnInit() {
  }

  showLongSearch(yesNo: boolean) {
    this.longSearch = yesNo;

    const elNavLiSearch  = document.getElementById('app-nav-search');
    const elNavLiSearchInput = document.getElementById('app-nav-input-search');

    if (yesNo) {
      elNavLiSearch.classList.remove('d-none');
      elNavLiSearch.classList.add('w-100');
      elNavLiSearch.style.display = 'list-item';
      elNavLiSearchInput.focus();
    } else {
      elNavLiSearch.classList.add('d-none');
    }
  }

  resetInput(id: string) {
    return (<HTMLInputElement>document.getElementById(id)).value = '';
  }

  search() {
    this.valueSearch = (<HTMLInputElement>document.getElementById('app-nav-input-search')).value;
    this.findOccurences();
  }


  findOccurences() {
    if (this.valueSearch.length > 1) {
      // On cherche dans les définitions
      this.resultSearch.words = this.findOccurencesInDef(this.valueSearch);

      // On cherche dans les themes
      this.resultSearch.themes = this.findOccurrencesInThemes(this.valueSearch);
    }
  }

  findOccurencesInDef(value: string) {
    const words = this.srvWord.getWords();
    const results = [];
    words.forEach(
        (word, index) => {
          if (word.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
              results.push( { id: index, word: word.name } );
            }
        }
    );

    return results;
  }

  findOccurrencesInThemes(value: string) {
    const themes = this.srvTheme.getThemes();
    const results = [];
    themes.forEach(
        (theme, index) => {
          if (theme.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
            results.push( { id: index, theme: theme.name } );
          }
        }
    );

    return results;
  }


  hideSearch() {
    this.longSearch = false;
  }

}
