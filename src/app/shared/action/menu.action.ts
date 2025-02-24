import { Params } from "../interface/core.interface";

export class GetMenu {
  static readonly type = "[Menu] Get";
  constructor(public payload?: Params) {}
}