import { Schema } from 'mongoose';

export const CostSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  monthOfCharging: { type: String, required: true },
  numberQuotas: { type: Number, required: true },
  paid: { type: Boolean, required: true },
  dollarized: { type: Boolean, required: true },
});
