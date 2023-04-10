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
import { CreateCostDTO } from './dto/cost.dto';

@Controller('cost')
export class CostController {
  constructor(private costService: CostService) {}

  @Post()
  async createCost(@Res() res, @Body() createCostDTO: CreateCostDTO) {
    const cost = await this.costService.createCost(createCostDTO);
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
  async deleteCost(@Res() res, @Param('costID') costID) {
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
    @Body() createCostDTO: CreateCostDTO,
    @Param('costID') costID,
  ) {
    try {
      const updatedCost = await this.costService.updateCost(
        costID,
        createCostDTO,
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
