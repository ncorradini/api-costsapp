import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ICost } from './interfaces/cost.interface';
import { CreateCostDTO } from './dto/cost.dto';

@Injectable()
export class CostService {
  constructor(@InjectModel('Cost') private readonly costModel: Model<ICost>) {}

  async getCosts(): Promise<ICost[]> {
    const costs = await this.costModel.find();
    return costs;
  }

  async getCost(costID: string): Promise<ICost> {
    const cost = await this.costModel.findById(costID);
    return cost;
  }

  async createCost(createCostDTO: CreateCostDTO): Promise<ICost> {
    const cost = new this.costModel(createCostDTO);
    return await cost.save();
  }

  async deleteCost(costID: string): Promise<ICost> {
    const deletedCost = await this.costModel.findByIdAndDelete(costID);
    return deletedCost;
  }

  async updateCost(
    costID: string,
    createCostDTO: CreateCostDTO,
  ): Promise<ICost> {
    const updatedCost = await this.costModel.findByIdAndUpdate(
      costID,
      createCostDTO,
      { new: true },
    );
    return updatedCost;
  }
}
