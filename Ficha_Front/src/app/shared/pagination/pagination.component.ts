import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';



@Component({
    selector: 'app-pagination',
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
})

export class PaginationComponent {

    @Input() arregloDatos: any[] = [];
    //   public ipp: number = 10;
    nTotalPag: number = 0;
    @Input() p1: number = 1;
    //   @Output() p1Change = new EventEmitter<number>();
    //   constructor(private comSanService: comsanGeneralService) {}
    //   //VARIABLES PARA UTILIZAR UNSUBSCRIBE
    //   private sub: any;

    //   ngOnInit(): void {
    //     this.sub = this.comSanService
    //       .getValuePaginacion()
    //       .subscribe((pagina: any) => {
    //         if (pagina != null) {
    //           this.p1 = pagina.p1;
    //           this.nTotalPag = pagina.nTotalPag;
    //           this.arregloDatos = pagina.arreglos;
    //         }
    //       });
    //   }
    //   ngOnDestroy(): void {
    //     this.sub.unsubscribe(); // IMPORTANTE: limpiar el suscriptor cuando se destruye el componente para no tener memory leaks.  //
    //   }

    //   ngOnChanges(changes: SimpleChanges) {
    //     if (changes.arregloDatos) {
    //     }
    //   }

    pagina_anterior() {
        if (this.p1 > 1) {
            // this.p1Change.emit(this.p1 - 1);
        }
    }

    pagina_siguiente() {
        if (this.p1 < this.nTotalPag) {
            //this.p1Change.emit(this.p1 + 1);
        }
    }

    primera_pagina() {
        //this.p1Change.emit(1);
    }

    ultima_pagina() {
        // this.p1Change.emit(this.nTotalPag);
    }

    ir_primero() {
        //this.p1Change.emit(1);
    }
}
