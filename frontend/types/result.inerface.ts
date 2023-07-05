export type Result<Type> = [ResultError | null, Type | null];

export type ResultError = {
  statusCode: number;
  message: string;
};
