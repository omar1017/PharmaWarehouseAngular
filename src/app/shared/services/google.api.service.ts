import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  private readonly API_KEY = 'AIzaSyBkA1zk8KUeqywh3Q-mH3TVwriOSGoK6e0'; // استبدل بـ API Key الخاص بك
  private readonly DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

  constructor() {
    this.initializeGapi();
  }

  private initializeGapi() {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: this.API_KEY,
        discoveryDocs: this.DISCOVERY_DOCS
      }).then(() => {
        console.log('Google Drive API initialized');
      }).catch((error:any) => {
        console.error('Error initializing Google Drive API:', error);
      });
    });
  }

  uploadFile(file: File) {
    const metadata = {
      name: file.name,
      mimeType: file.type
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    return gapi.client.request({
      path: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
      method: 'POST',
      body: form
    });
  }

  deleteFile(fileId: string) {
    return gapi.client.drive.files.delete({
      fileId: fileId
    });
  }
}