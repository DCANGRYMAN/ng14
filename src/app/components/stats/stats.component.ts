import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Data } from "src/app/shared/models/dataModel";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.scss"], 
})
export class StatsComponent implements OnInit, OnDestroy {
  stats = {
    consumption: 0,
    cost: 0,
    co2: 0,
  };

  private readonly CURRENCY = { code: 'USD', symbol: '$', pricePerKwh: 0.12 };
  private readonly CO2_PER_KWH = 0.6;
  private destroy$ = new Subject<void>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getReadings$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data && Array.isArray(data)) {
          this.calculateStats(data);
        }
      });
  }

  private calculateStats(readings: Data[]): void {
    const consumption = readings.reduce((sum, reading) => sum + reading.value, 0);
    
    this.stats = {
      consumption: Math.round(consumption * 100) / 100,
      cost: Math.round(consumption * this.CURRENCY.pricePerKwh * 100) / 100,
      co2: Math.round(consumption * this.CO2_PER_KWH * 100) / 100,
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
