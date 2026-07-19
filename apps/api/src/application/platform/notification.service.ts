export interface NotificationMessage {
  readonly recipient: string;
  readonly subject: string;
  readonly text: string;
}

export interface NotificationProvider {
  send(message: NotificationMessage): Promise<void>;
}

export type EmailNotificationProvider = NotificationProvider;

export type PushNotificationProvider = NotificationProvider;

export interface NotificationService {
  notify(message: NotificationMessage): Promise<void>;
}

export class InMemoryNotificationProvider implements NotificationProvider {
  private readonly messages: NotificationMessage[] = [];

  public async send(message: NotificationMessage): Promise<void> {
    this.messages.push(Object.freeze({ ...message }));
  }

  public delivered(): readonly NotificationMessage[] {
    return [...this.messages];
  }
}
