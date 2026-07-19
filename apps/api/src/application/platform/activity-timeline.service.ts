import { Injectable } from '@nestjs/common';

import type { AuditLogEntry } from './audit-log.service';
import { AuditLogService } from './audit-log.service';

@Injectable()
export class ActivityTimelineService {
  public constructor(private readonly auditLogService: AuditLogService) {}

  public recent(limit?: number): readonly AuditLogEntry[] {
    return this.auditLogService.recent(limit);
  }
}
