export type BalanceType = {
  name?: string;
  category?: string;
  id?: number;
  value?: number | string;
  created_at?: Date;
  updated_at?: Date;
  cashRegisterType?: string;
  cashOut: boolean;
  cashIn: boolean;
  cash_in: number;
  cash_out: number;
};
