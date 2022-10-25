import { FormlyExtension,FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

export class TranslateExtension implements FormlyExtension{
    constructor(private translate: TranslateService) {}
    prePopulate(field: FormlyFieldConfig) {
      const props = field.props || {};
      if (!props['translate'] || props['_translated']) {
        return;
      }
  
      props['_translated'] = true;
      field.expressions = {
        ...(field.expressions || {}),
        'props.label': this.translate.stream('FORM.LANG'),
      };
    }
  }
  
  export function registerTranslateExtension(translate: TranslateService) {
    return {
      validationMessages: [
        {
          name: 'required',
          message() {
            console.log("here");
            
            return translate.stream('FORM.VALIDATION.REQUIRED');
          },
        },
        {
            name:'min',
            message(){
                return translate.stream('FORM.VALIDATION.MIN')
            }
        }
      ],
      extensions: [
        {
          name: 'translate',
          extension: new TranslateExtension(translate),
        },
      ],
    };
}
