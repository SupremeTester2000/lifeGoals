import { Component, OnInit } from '@angular/core';
import { MetaServiceService } from '../services/meta-service.service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  metas: Meta[] = [];
  newMeta: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  editingId: string | null = null;
  editText: string = '';

  constructor(private metaService: MetaServiceService) { }

  ngOnInit(): void {
    this.loadMetas();
  }

  loadMetas(): void {
    this.loading = true;
    this.metaService.getMetas().subscribe({
      next: (metas) => {
        this.metas = metas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading metas:', err);
        this.errorMessage = 'Error al cargar las metas';
        this.loading = false;
      }
    });
  }

  addMeta(): void {
    if (!this.newMeta.trim()) {
      this.errorMessage = 'Por favor ingresa una meta';
      return;
    }

    this.loading = true;
    this.metaService.addMeta(this.newMeta).subscribe({
      next: (id) => {
        console.log('Meta added with ID:', id);
        this.newMeta = '';
        this.errorMessage = '';
        this.loadMetas();
      },
      error: (err) => {
        console.error('Error adding meta:', err);
        this.errorMessage = 'Error al agregar la meta';
        this.loading = false;
      }
    });
  }

  deleteMeta(id: string | undefined): void {
    if (!id) return;
    
    if (confirm('¿Estás seguro de que deseas eliminar esta meta?')) {
      this.metaService.deleteMeta(id).subscribe({
        next: () => {
          this.loadMetas();
        },
        error: (err) => {
          console.error('Error deleting meta:', err);
          this.errorMessage = 'Error al eliminar la meta';
        }
      });
    }
  }

  startEdit(meta: Meta): void {
    this.editingId = meta.id || null;
    this.editText = meta.meta;
  }

  saveEdit(): void {
    if (!this.editingId || !this.editText.trim()) {
      this.errorMessage = 'Por favor ingresa un texto válido';
      return;
    }

    this.loading = true;
    this.metaService.updateMeta(this.editingId, this.editText).subscribe({
      next: () => {
        this.loadMetas();
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Error updating meta:', err);
        this.errorMessage = 'Error al actualizar la meta';
        this.loading = false;
      }
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editText = '';
    this.errorMessage = '';
  }
}
