import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { catchError } from 'rxjs/operators';
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
      this.http.post('/api/thumbnail-upload', formData)
      .pipe(
        catchError(error => {
          this.fileUploadError = true;
          return of(error)
        })
      )
      .subscribe();

    }
  



  }

}