import {Component, OnInit, ViewChild} from '@angular/core';
import {WordService} from '../services/word.service';
import {ThemeService} from '../services/theme.service';
// import {NavbarComponent} from 'angular-bootstrap-md/angular-bootstrap-md/navbars';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public longSearch = false;
  private valueSearch: string;
  public resultSearch = {'words': [], 'themes': []};

  // @ViewChild('navbar') navbar: NavbarComponent;
  private navbarHeight: string;

  constructor(private srvWord: WordService,
              private srvTheme: ThemeService) { }

  ngOnInit() {

  }

  showLongSearch(yesNo: boolean) {
    this.longSearch = yesNo;
    const elNavLiSearch  = document.getElementById('app-nav-search');
    const elNavLiSearchInput = document.getElementById('app-nav-input-search');

    const elNavBtnToogler = document.getElementsByClassName('navbar-toggler').item(0);
    const elNavDivCollapse = <HTMLDivElement>document.getElementsByClassName('navbar-collapse collapse').item(0);

    if (yesNo) {
      // Impossible de faire fonctionner le @ViewChild pour accéder aux events de fermeture et d'ouverture de la barre....
      // On le fait àl'ancienne pour l'instant...
      this.navbarHeight = elNavDivCollapse.style.height;
      elNavDivCollapse.style.height = '0px';

      elNavBtnToogler.classList.add('d-none');
      elNavLiSearch.classList.remove('d-none');
      elNavLiSearch.classList.add('w-100');
      elNavLiSearch.style.display = 'list-item';
      elNavLiSearchInput.focus();
    } else {
      elNavDivCollapse.style.height = this.navbarHeight;
      elNavBtnToogler.classList.remove('d-none');
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


  // hideSearch() {
  //   // this.longSearch = false;
  //   this.showLongSearch(false);
  // }


}
