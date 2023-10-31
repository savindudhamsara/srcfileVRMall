import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListenAudioService {

  constructor() { }

  resolveBlobFromBlobUrl(blobUrl: string): Promise<Blob> {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = () => {
        console.log("GHello",xhr.status);
        
        if (xhr.status == 200) {
          resolve(xhr.response);
        }
      };
      xhr.open('GET', blobUrl);
      xhr.send();
    });
  }
  
}
