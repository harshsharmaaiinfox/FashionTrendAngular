import { Params } from "../interface/core.interface";

export class GetUserTransaction {
  static readonly type = "[Wallet] Transaction Get";
  constructor(public payload?: Params) {}
}