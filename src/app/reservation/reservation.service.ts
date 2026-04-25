import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  //CRUD Operations
  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservtion(id: number): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
    console.log(this.reservations);
  }

  deleteReservation(id: number): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    (this, this.reservations.splice(index, 1));
  }

  updateReservation(updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(
      (res) => res.id === updatedReservation.id,
    );
    this.reservations[index] = updatedReservation;
  }
}
