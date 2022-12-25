import { CashDbType } from "../services/db";

function cashTotal(obj: CashDbType) {
  var sum = 0;
  for (var value in obj) {
    if (obj.hasOwnProperty(value)) {
      sum += parseFloat(obj[value]);
    }
  }
  return sum;
}

export default cashTotal;
