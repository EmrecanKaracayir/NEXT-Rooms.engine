import { PlayerType } from "../base/enums/playerType";

export {};

declare global {
  type PlayerTypeMap<T> = {
    [K in PlayerType]: T;
  };
}
