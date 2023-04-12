import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CostService } from './cost.service';
import { CostDTO } from './dto/cost.dto';

@Controller('cost')
export class CostController {
  constructor(private costService: CostService) {}

  @Post()
  async createCost(@Res() res, @Body() costDTO: CostDTO) {
    if (costDTO.security_token !== process.env.SECURITY_TOKEN) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'Security Token is incorrect',
      });
    }

    const cost = await this.costService.createCost(costDTO.cost);
    return res.status(HttpStatus.OK).json({
      message: 'Cost Successfully Created',
      cost,
    });
  }

  @Get()
  async getCosts(@Res() res) {
    const costs = await this.costService.getCosts();
    return res.status(HttpStatus.OK).json(costs);
  }

  @Get('/:costID')
  async getCost(@Res() res, @Param('costID') costID) {
    try {
      const cost = await this.costService.getCost(costID);
      return res.status(HttpStatus.OK).json(cost);
    } catch (error) {
      throw new NotFoundException('Cost Does not exist');
    }
  }

  @Delete('/:costID')
  async deleteCost(
    @Res() res,
    @Body() body: { security_token: string },
    @Param('costID') costID,
  ) {
    if (body.security_token !== process.env.SECURITY_TOKEN) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'Security Token is incorrect',
      });
    }

    try {
      const deletedCost = await this.costService.deleteCost(costID);
      return res.status(HttpStatus.OK).json({
        message: 'Cost Deleted Successfully',
        deletedCost,
      });
    } catch (error) {
      throw new NotFoundException('Cost Does not exist');
    }
  }

  @Put('/:costID')
  async updateCost(
    @Res() res,
    @Body() costDTO: CostDTO,
    @Param('costID') costID,
  ) {
    if (costDTO.security_token !== process.env.SECURITY_TOKEN) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'Security Token is incorrect',
      });
    }

    try {
      const updatedCost = await this.costService.updateCost(
        costID,
        costDTO.cost,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Cost Updated Successfully',
        updatedCost,
      });
    } catch (error) {
      throw new NotFoundException('Cost Does not exist');
    }
  }
}
