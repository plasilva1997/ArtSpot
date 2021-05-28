import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ListService} from '../../services/list.service';
import {ListModel} from '../../models/list.model';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  private placeForm: FormGroup;
  private nativePicture: string;


  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public listService: ListService
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.placeForm = this.formBuilder.group({
      name: [''],
      adresse: [''],
      image: [''],
      nativeImage: [''],
      note: [''],
    }, {
      validator: this.validateImage('image', 'nativeImage'),
    });
  }

  save() {
    if (!this.placeForm.valid) {
      return;
    }

    const values = this.placeForm.value;
    let image = this.nativePicture ? this.nativePicture : values['image'];


    const place = new ListModel(
      values['name'],
      values['note'],
      image,
      values['adresse'],
      new Date()
    );

    this.listService.add(place).subscribe((places) => {
      this.router.navigate(['/home']);
    });
  }

  getForm() {
    return this.placeForm.controls;
  }

  validateImage(form: string, native: string) {
    return (formGroup: FormGroup) => {
      let image = formGroup.controls[form];
      let nativeImage = formGroup.controls[native];

      if (nativeImage.value) {
        return image.setErrors(null);
      }

      let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
      if (image.value && regex.test(image.value)) {
        return image.setErrors(null);
      }

      return image.setErrors({noImage: true});
    };
  }
}
