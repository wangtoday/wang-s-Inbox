import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as libphonenumber from 'google-libphonenumber';

export class PhoneValidator {
  // Inspired on: https://github.com/yuyang041060120/ng2-validation/blob/master/src/equal-to/validator.ts
  static validCountryPhone = (countryControl: AbstractControl): ValidatorFn => {
    let subscribe = false;
    return (phoneControl: AbstractControl): { [key: string]: any } => {
      if (!subscribe) {
        subscribe = true;
        countryControl.valueChanges.subscribe(() => {
          phoneControl.updateValueAndValidity();
        });
      }
      if (phoneControl.value && phoneControl.value !== '') {
        try {
          const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
          const phoneNumber =
            countryControl.value + '' + phoneControl.value + '';

          const isValidNumber = phoneUtil.isValidNumber(
            phoneUtil.parse(phoneNumber)
          );

          // phoneUtil.isValidNumber(pNumber);

          if (isValidNumber) {
            return undefined;
          }
        } catch (e) {
          //   console.log('来这类报错了么?', e);
          return {
            validCountryPhone: '电话号码过短'
          };
        }

        return {
          validCountryPhone: '电话号码格式错误'
        };
      } else {
        // console.log('这个地方是 undefine 的');
        return undefined;
      }
    };
    // tslint:disable-next-line:semicolon
  };
}
