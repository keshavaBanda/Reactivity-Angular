import { Component, Signal, signal, computed, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pratice',
  imports: [],
  templateUrl: './pratice.html',
  styleUrl: './pratice.scss'
})
export class Pratice {

  cdr = inject(ChangeDetectorRef)

  firstName = "Tagore";
  lastName = "Banda";
  fullName = () => {
    console.log("I am ananomous function")
    return this.firstName + " " + this.lastName;
  };

  firstName1 = signal("Tagore");
  lastName1 = signal("Banda");
  fullName1 = computed(() => {
    console.log("I am computed");
    return this.firstName1() + " " + this.lastName1()
  })



  ngOnInit() {
    this.firstName = "Jithedra";
    this.firstName1.set("****");
  }

  changeName() {
    this.firstName = "Chandra";
    this.firstName1.set("Chandra");
    console.log(this.fullName1());
    console.log("Testing..", this.fullName())
  }

  


}
