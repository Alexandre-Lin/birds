import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BirdImageWikiService {

  private WIKI_GET_NAME_IMAGE_REQUEST =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&continue=%7C%7C&origin=*&titles=';
  private WIKI_GET_URL_IMAGE_REQUEST = 'https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles=File:';
  private WIKI_GET_URL_IMAGE_REQUEST_PARAMS = '&continue=&format=json&origin=*';

  constructor(private http: HttpClient) {
  }

  /**
   * To get the name of the image of the desired bird by using Wikipedia
   * @param birdName: the name of the bird
   */
  getWikiImageName(birdName: string): Observable<any> {
    return this.http.get<any>(this.WIKI_GET_NAME_IMAGE_REQUEST + birdName, {observe: 'response', responseType: 'json'});
  }

  /**
   * To get the URL of the bird image
   * @param birdImageName: name of the bird image
   */
  getWikiImageURL(birdImageName: string): Observable<any> {
    return this.http.get<any>(
      this.WIKI_GET_URL_IMAGE_REQUEST + birdImageName + this.WIKI_GET_URL_IMAGE_REQUEST_PARAMS,
      {observe: 'response'});
  }
}
