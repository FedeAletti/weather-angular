import { Component } from '@angular/core';
import { ForecastService } from './services/forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'weatherapp';

  constructor(private forecastService: ForecastService) {}

  ngOnInit() {
    this.forecastService.weather$.subscribe(console.log);
  }
}
