import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { renderChart } from "../../shared/utils/chart";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  chartData$ = this.dashboard.chartData$;

  constructor(private dashboard: DashboardService) {}

  ngOnInit() {
    this.dashboard.loadAndUpdateChart(30);
    this.chartData$.subscribe((data) => {
      renderChart("chart", data);
    });
  }

  updateChart(days: number) {
    this.dashboard.loadAndUpdateChart(days);
  }
}
