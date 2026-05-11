import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Data } from "src/app/shared/models/dataModel";
import { ApiService } from "src/app/shared/services/api.service";

interface Stats {
  consumption: string;
  cost: string;
  co2: string;
}

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.scss"],
})
export class StatsComponent {
  private readonly PRICE_PER_KWH = 0.12;
  private readonly CO2_PER_KWH = 0.6;

  readonly stats$: Observable<Stats> = this.api.getReadings$.pipe(
    map(readings => this.calculateStats(readings || []))
  );

  constructor(private api: ApiService) {}

  private calculateStats(readings: Data[]): Stats {
    const totalConsumption = readings.reduce((sum, r) => sum + r.value, 0);
    return {
      consumption: totalConsumption.toFixed(2),
      cost: (totalConsumption * this.PRICE_PER_KWH).toFixed(2),
      co2: (totalConsumption * this.CO2_PER_KWH).toFixed(2),
    };
  }
}