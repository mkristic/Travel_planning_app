import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-trip-component',
  imports: [ReactiveFormsModule],
  templateUrl: './new-trip-component.html',
  styleUrl: './new-trip-component.css',
})
export class NewTripComponent {
  tripForm: FormGroup = new FormGroup({});
  router: any;

  constructor(private formBuilder: FormBuilder, router: Router) {}

  ngOnInit(): void {
    this.tripForm = this.formBuilder.group({
      tripName: ['', Validators.required],
      tripType: this.formBuilder.group({
        solo: [false],
        family: [false],
        friends: [false],
        business: [false],
      }),
      destination: [''],
      arrivalDate: [''],
      departureDate: [''],
      accommodation: this.formBuilder.group({
        name: [''],
        parking: [false],
      }),
    });
  }
  onSubmit() {
    //if (this.tripForm.valid)

    // whenever the form is submited, the user will be redirected to the list
    this.router.navigate(['/list']);
  }
}
