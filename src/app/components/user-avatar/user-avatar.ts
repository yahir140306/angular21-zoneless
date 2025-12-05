import { Component, computed, input } from '@angular/core';

/**
 * DEMO 1: Signal Inputs + Computed Signals
 * 
 * Este componente demuestra el nuevo estándar de Angular 21:
 * - input() en lugar de @Input()
 * - computed() para derivar valores reactivos
 * - Sin ngOnChanges, sin lifecycle hooks manuales
 */
@Component({
  selector: 'app-user-avatar',
  imports: [],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss',
})
export class UserAvatar {
  // ✅ ANGULAR 21: Signal Input requerido
  // Si no se pasa, Angular lanza error en tiempo de compilación
  userId = input.required<string>();

  // ✅ Signal Input opcional con valor por defecto
  size = input<'sm' | 'md' | 'lg'>('md');

  // ✅ Computed Signal: Se recalcula automáticamente cuando userId cambia
  // Cero side-effects, cero subscripciones manuales
  avatarUrl = computed(() => `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.userId()}`);

  // ✅ Computed para clases CSS dinámicas
  sizeClasses = computed(() => {
    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16'
    };
    return sizes[this.size()];
  });
}
