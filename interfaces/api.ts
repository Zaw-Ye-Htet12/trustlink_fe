export interface Response<T = undefined> {
    success: boolean;
    status: number;
    message: string;
    data: T;
}

export interface ErrorResponse {
    statusCode: number;
    message: string;
    error: string;
}