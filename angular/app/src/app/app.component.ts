import {AfterViewInit, Component} from '@angular/core';
import {BirdImageWikiService} from './services/bird-image-wiki.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  imageUrl = null;

  constructor(private service: BirdImageWikiService) {
  }

  /**
   * Method used to find an image of a desired bird
   * @param birdName: the name of the bird
   */
  getImage(birdName: string): void {
    // first request to find the image name in Wikipedia
    this.service.getWikiImageName(birdName).subscribe(res => {
      const firstKey = Object.keys(res.body.query.pages)[0];
      // second request to find the URL (where it is stored) of the image
      this.service.getWikiImageURL(res.body.query.pages[firstKey].pageimage).subscribe(image => {
        this.imageUrl = image.body.query.pages['-1'].imageinfo[0].url;
      });
    });
  }

  ngAfterViewInit(): void {
    this.getImage('falcon');
  }
}
