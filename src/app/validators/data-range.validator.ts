import {FormGroup, ValidatorFn, Validators} from '@angular/forms';

export function createPromoRangeValidator(): ValidatorFn {
  return (form: FormGroup): Validators | null => {

    const start:Date = form.get("fromDate").value;
    const end:Date = form.get("toDate").value;

    if (start && end ){

      const isRangeValid = (end.getTime() - start.getTime() > 0)

      return isRangeValid ? null : {promoPeriod: true}
    }
  
    // if start & end date are not present, return null
    return null;
    
  }
}