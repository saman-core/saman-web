import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenTargetStateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null) return null;
    const labelName = control.value.get('name');
    return labelName === 'START' ? { forbiddenTargetState: { value: control.value } } : null;
  };
}

export function duplicateNameValidator(
  names: string[],
  actualName: string = undefined,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === actualName) return null;
    const found = names.find((l: string) => l === control.value);
    return typeof found !== 'undefined' ? { duplicateName: { value: control.value } } : null;
  };
}

export function nameFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const reg = /^[a-z]{1}[a-zA-Z0-9]{0,511}$/;
    return !reg.test(control.value) ? { nameFormat: { value: control.value } } : null;
  };
}
