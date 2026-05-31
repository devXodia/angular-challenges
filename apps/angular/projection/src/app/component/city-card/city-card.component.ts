import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/cardRow.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [items]="cities()" class="bg-light-green" (add)="addCity()">
      <img src="assets/img/city.png" width="200px" />
      <ng-template [cardRow]="cities()" let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }} - {{ city.country }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardRowDirective],
})
export class CityCardComponent implements OnInit {
  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }

  addCity() {
    this.store.addOne(randomCity());
  }
}
