import {FormGroup, ValidatorFn, Validators} from '@angular/forms';

export function createPromoRangeValidator(): ValidatorFn {
  return (form: FormGroup): Validators | null => {

    const start = form.get("promoStartAt").value;
    const end = form.get("promoEndAt").value;

    if (start && end ){
      const isRangeValid = (end?.getTime() - start?.getDate() > 0)
      return isRangeValid ? null : {promoPeriod: true}
    }
  
    // if start & end date are not present, return null
    return null;
    
  }
}