import { Component } from '@angular/core';
import { Tile2Component } from '../tile-2/tile-2.component';
import { Tile1Component } from '../tile-1/tile-1.component';
import { OurVoiceComponent } from '../our-voice/our-voice.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Tile2Component, Tile1Component, OurVoiceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
