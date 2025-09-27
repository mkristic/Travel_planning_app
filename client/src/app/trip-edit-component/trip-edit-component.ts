import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms'; // for creating custom validator
import { ActivatedRoute, Router } from '@angular/router';
import { TripService, Trip } from '../services/trip-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  selector: 'app-trip-edit',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './trip-edit-component.html',
  styleUrls: ['./trip-edit-component.css'],
})
export class TripEditComponent implements OnInit {
  tripForm: FormGroup = new FormGroup({});
  arrivalMinDate!: string;
  departureMinDate!: string;
  tripId!: string;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // set the arrival date so that the earliest it can be is today
    this.arrivalMinDate = new Date().toISOString().split('T')[0];
    this.tripId = this.route.snapshot.paramMap.get('id') || '';

    this.tripForm = this.fb.group(
      {
        tripName: ['', Validators.required],
        tripType: [''],
        destination: ['', Validators.required],
        arrivalDate: [''],
        departureDate: [''],
        accommodation: this.fb.group({
          name: [''],
          link: [''],
          parking: [false],
        }),
      },
      { validators: dateRangeValidator }
    );

    // fetch trip with existing data
    if (this.tripId) {
      this.tripService.getTrip(this.tripId).subscribe({
        next: (trip) => {
          this.tripForm.patchValue(trip); // update
        },
        error: (err: HttpErrorResponse) => console.error('Error fetching trip:', err),
      });
    }

    // date for departure can't be selected if it's before arrival
    this.tripForm.get('arrivalDate')?.valueChanges.subscribe((arrival: string) => {
      this.departureMinDate = arrival || this.arrivalMinDate;
    });
  }

  onSubmit(): void {
    if (this.tripForm.valid && this.tripId) {
      const updatedTrip: Trip = this.tripForm.value;
      this.tripService.updateTrip(this.tripId, updatedTrip).subscribe({
        next: (trip) => {
          console.log('Trip updated:', trip);
          this.router.navigate(['/trips', this.tripId]);
        },
        error: (err: HttpErrorResponse) => console.error('Error updating trip:', err),
      });
    } else {
      console.warn('Form invalid, cannot submit');
    }
  }
}
