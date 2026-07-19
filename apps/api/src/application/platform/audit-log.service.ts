import { Injectable } from '@nestjs/common';

export interface AuditLogEntry {
  readonly action: string;
  readonly actor: string;
  readonly correlationId: string;
  readonly entity: string;
  readonly entityId: string;
  readonly newValue?: Readonly<Record<string, unknown>>;
  readonly oldValue?: Readonly<Record<string, unknown>>;
  readonly timestamp: string;
}

export interface RecordAuditLogCommand {
  action: string;
  actor?: string;
  correlationId?: string;
  entity: string;
  entityId: string;
  newValue?: Readonly<Record<string, unknown>>;
  oldValue?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AuditLogService {
  private readonly entries: AuditLogEntry[] = [];

  public record(command: RecordAuditLogCommand): AuditLogEntry {
    const entry: {
      action: string;
      actor: string;
      correlationId: string;
      entity: string;
      entityId: string;
      newValue?: Readonly<Record<string, unknown>>;
      oldValue?: Readonly<Record<string, unknown>>;
      timestamp: string;
    } = {
      action: command.action,
      actor: command.actor ?? 'system',
      correlationId: command.correlationId ?? 'unavailable',
      entity: command.entity,
      entityId: command.entityId,
      timestamp: new Date().toISOString(),
    };

    if (command.newValue !== undefined) {
      entry.newValue = command.newValue;
    }

    if (command.oldValue !== undefined) {
      entry.oldValue = command.oldValue;
    }

    this.entries.unshift(Object.freeze(entry));
    return entry;
  }

  public recent(limit = 50): readonly AuditLogEntry[] {
    return this.entries.slice(0, limit);
  }
}
