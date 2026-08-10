export interface SelectOption {
  label: string;
  value: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
