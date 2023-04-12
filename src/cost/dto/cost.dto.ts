export class CostDTO {
  security_token: string;
  cost: {
    readonly title: string;
    readonly amount: number;
    readonly monthOfCharging: string;
    readonly numberQuotas: number;
    readonly paid: boolean;
    readonly dollarized: boolean;
  };
}
