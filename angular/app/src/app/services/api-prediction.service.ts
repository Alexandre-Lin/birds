import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiPredictionResponse} from '../model/api-prediction-response.model';

const URL_API_PREDICTION = 'http://localhost:8080/v1/sounds/prediction';

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
  predictApi(file: string | ArrayBuffer): Observable<ApiPredictionResponse> {
    return this.http.post<ApiPredictionResponse>(URL_API_PREDICTION, {binary: file}, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    });
  }
}
