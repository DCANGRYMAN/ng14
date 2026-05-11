import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  groupByDay,
  sortByTime,
  getReadings,
} from "../../shared/utils/reading";
import { Data } from "../models/dataModel";

interface Stats {
  consumption: string;
  cost: string;
  co2: string;
}

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  public getReadings$ = new BehaviorSubject<Data[] | null>(null);
  public chartData$ = new BehaviorSubject<any[]>([]);

  private readonly PRICE_PER_KWH = 0.12;
  private readonly CO2_PER_KWH = 0.6;

  readonly stats$: Observable<Stats> = this.getReadings$.pipe(
    map((readings) => this.calculateStats(readings || [])),
  );

  constructor() {}

  totalHours(days: number): number {
    return (days + 2) * 24;
  }

  async loadAndUpdateChart(days: number) {
    const readings = await getReadings(this.totalHours(days));
    const grouped = groupByDay(readings);
    const processedData = sortByTime(grouped).slice(-days);
    this.getReadings$.next(readings);
    this.chartData$.next(processedData);
    return processedData;
  }

  private calculateStats(readings: Data[]): Stats {
    const totalConsumption = readings.reduce((sum, r) => sum + r.value, 0);
    return {
      consumption: totalConsumption.toFixed(2),
      cost: (totalConsumption * this.PRICE_PER_KWH).toFixed(2),
      co2: (totalConsumption * this.CO2_PER_KWH).toFixed(2),
    };
  }
}

