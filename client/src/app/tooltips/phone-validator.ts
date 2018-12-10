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

      if (phoneControl.value !== '') {
        try {
          const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
          const phoneNumber =
            countryControl.value + '' + phoneControl.value + '';
          //   const region = countryControl.value;
          //   console.log('region: ', region.split('+')[1]);
          //   const pNumber = phoneUtil.parseAndKeepRawInput(
          //     phoneNumber,
          //     region.split('+')[1]
          //   );
          const isValidNumber = phoneUtil.isValidNumber(
            phoneUtil.parse(phoneNumber)
          );

          // phoneUtil.isValidNumber(pNumber);

          if (isValidNumber) {
            return undefined;
          }
        } catch (e) {
          console.log(e);
          return {
            validCountryPhone: '电话号码过短'
          };
        }

        return {
          validCountryPhone: '电话号码格式错误'
        };
      } else {
        return undefined;
      }
    };
  };
}
