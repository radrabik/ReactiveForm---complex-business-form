import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import {of} from 'rxjs';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent
    }
  ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() requiredFileType: string
  fileName = "";

  fileUploadError = false;
  uploadProgress: number;
  fileUploadSuccess = false;

  onChange = (fileName: string) => {};  // empty function
  onTouched = () => {}; 
  onValidatorChange  = () => {};

  disabled: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched(); // mark the formControl as touched
    fileUpload.click(); // open the file upload dialog

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
        else if (event.type == HttpEventType.Response) {
          //reponse successfull, trigger registerOnChange
          this.onChange(this.fileName)
          this.fileUploadSuccess = true;
        }
      });

    }
  



  }

  writeValue(value: any) {
    // used by formControl to write a value to our form component which is a new file
    this.fileName = value;
  }

  registerOnChange(onChange: any): void {
    //if anything changes on the form, report it to parent formControl
    this.onChange = onChange;
  }

  registerOnTouched(OnTouched: any) {
    // if user opens the upload dialog but cancels
    this.onTouched = OnTouched;
  }

  setDisabledState(disabled: boolean) {
    // introducing disabled property, then on form you can use [disabled]="disabled" to disable the form
    this.disabled = disabled;

  }

  registerOnValidatorChange(onValidatorChange: () => void): void {
    // notify the parent form that some value has changed
    this.onValidatorChange = onValidatorChange;

  }

  validate(control: AbstractControl): ValidationErrors | null {
    // validation function to pass information if form is valid
    
    if (this.fileUploadSuccess) {
      // no error occured, file uploaded, return null => no errors
      return null;
    }

    let errors: any = {
      requiredFileType: this.requiredFileType
    };

    if (this.fileUploadError) {
      errors.uploadFailed = true;
    };

    return errors;

  }

}