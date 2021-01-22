import {
  Controller,
  Inject,
  Body,
  BadRequestException,
  UseGuards,
  Param,
  Put
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { UpdateSchoolTypeCommand } from 'src/Application/School/Command/Type/UpdateSchoolTypeCommand';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { SchoolTypeDTO } from '../../DTO/SchoolTypeDTO';

@Controller('school-types')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateSchoolTypeAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @ApiOperation({ summary: 'Edit school type' })
  public async index(@Param() { id }: IdDTO, @Body() { name }: SchoolTypeDTO) {
    try {
      await this.commandBus.execute(
        new UpdateSchoolTypeCommand(id, name)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}