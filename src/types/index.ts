export * from "./dataTypes";
import { errorMessage } from "constants/messages";

export type ErrorMessageKey = keyof typeof errorMessage;

export enum LinkType {
  ACCOUNT = "account",
  FRIENDS = "friends",
}

export type TableColumn = {
  accessor: string;
  footerSpan: number;
  Header: string;
  minWidth: number;
};
