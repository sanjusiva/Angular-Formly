import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { PanelFieldWrapper } from '../panel-field-wrapper';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  form = new FormGroup({});
  model = {
    // firstName: '',
    // lastName:'',
    // age: 0,
    // confirm:'No',
    // otp:'',
    // gender:'Male'
  };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'lang',
      type: 'select',
      props: {
        required: true,
        translate: true,
        label: 'FORM.LANG',
        change: (field) => this.translate.use(field.formControl?.value),
        options: [
          { label: 'fr', value: 'fr' },
          { label: 'en', value: 'en' },
        ],
      },
    },
    {
      template: '<br><br>',
    },
    {
      type: '#salutation',
    },
    {
      template: '<br><br>',
    },
    {
      type: '#fatherName',
    },
    {
      template: '<br><br>',
    },
    {
      type: '#fatherName',
      // wrappers:[PanelFieldWrapper],
      props: {
        label: 'FORM.NAME',
        // translate: true,
        placeholder: 'Enter your firstname',
        required: true
      },
      expressions: {
        'props.label': this.translate.stream('FORM.NAME'),
      },
    },
    {
      template: '<br><br>',
    },
    {
      key: 'lastName',
      wrappers:[PanelFieldWrapper],
      type: 'input',
      props: {
        label: 'LastName',
        placeholder: 'Enter your lastname',
        required:true
      },
      expressions: {
        // 'props.disabled': '!model.firstName',//disable that field
        'props.disabled': (field: FormlyFieldConfig) => {
          return !field.model.firstName;
        },
      },
    },
    {
      template: '<br><br>',
    },
    {
      key: 'age',
      type: 'age',
      // wrappers:[PanelFieldWrapper],
      props: {
        label: 'Age',
        placeholder: 'Enter your age',
        min: 18,
        required:true
      },
      // validation: {
      //   messages: {
      //     min: "Invalid Age"//overwrites the global error message
      //   }
      // }
    },
    {
      template: '<br><br>',
    },
    {
      key: 'gender',
      type: 'radio',
      wrappers:[PanelFieldWrapper],
      defaultValue: 'Male',
      props: {
        label: 'Radio',
        placeholder: 'Placeholder',
        required: true,
        options: [
          { value: 'Male', label: 'Male'},
          { value: 'Female', label: 'Female' },
          { value: 'Others', label: 'Others' }
        ],
      },
    },
    {
      template: '<br><br>',
    },
    {
      key: 'Domain',
      type: 'select',
      wrappers:[PanelFieldWrapper],
      props: {
        label: 'Domain',
        placeholder:'__Select__',
        required:true,
        options: [
          { label: 'BFS', value: 'BFS' },
          { label: '.Net', value: '.Net' },
          { label: 'LAMP', value: 'LAMP' },
          { label: 'Java', value: 'Java' },
          { label: 'Python', value: 'Python' },
        ],
      },
    },
    {
      template: '<br><br>',
    },
    {
      key: 'check',
      type: 'checkbox',
      props: {
        label: 'Hereby,I agree the above information id true',
        required:true
      },
    },
    {
      template: '<br><br>',
    },
    {
      key: 'confirm',
      type: 'input',
      wrappers:[PanelFieldWrapper],
      props: {
        label: 'Confirmation',
        placeholder:'Type Yes if True'
      },
      // hide:true
      expressions: {
        hide:'!model.check'//hide that field
      }
    },
    {
      template: '<br><br>',
    },
    {
      key: 'otp',
      type: 'input',
      wrappers:[PanelFieldWrapper],
      props: {
        label: 'OTP',
        placeholder:'Type otp'
      },
      // hide:true
      expressions: {
        hide: (field: FormlyFieldConfig) => {
          return !(field.model?.confirm === "Yes" && field.model.check);
        },
      }
    },
    {
      template: '<br><hr><br>',
    },
  ];
  onSubmit({ valid, value }: any) {
    if (valid) {
      console.log(value);
    }
    else {
      alert("Enter required field values")
    }
  }
  toggle(){
    this.fields[0].hide = !this.fields[0].hide;
  }
  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
