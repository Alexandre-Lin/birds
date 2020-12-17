import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const URL_API_PREDICTION = 'http://localhost:8080/v1/sounds/prediction';
const URL_API_LIST = 'http://localhost:8080/v1/test';

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
  predictApi(file: string | ArrayBuffer): Observable<string> {
    return this.http.post<string>(URL_API_PREDICTION, {binary: file}, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    });
  }

  /**
   * To get Prediction list
   */
  getPredictionsList(): Observable<string> {
    return this.http.get<string>(URL_API_LIST, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    });
  }
}
