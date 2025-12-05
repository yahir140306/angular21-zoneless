import { Component, signal } from '@angular/core';
import { UserAvatar } from '../../components/user-avatar/user-avatar';
import { UserProfile } from '../../components/user-profile/user-profile';
import { QuantitySelector } from '../../components/quantity-selector/quantity-selector';

/**
 * DEMO PAGE: Angular 21 Zoneless Features
 * 
 * Esta página demuestra los 3 patrones principales del script:
 * 1. Signal Inputs + Computed (UserAvatar)
 * 2. Resource API (UserProfile)
 * 3. Linked Signals (QuantitySelector)
 */
@Component({
  selector: 'app-demo',
  imports: [UserAvatar, UserProfile, QuantitySelector],
  templateUrl: './demo.html',
  styleUrl: './demo.scss',
})
export class Demo {
  // Signal para controlar el userId (simula selección de usuario)
  currentUserId = signal('user-123');
  currentUserIdNum = signal(1);
  
  // Signal para la cantidad inicial del selector
  initialQuantity = signal(5);
  
  // Trigger para forzar reset del linkedSignal
  resetTrigger = signal(0);

  // Métodos para la demo interactiva
  changeUser() {
    const users = ['user-123', 'user-456', 'user-789', 'alan', 'angular'];
    const current = this.currentUserId();
    const currentIndex = users.indexOf(current);
    const nextIndex = (currentIndex + 1) % users.length;
    this.currentUserId.set(users[nextIndex]);
  }

  changeUserProfile() {
    const nextId = (this.currentUserIdNum() % 10) + 1;
    this.currentUserIdNum.set(nextId);
  }

  resetQuantity() {
    // Incrementar el trigger fuerza al linkedSignal a re-evaluar
    // incluso si initialQuantity ya tiene el mismo valor
    this.initialQuantity.set(1);
    this.resetTrigger.update(t => t + 1);
  }

  onQuantityChange(newQty: number) {
    console.log('Cantidad actualizada:', newQty);
  }
}
