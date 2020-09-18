import { Component, OnInit } from '@angular/core';

// Ejemplo tomado de material (ahi se le dice Tile (baldosa) a la interface)

//Falta ver si empatamos, q no quede con un loop infinito

export interface CuadradoGrilla {
    color: string;
    columnas: number;
    filas: number;
    texto: string;
}

@Component({
    selector: 'app-tateti',
    templateUrl: './tateti.component.html',
    styleUrls: ['./tateti.component.scss']
})
export class TatetiComponent implements OnInit {
    ngOnInit(): void {
    }
}
