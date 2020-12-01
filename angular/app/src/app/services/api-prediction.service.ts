import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiPredictionResponse} from '../model/api-prediction-response.model';

const URL_API_PREDICTION = '';

@Injectable({
  providedIn: 'root'
})
export class ApiPredictionService {

  constructor(private http: HttpClient) {
  }

  /**
   * To launch a prediction
   * @param file: the audio file to predict
   */
  predictApi(file: File): Observable<ApiPredictionResponse> {
    const fileData: FormData = new FormData();
    fileData.append('file', file);
    /**
     * Temporary response, waiting for the server to be built
     */
    return new Observable<ApiPredictionResponse>(observer => {
      observer.next(new ApiPredictionResponse('falcon', 98));
      observer.complete();
    });
    return this.http.put<ApiPredictionResponse>(URL_API_PREDICTION, fileData, {
      reportProgress: true,
      responseType: 'json'
    });
  }
}
