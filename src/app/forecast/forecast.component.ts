import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../services/forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.sass'],
})
export class ForecastComponent implements OnInit {
  dataWeather: any;

  constructor(public forecastService: ForecastService) {
    this.forecastService.weather$.subscribe((data) => {
      this.dataWeather = data;
    });
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.forecastService.weather$.forEach((data) =>
    //     this.dataWeather.push(data)
    //   );
    //   console.log(this.dataWeather);
    // }, 5000);
    // console.log(this.dataWeather);
    // this.forecastService.weather$.subscribe((data) => {
    //   console.log(data);
    // });
  }
}
