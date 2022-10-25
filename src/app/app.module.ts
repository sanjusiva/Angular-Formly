import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import {FormlyFieldConfig, FormlyModule, FORMLY_CONFIG} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import { InputFieldType } from './input-field-type';
import { PanelFieldWrapper } from './panel-field-wrapper';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { registerTranslateExtension } from './translate-extension';
import {FormlyPresetModule} from '@ngx-formly/core/preset';
import { registerSalutationPreset, SALUTATION_OPTIONS } from './salutation-preset-provider';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '_json');
}

export function minValidatorMessage(err:any,field:FormlyFieldConfig){
  return `Age should be greater than 18,but you provided ${err.actual}`;//global error message
}


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    InputFieldType,
    PanelFieldWrapper
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormlyBootstrapModule,
    FormlyPresetModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormlyModule.forRoot({
      presets: [
        {
          name: 'fatherName',
          config: {
            key: 'fatherName',
            type: 'input',
            props: {
              label: 'Father Name',
            },
          },
        },
       
      ],
    }),
    FormlyModule.forRoot({
      wrappers:[
        { name: 'panel', component: PanelFieldWrapper },
      ],  
     validationMessages: [
      { name:'min', message: minValidatorMessage},
      { name: 'required', message: 'This field is required' },
    ],
    types:[
      {name:'input', component:InputFieldType},
      {name:'age',extends:'input',defaultOptions:{validators:{min:minValidatorMessage}}},
    ],
    }),
  ],
  providers: [
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [TranslateService] },
    {
      provide: SALUTATION_OPTIONS,
      useValue: ['Mr.', 'Ms.', 'Dr.', 'Dude'],
    },
    {
      provide: FORMLY_CONFIG,
      useFactory: registerSalutationPreset,
      deps: [SALUTATION_OPTIONS],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
