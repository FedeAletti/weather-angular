import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Coords } from '../structures/coords.structure';
import { Weather } from '../structures/weather.structure';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  endpoint: string = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {
    this.weather$ = this.weatherSubject
      .asObservable()
      .pipe(map(this.structureData));
    this.get({
      lat: -31.631519,
      lon: -60.714458,
    });
  }

  structureData(data: any) {
    let minMaxPerDay: any = {};
    data.list.forEach((weatherObject: any) => {
      // guardamos la fecha y la desglosamos en variables
      let date = new Date(weatherObject.dt * 1000);

      let hours = date.getHours();
      let month = date.getMonth();
      let day = date.getDate();

      let key = `${month}-${day}`;

      let min = weatherObject.main['temp_min'];
      let max = weatherObject.main['temp_max'];

      minMaxPerDay[key] = {
        day: day,
        month: month,
        hours: hours,
        min: min,
        max: max,
      };
    });
    console.log(minMaxPerDay);

    return minMaxPerDay;
  }

  get(coords: Coords) {
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&appid=${environment.key}&units=metric`;

    let url = this.endpoint + args;

    if (isDevMode()) {
      url = 'assets/forecast.json';
    }

    let observable = this.http.get(url).subscribe(this.weatherSubject);
  }
}
