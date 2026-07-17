import { Command } from './command';

describe('Command', () => {
  it('captures an immutable command payload', () => {
    const command = new Command({ name: 'Stadium' });

    expect(command.payload).toEqual({ name: 'Stadium' });
    expect(Object.isFrozen(command.payload)).toBe(true);
  });
});
