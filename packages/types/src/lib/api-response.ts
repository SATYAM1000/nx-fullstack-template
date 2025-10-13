export type ApiSuccessResponse<T = unknown> = {
  success: true;
  statusCode: number;
  request: {
    ip?: string | null;
    method: string;
    url: string;
  };
  message: string;
  data: T;
};

export type ApiErrorResponse<T = unknown> = {
  success: false;
  statusCode: number;
  request: {
    ip?: string | null;
    method: string;
    url: string;
  };
  message: string;
  data: T;
  trace?: object | null;
};

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse<T>;
