import 'zone.js/dist/zone';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GOTService, House, Member } from './got.service';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly houses: GOTService['houses'];
  readonly selectedHouse: GOTService['selectedHouse'];

  constructor(private exs: GOTService) {
    this.houses = exs.houses;
    this.selectedHouse = exs.selectedHouse;
  }

  houseLabel(h: House<Member>): string {
    return `${h.name} (${h.members.map((m) => m.name).join(', ')})`;
  }

  select(h: House<Member>) {
    this.exs.select(h);
  }
}

bootstrapApplication(AppComponent);
