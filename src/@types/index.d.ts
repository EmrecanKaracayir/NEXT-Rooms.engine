import { PlayerType } from "../base/enums/playerType";

export {};

declare global {
  type AppResponse<T> = {
    success: boolean;
    data: T;
  };

  type AppStringMap = {
    [K in PlayerType]: string;
  };

  type PlayerTypeMap<T> = {
    [K in PlayerType]: T;
  };
}
