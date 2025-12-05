import { Component, computed, input, resource } from '@angular/core';

/**
 * DEMO 2: Resource API
 * 
 * Este componente demuestra la nueva API de recursos de Angular 21:
 * - resource() para gestión de estado asíncrono
 * - Manejo automático de loading, error y cancelación
 * - Sin subscriptions manuales, sin memory leaks
 */

interface UserData {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
  // Signal Input: El ID del usuario a cargar
  userId = input.required<number>();

  // ✅ ANGULAR 21: Resource API
  // Maneja loading, error, y cancelación automáticamente
  // 'params' declara las dependencias reactivas - cuando cambien, el loader se re-ejecuta
  userProfile = resource({
    params: () => ({ id: this.userId() }),
    loader: async ({ params }) => {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
      
      if (!response.ok) {
        throw new Error(`Error al cargar usuario: ${response.status}`);
      }
      
      return response.json() as Promise<UserData>;
    }
  });

  // Computed signals para acceso seguro a los datos
  userName = computed(() => this.userProfile.value()?.name ?? '');
  userEmail = computed(() => this.userProfile.value()?.email ?? '');
  userCompany = computed(() => this.userProfile.value()?.company?.name ?? '');
}
