/**
 * Response class for the prediction API
 */
export interface IApiPredictionResponse {
  object: string;
  rate: number;
}

export class ApiPredictionResponse implements IApiPredictionResponse {
  constructor(
    public object: string,
    public rate: number
  ) {
  }
}
