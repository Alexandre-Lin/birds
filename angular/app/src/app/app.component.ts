import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ImageWikiService} from './services/image-wiki.service';
import {ApiPredictionResponse} from './model/api-prediction-response.model';
import {ApiPredictionService} from './services/api-prediction.service';

// list of predicted responses that need to change its label to find an image on Wikipedia
const PREDICTED_RESPONSE = [
  'air_conditioner',
  'car_horn',
  'children_playing',
  'dog_bark',
  'drilling',
  'engine_idling',
  'gun_shot',
  'jackhammer',
  'siren',
  'street_music'];

// list of transformed label for Wikipedia image searches
const TRANSFORMED_RESPONSE = [
  'air conditioning',
  'vehicle horn',
  'playground',
  'bark (sound)',
  'drill',
  'drilling',
  'gunshot',
  'jackhammer',
  'siren (alarm)',
  'street performance'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;
  // files uploaded
  files: any[] = [];

  title = 'app';

  constructor(private imageService: ImageWikiService, private apiService: ApiPredictionService) {
  }

  /**
   * Method used to find an image of a desired object
   * @param name: the name of the object
   * @param index: index of the file
   */
  getImage(name: string, index: number): void {
    // reset the image url
    this.files[index].imageUrl = null;
    // first request to find the image name in Wikipedia
    this.imageService.getWikiImageName(name).subscribe(res => {
      const firstKey = Object.keys(res.body.query.pages)[0];
      // second request to find the URL (where it is stored) of the image
      this.imageService.getWikiImageURL(res.body.query.pages[firstKey].pageimage).subscribe(image => {
        this.files[index].imageUrl = image.body.query.pages['-1'].imageinfo[0].url;
      });
    });
  }

  ngAfterViewInit(): void {
  }

  /**
   * on file drop handler
   */
  onFileDropped($event): void {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files): void {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number): void {
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Upload process
   */
  uploadFiles(index: number): void {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFiles(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 50);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>): void {
    for (const item of files) {
      if (item.type.startsWith('audio/')) {
        item.progress = 0;
        item.prediction = false;
        item.prediction_status = 0; // -1: error, 0: initial, 1: processing, 2: success
        this.files.push(item);
      }
    }
    this.fileDropEl.nativeElement.value = '';
    this.uploadFiles(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  soundRecognition(index: number): void {
    this.files[index].prediction = true;
    this.files[index].prediction_status = 1;
    // transforming file into base64 file for API
    const reader = new FileReader();
    reader.readAsDataURL(this.files[index]);
    let fileStringBase64: string | ArrayBuffer = '';
    reader.onload = () => {
      fileStringBase64 = reader.result;
      if (typeof fileStringBase64 === 'string') {
        fileStringBase64 = fileStringBase64.split(',')[1];
      }
      // service for asking API and retrieve image if possible
      this.apiService.predictApi(fileStringBase64).subscribe((res: ApiPredictionResponse) => {
        if (!res) {
          this.files[index].prediction_status = -1;
          return;
        }
        this.files[index].prediction_status = 2;
        this.files[index].predictedObject = TRANSFORMED_RESPONSE[PREDICTED_RESPONSE.indexOf(res.source)];
        this.files[index].predictedRate = res.rate;
        // add image if found
        this.getImage(this.files[index].predictedObject, index);
      });
    };
  }
}
