import { mock, instance } from 'ts-mockito';
import { School } from './School.entity';
import { Photographer } from '../User/Photographer.entity';

describe('School', () => {
  it('testGetters', () => {
    const photographer = mock(Photographer);
    const school = new School(
      'LM120I',
      'Ecole élémentaire Belliard',
      '127 Rue Belliard',
      '75018',
      'Paris',
      instance(photographer)
    );
    expect(school.getId()).toBeUndefined();
    expect(school.getName()).toBe('Ecole élémentaire Belliard');
    expect(school.getReference()).toBe('LM120I');
    expect(school.getCity()).toBe('Paris');
    expect(school.getZipCode()).toBe('75018');
    expect(school.getAddress()).toBe('127 Rue Belliard');
    expect(school.getPhotographer()).toBe(instance(photographer));
    expect(school.getCreatedAt()).toBeUndefined();
  });

  it('testUpdate', () => {
    const photographer = mock(Photographer);
    const school = new School(
      'LM120I',
      'Ecole élémentaire Belliard',
      '127 Rue Belliard',
      '75018',
      'Paris',
      instance(photographer)
    );
    expect(school.getId()).toBeUndefined();
    expect(school.getName()).toBe('Ecole élémentaire Belliard');
    expect(school.getReference()).toBe('LM120I');
    expect(school.getCity()).toBe('Paris');
    expect(school.getZipCode()).toBe('75018');
    expect(school.getAddress()).toBe('127 Rue Belliard');
    expect(school.getPhotographer()).toBe(instance(photographer));
    expect(school.getCreatedAt()).toBeUndefined();

    school.update('ref', 'name', 'address', 'zipCode', 'city');

    expect(school.getName()).toBe('name');
    expect(school.getReference()).toBe('ref');
    expect(school.getCity()).toBe('city');
    expect(school.getZipCode()).toBe('zipCode');
    expect(school.getAddress()).toBe('address');
  });
});
