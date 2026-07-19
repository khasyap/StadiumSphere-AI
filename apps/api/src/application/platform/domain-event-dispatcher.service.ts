import { Injectable } from '@nestjs/common';

import type { AggregateRoot, DomainEvent } from '../../domain';
import { AuditLogService } from './audit-log.service';

@Injectable()
export class DomainEventDispatcherService {
  public constructor(private readonly auditLogService: AuditLogService) {}

  public dispatch<TProps extends object>(
    aggregate: AggregateRoot<TProps>,
    event: DomainEvent<Record<string, unknown>>,
  ): void {
    aggregate.addDomainEvent(event);
    this.auditLogService.record({
      action: event.name,
      entity: event.name.replace(/(Created|Confirmed|Cancelled|Completed|Started|Finished|Opened|Closed|Reserved|Released)$/, ''),
      entityId: event.aggregateId.toString(),
      newValue: event.payload,
    });
    aggregate.clearDomainEvents();
  }
}
