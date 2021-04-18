import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { IShootingRepository } from 'src/Domain/School/Repository/IShootingRepository';
import { Shooting, ShootingStatus } from 'src/Domain/School/Shooting.entity';
import { CreateShootingCommand } from './CreateShootingCommand';

@CommandHandler(CreateShootingCommand)
export class CreateShootingCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('IShootingRepository')
    private readonly shootingRepository: IShootingRepository,
  ) {}

  public async execute(command: CreateShootingCommand): Promise<string> {
    const { name, closingDate, schoolId, shootingDate } = command;

    const school = await this.schoolRepository.findOneById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    const shooting = await this.shootingRepository.save(
      new Shooting(
        name,
        shootingDate,
        closingDate,
        ShootingStatus.DISABLED,
        school
      )
    );

    return shooting.getId();
  }
}