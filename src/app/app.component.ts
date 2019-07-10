import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recetas Ricas 8';
  page : string = 'receta';
  OnPageChanged($data : string) {
    this.page = $data;
    console.log($data);
  }
}
