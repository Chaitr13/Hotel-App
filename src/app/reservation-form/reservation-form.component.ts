import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });
    //to load reservation for editing.
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id: ' + id);
    if (id) {
      let reservation = this.reservationService.getReservation(id);
      console.log(reservation);
      if (reservation) {
        console.log(reservation);
        this.reservationForm.patchValue(reservation);
      }
    }
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      console.log('id: ' + id);
      if (id) {
        //Update
        this.reservationService.updateReservation(id, reservation);
      } else {
        //Create
        this.reservationService.addReservation(reservation);
      }
      this.router.navigate(['/list']);
    }
  }
}
