import { Component, input, linkedSignal, output } from '@angular/core';

/**
 * DEMO 3: Linked Signals
 * 
 * Este componente demuestra linkedSignal de Angular 21:
 * - Crea una señal local que "escucha" a un input
 * - Permite mutación local sin romper el flujo de datos
 * - Si el input cambia desde el padre, se resetea automáticamente
 */
@Component({
  selector: 'app-quantity-selector',
  imports: [],
  templateUrl: './quantity-selector.html',
  styleUrl: './quantity-selector.scss',
})
export class QuantitySelector {
  // Input: Cantidad inicial desde el padre
  initialQty = input<number>(1);
  
  // Input: Reset trigger - cambiar este valor fuerza el reset del linkedSignal
  resetTrigger = input<number>(0);
  
  // Input: Límite máximo
  max = input<number>(99);
  
  // Input: Límite mínimo
  min = input<number>(1);

  // Output: Emite cuando la cantidad cambia
  quantityChange = output<number>();

  // ✅ ANGULAR 21: Linked Signal
  // - Inicializa con el valor del input
  // - Permite escritura local (incremento/decremento)
  // - Se resetea cuando initialQty O resetTrigger cambian
  quantity = linkedSignal(() => {
    // Leer resetTrigger fuerza re-evaluación aunque initialQty no cambie
    this.resetTrigger();
    return this.initialQty();
  });

  increment() {
    if (this.quantity() < this.max()) {
      this.quantity.update(q => q + 1);
      this.quantityChange.emit(this.quantity());
    }
  }

  decrement() {
    if (this.quantity() > this.min()) {
      this.quantity.update(q => q - 1);
      this.quantityChange.emit(this.quantity());
    }
  }

  // Entrada manual con validación
  setQuantity(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value, 10);
    
    if (isNaN(value)) value = this.min();
    if (value < this.min()) value = this.min();
    if (value > this.max()) value = this.max();
    
    this.quantity.set(value);
    this.quantityChange.emit(this.quantity());
  }
}
