/* Response class for the bird API */
export interface IBirdResponse {
        specie: string;
        rate: number;
}

export class BirdResponse implements IBirdResponse {
    constructor(
        public specie:  string,
        public rate: number
    ) {}
}