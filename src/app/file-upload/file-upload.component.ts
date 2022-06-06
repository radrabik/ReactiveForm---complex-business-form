import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() requiredFileType: string
  fileName = "";

  fileUploadError = false;
  uploadProgress: number;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onFileSelected(event) {

    this.fileUploadError = false;

    const file: File = event.target.files[0];
    
    if (file) {
      this.fileName = file.name
      console.log(this.fileName);

      const formData = new FormData();
      formData.append("thumbnail", file)

      // observing events rather than values directly from the backend
      // by default "observe: events" reports only final response but by setting reportProgress we also get progress
      this.http.post('/api/thumbnail-upload', formData, { reportProgress: true, observe: 'events'})
      .pipe(
        catchError(error => {
          this.fileUploadError = true;
          return of(error)
        }),
        finalize(() => {
          // show some progress even no upload
          this.uploadProgress = null;
        }),
      )
      .subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total))
        }
      });

    }
  



  }

}