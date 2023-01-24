import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  formStep: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  nextStep()
  {
    this.formStep++;
  }

  previousStep()
  {
    this.formStep--;
  }

}
