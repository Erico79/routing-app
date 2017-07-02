import {Component, Input, OnInit} from '@angular/core';
import { Hero } from './hero';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {HeroService} from './hero.service';

@Component({
  selector: 'hero-detail',
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div>
        <label>id: </label>{{hero.id}}
      </div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>
  `
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {}

  /**
   * You might think to use the RxJS map operator.
   * But the HeroService returns an Observable<Hero>.
   * Your subscription wants the Hero, not an Observable<Hero>.
   * So you flatten the Observable with the switchMap operator instead.
   */
  ngOnInit(): void {
    this.route.paramMap
    // the switchMap also cancels previous in-flight requests. Meaning, if the user re-navigates to this route with a new
    // id while the HeroService is still retrieving the old id, switchMap discards that old request and returns the hero
    // for the new id.
      .switchMap((params: ParamMap) => this.service.getHero(params.get('id')))
      // finally, you activate the observable with subscribe method and (re)set the component's hero property with the retrieved hero
      .subscribe((hero: Hero) => this.hero = hero);
  }
}
