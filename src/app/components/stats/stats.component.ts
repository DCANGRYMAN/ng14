import { Component } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.scss"],
})
export class StatsComponent {
  readonly stats$ = this.dashboard.stats$;

  constructor(private dashboard: DashboardService) {}
}