import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RemoveSpacesPipe } from '../remove-spaces.pipe';
import { InputFormatDirective } from '../input-format.directive';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RemoveSpacesPipe, InputFormatDirective],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes: Hero[] = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
