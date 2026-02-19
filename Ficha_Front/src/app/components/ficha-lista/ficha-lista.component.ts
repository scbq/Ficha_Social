import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaService } from '../../services/ficha.service';
import { FichaSocial } from '../../models/ficha.model';

@Component({
  selector: 'app-ficha-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ficha-lista.component.html',
  styleUrls: ['./ficha-lista.component.scss']
})
export class FichaListaComponent implements OnInit {
  fichas: FichaSocial[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private fichaService: FichaService) { }

  ngOnInit(): void {
    this.cargarFichas();
  }

  cargarFichas(): void {
    this.fichaService.getFichas().subscribe({
      next: (data) => {
        this.fichas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo conectar con el servidor';
        this.loading = false;
        console.error(err);
      }
    });
  }
}