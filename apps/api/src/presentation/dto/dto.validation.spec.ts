import { validate } from 'class-validator';

import { CreateStadiumDto } from './stadium.dto';
import { CreateOrganizationDto } from './organization.dto';
import { CreateUserDto } from './user.dto';
import { CreateVenueDto } from './venue.dto';
import { CreateBookingDto } from './booking.dto';
import { CreateEventDto } from './event.dto';
import { CreateSportDto } from './sport.dto';
import { CreateTeamDto } from './team.dto';

describe('presentation DTO validation', () => {
  it('rejects invalid transport email input', async () => {
    const dto = Object.assign(new CreateUserDto(), { email: 'invalid-email' });

    await expect(validate(dto)).resolves.toHaveLength(1);
  });

  it('rejects a blank organization name', async () => {
    const dto = Object.assign(new CreateOrganizationDto(), { name: '' });

    await expect(validate(dto)).resolves.toHaveLength(1);
  });

  it('accepts a valid stadium transport payload', async () => {
    const dto = Object.assign(new CreateStadiumDto(), { capacity: 50000, name: 'Arena' });

    await expect(validate(dto)).resolves.toHaveLength(0);
  });

  it('rejects a blank stadium name', async () => {
    const dto = Object.assign(new CreateStadiumDto(), { capacity: 50000, name: '' });

    await expect(validate(dto)).resolves.toHaveLength(1);
  });

  it('rejects out-of-range venue coordinates before application handling', async () => {
    const dto = Object.assign(new CreateVenueDto(), {
      latitude: 91,
      longitude: 80,
      name: 'Arena',
    });

    await expect(validate(dto)).resolves.toHaveLength(1);
  });

  it('rejects blank venue text fields', async () => {
    const dto = Object.assign(new CreateVenueDto(), {
      addressLine1: '',
      latitude: 13.0827,
      longitude: 80.2707,
      name: '',
    });

    await expect(validate(dto)).resolves.toHaveLength(2);
  });

  it('rejects blank Team, Sport, and Booking text fields', async () => {
    const team = Object.assign(new CreateTeamDto(), { name: '', sportId: '', sportName: '' });
    const sport = Object.assign(new CreateSportDto(), { name: '' });
    const booking = Object.assign(new CreateBookingDto(), { reference: '' });

    await expect(validate(team)).resolves.toHaveLength(3);
    await expect(validate(sport)).resolves.toHaveLength(1);
    await expect(validate(booking)).resolves.toHaveLength(1);
  });

  it('rejects invalid event date input before application handling', async () => {
    const dto = Object.assign(new CreateEventDto(), {
      endsAt: new Date('invalid'),
      name: 'Championship Final',
      startsAt: new Date('2026-07-18T18:00:00.000Z'),
    });

    await expect(validate(dto)).resolves.toHaveLength(1);
  });
});
