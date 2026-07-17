import { InvalidMoneyException } from '../exceptions/invalid-money.exception';
import { ValueObject } from './value-object';

interface MoneyProps {
  amount: number;
  currency: string;
}

export class Money extends ValueObject<MoneyProps> {
  public constructor(amount: number, currency: string) {
    super({ amount, currency: currency.trim().toUpperCase() });
  }

  public get amount(): number {
    return this.props.amount;
  }

  public get currency(): string {
    return this.props.currency;
  }

  protected validate(props: Readonly<MoneyProps>): void {
    if (!Number.isFinite(props.amount) || props.amount < 0 || !/^[A-Z]{3}$/.test(props.currency)) {
      throw new InvalidMoneyException();
    }
  }
}
