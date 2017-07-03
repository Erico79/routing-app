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
    <button (click)="goToHeroes()">Back</button>
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
  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getHero(+params.get('id')))
      .subscribe((hero: Hero) => this.hero = hero);
  }

  /**
   * When you know for certain that a HeroDetailComponent instance will never, never, ever be re-used,
   * you can simplify the code with the snapshot.
   *
   * The route.snapshot provides the initial value of the route parameter map.
   * You can access the parameters directly without subscribing or adding observable operators.
   * It's much simpler to write and read:
   */
  // ngOnInit(): void {
  //   let id = parseInt(this.route.snapshot.paramMap.get('id'));
  //
  //   this.service.getHero(id)
  //     .then((hero: Hero) => this.hero = hero);
  // }

  goToHeroes(): void {
    let heroId = this.hero ? this.hero.id : null;
    // pass the hero id if available so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun
    this.router.navigate(['/heroes', {id: heroId, foo: 'foo'}]);
  }
}
