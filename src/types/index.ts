export * from './dataTypes';

export enum LinkType {
  ACCOUNT = 'account',
  FRIENDS = 'friends'
}

export type TableColumn = {
  accessor: string;
  footerSpan: number;
  Header: string;
  minWidth: number;
}
