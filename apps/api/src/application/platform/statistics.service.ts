import { Injectable } from '@nestjs/common';

import { DashboardService } from './dashboard.service';

@Injectable()
export class PlatformStatisticsService {
  public constructor(private readonly dashboardService: DashboardService) {}

  public async getStatistics() {
    const dashboard = await this.dashboardService.getDashboard();
    return {
      bookings: dashboard.bookings,
      events: dashboard.events,
      platformTotals: dashboard.totals,
      sports: dashboard.totals.sports,
      stadiums: dashboard.stadiums,
      teams: dashboard.totals.teams,
      venues: dashboard.venues,
    };
  }
}
