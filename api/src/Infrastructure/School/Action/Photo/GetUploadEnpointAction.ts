import { Controller, Inject, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
// import { IQueryBus } from 'src/Application/IQueryBus';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { SchoolUploadEndpointView } from 'src/Application/School/View/SchoolUploadEndpointView';
import { IFileUpload } from 'src/Application/IFileUpload';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetSchoolUploadEnpointAction {
  constructor(
    // @Inject('IQueryBus')
    // private readonly queryBus: IQueryBus,
    @Inject('IFileUpload')
    private readonly fileUploadAdapter: IFileUpload
  ) {}

  @Get(':id/photos/upload')
  @Roles('photographer')
  @ApiOperation({summary: 'Get enpoint to upload files containing photos'})
  public async index(@Param() dto: IdDTO): Promise<SchoolUploadEndpointView> {
      const url = await this.fileUploadAdapter.getEndPoint(dto.id);
    return new SchoolUploadEndpointView(url);
  }
}
