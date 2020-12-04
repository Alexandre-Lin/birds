/**
 * Response class for the prediction API
 */
export interface IApiPredictionResponse {
  source: string;
  rate: number;
}

export class ApiPredictionResponse implements IApiPredictionResponse {
  constructor(
    public source: string,
    public rate: number
  ) {
  }
}
