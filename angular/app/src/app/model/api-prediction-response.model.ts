/* Response class for the prediction API */
export interface IApiPredictionResponse {
        specie: string;
        rate: number;
}

export class ApiPredictionResponse implements IApiPredictionResponse {
    constructor(
        public specie: string,
        public rate: number
    ) {}
}
