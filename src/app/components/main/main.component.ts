import { Component, OnInit } from "@angular/core";
import { Data } from "src/app/shared/models/dataModel";
import { ApiService } from "src/app/shared/services/api.service";
import { renderChart } from "../../shared/utils/chart";
import {
  groupByDay,
  sortByTime,
  getReadings,
} from "../../shared/utils/reading";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  chartData: any[] = [];
  private containerId = "chart";

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.updateChart(30);
  }

  async updateChart(days: number) {
    const totalHoursNeeded = (days + 2) * 24;
    const readings = await getReadings(totalHoursNeeded);
    this.chartData = readings;
    this.api.getReadings$.next(readings);
    const grouped = groupByDay(readings);
    const processedData = sortByTime(grouped).slice(-days);
    renderChart(this.containerId, processedData);
  }
}
