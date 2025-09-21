import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TripService, Trip } from '../services/trip-service';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'; // for creating custom validator
import { CommonModule } from '@angular/common';

// custom validator for arrivalDate < departureDate
export const dateRangeValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const arrival = group.get('arrivalDate')?.value;
  const departure = group.get('departureDate')?.value;

  if (arrival && departure && new Date(departure) < new Date(arrival)) {
    return { dateRangeInvalid: true };
  }
  return null;
};

@Component({
  selector: 'app-new-trip-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-trip-component.html',
  styleUrl: './new-trip-component.css',
})
export class NewTripComponent implements OnInit {
  tripForm: FormGroup = new FormGroup({});
  router: any;
  tripTypeControl: FormControl = new FormControl('');
  tripService: any;
  arrivalMinDate!: string;
  departureMinDate!: string;

  constructor(private formBuilder: FormBuilder, router: Router, tripService: TripService) {
    // valueChanges observable of form control subscribed to whenever the value of dropdown changes
    this.tripTypeControl.valueChanges.subscribe((value) => {
      console.log('trip type:', value);
    });
  }

  ngOnInit(): void {
    // set the arrival date so that the earliest it can be is today
    this.arrivalMinDate = new Date().toISOString().split('T')[0];

    this.tripForm = this.formBuilder.group(
      {
        tripName: ['', Validators.required],
        tripType: [''],
        destination: ['', Validators.required],
        arrivalDate: [''],
        departureDate: [''],
        accommodation: this.formBuilder.group({
          name: [''],
          link: [''],
          parking: [false],
        }),
      },
      { validators: dateRangeValidator }
    );

    // date for departure can't be selected if it's before arrival
    this.tripForm.get('arrivalDate')?.valueChanges.subscribe((arrival: string) => {
      this.departureMinDate = arrival || this.arrivalMinDate;
    });
  }
  onSubmit(): void {
    if (this.tripForm.valid) {
      const tripData: Trip = this.tripForm.value;

      this.tripService.createTrip(tripData).subscribe({
        next: (savedTrip: Trip) => {
          console.log('Trip saved: ', savedTrip);
          this.router.navigate(['/list']); // whenever the form is submited, the user will be redirected to the list
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error saving trip: ', err);
        },
      });
    } else {
      console.warn('Form invalid, cannot submit');
    }
  }
}
