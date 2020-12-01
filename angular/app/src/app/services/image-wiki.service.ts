import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageWikiService {

  private WIKI_GET_NAME_IMAGE_REQUEST =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&continue=%7C%7C&origin=*&titles=';
  private WIKI_GET_URL_IMAGE_REQUEST = 'https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles=File:';
  private WIKI_GET_URL_IMAGE_REQUEST_PARAMS = '&continue=&format=json&origin=*';

  constructor(private http: HttpClient) {
  }

  /**
   * To get the name of the image of the desired object by using Wikipedia
   * @param name: the name of the object
   */
  getWikiImageName(name: string): Observable<any> {
    return this.http.get<any>(this.WIKI_GET_NAME_IMAGE_REQUEST + name, {observe: 'response', responseType: 'json'});
  }

  /**
   * To get the URL of the image
   * @param imageName: name of the image
   */
  getWikiImageURL(imageName: string): Observable<any> {
    return this.http.get<any>(
      this.WIKI_GET_URL_IMAGE_REQUEST + imageName + this.WIKI_GET_URL_IMAGE_REQUEST_PARAMS,
      {observe: 'response'});
  }
}
