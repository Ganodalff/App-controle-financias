export type CashDbType = {
  name: string;
  value: number;
  category: string;
  date?: Date;
  cashRegisterType: string;
};

export const cashOutDb: Array<CashDbType> = [];

export const cashInDb: Array<CashDbType> = [];
