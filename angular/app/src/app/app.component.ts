import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ImageWikiService} from './services/image-wiki.service';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;
  files: any[] = [];

  title = 'app';
  imageUrl = null;

  constructor(private service: ImageWikiService) {
  }

  /**
   * Method used to find an image of a desired object
   * @param name: the name of the object
   */
  getImage(name: string): void {
    // reset the image url
    this.imageUrl = null;
    // first request to find the image name in Wikipedia
    this.service.getWikiImageName(name).subscribe(res => {
      const firstKey = Object.keys(res.body.query.pages)[0];
      // second request to find the URL (where it is stored) of the image
      this.service.getWikiImageURL(res.body.query.pages[firstKey].pageimage).subscribe(image => {
        this.imageUrl = image.body.query.pages['-1'].imageinfo[0].url;
      });
    });
  }

  ngAfterViewInit(): void {
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Upload process
   */
  uploadFiles(index: number) {
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
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      item.prediction = false;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = '';
    this.uploadFiles(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  soundRecognition(index: number) {
    this.files[index].prediction = true;
  }
}
