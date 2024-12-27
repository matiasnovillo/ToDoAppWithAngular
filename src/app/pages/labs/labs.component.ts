import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})

export class LabsComponent {
  welcome = 'Hola desde el .ts';

  tasks = [
    "Instalar Angular CLI",
    "Mapear objetos entre el .ts y el .html",
    "Seguir con el TODOAPP"
  ]

  private name = "Matias";

  disabled = true;

  img = "https://w3schools.com/howto/img_avatar.png";

  person = signal({
    name: "Roco",
    age: 18,
    avatar: "https://w3schools.com/howto/img_avatar.png"
  })

  clickHandler() {
    alert("Hola")
  }

  changeHandler(event: Event) {
    console.log(event);
  }

  keyHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    alert(input.value);
  }

  nameForSignal = signal("Nicolas")

  changeHandlerForSignal(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.nameForSignal.set(newValue)
  }

  tasksForSignal = signal([
    "Instalar Angular CLI",
    "Mapear objetos entre el .ts y el .html",
    "Seguir con el TODOAPP"
  ]);

  changeHandler2(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue, 10)
      }
    })
  }

  colorCtrl = new FormControl();

  //Leer el valor del color desde la logica
  constructor() {
    this.colorCtrl.valueChanges.subscribe(value =>
      console.log(value)
    );
  }

  widthCtrl = new FormControl(50, {
    nonNullable: true
  });

  nameCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });
}
