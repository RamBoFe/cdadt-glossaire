import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Word} from '../../models/word.model';
import {WordService} from '../../services/word.service';
import {ThemeService} from '../../services/theme.service';
import {Subscription} from 'rxjs';
import {Theme} from '../../models/theme.model';

@Component({
  selector: 'app-single-word',
  templateUrl: './single-word.component.html',
  styleUrls: ['./single-word.component.scss']
})
export class SingleWordComponent implements OnInit, OnDestroy {

  public word: Word;
  public theme: Theme;
  private subscriber: Subscription;

  constructor(private srvWord: WordService,
              private srvTheme: ThemeService,
              private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.subscriber = this.route.params.subscribe((params: Params) => {
      console.log(params.id);
      this.getWords(params.id);
    });
  }

  getWords(id: number) {
    // const id = this.route.snapshot.params['id'];
    this.word = this.srvWord.getWordByIndex(id);
    this.theme = this.srvTheme.getThemeByIndex(this.word.theme);

    }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}

