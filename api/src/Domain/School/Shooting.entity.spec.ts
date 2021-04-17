import { instance, mock } from 'ts-mockito';
import { School } from './School.entity';
import { Shooting, ShootingStatus } from './Shooting.entity';

describe('Shooting', () => {
  it('testGetters', () => {
    const school = mock(School);
    const shooting = new Shooting(
      'Prise de vue début année',
      new Date('2021-04-17'),
      new Date('2021-09-01'),
      ShootingStatus.DISABLED,
      instance(school)
    );
    expect(shooting.getId()).toBeUndefined();
    expect(shooting.getName()).toBe('Prise de vue début année');
    expect(shooting.getShoointingDate()).toMatchObject(new Date('2021-04-17T00:00:00.000Z'));
    expect(shooting.getClosingDate()).toMatchObject(new Date('2021-09-01T00:00:00.000Z'));
    expect(shooting.getStatus()).toBe(ShootingStatus.DISABLED);
    expect(shooting.getSchool()).toBe(instance(school));
  });
});
