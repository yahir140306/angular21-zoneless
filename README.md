# Angular 21 Zoneless Demo

> Demostración de las nuevas APIs de Angular 21 con **Zoneless Change Detection**

Este proyecto es un playground para experimentar con las características más importantes de Angular 21, especialmente el modo **zoneless** que elimina Zone.js completamente.

## Features Demostrados

### 1. Signal Inputs + Computed Signals

El componente `UserAvatar` demuestra el nuevo estándar de inputs:

```typescript
// Signal Input requerido
userId = input.required<string>();

// Signal Input opcional con valor por defecto
size = input<'sm' | 'md' | 'lg'>('md');

// Computed Signal: Se recalcula automáticamente
avatarUrl = computed(() => `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.userId()}`);
```

**Beneficios:**
- Sin `ngOnChanges`, sin lifecycle hooks manuales
- Cero subscriptions, cero memory leaks
- Type-safe por defecto

### 2. Resource API

El componente `UserProfile` demuestra la nueva API de recursos para datos asíncronos:

```typescript
userProfile = resource({
  params: () => ({ id: this.userId() }),
  loader: async ({ params }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
    return response.json() as Promise<UserData>;
  }
});
```

**Beneficios:**
- Manejo automático de loading, error y cancelación
- Re-fetch automático cuando cambian las dependencias
- Sin `subscribe()`, sin `takeUntil()`, sin quilombos

### 3. Linked Signals

El componente `QuantitySelector` demuestra `linkedSignal`:

```typescript
// Input desde el padre
initialQty = input<number>(1);
resetTrigger = input<number>(0);

// Linked Signal: Escucha al input pero permite mutación local
quantity = linkedSignal(() => {
  this.resetTrigger(); // Fuerza re-evaluación
  return this.initialQty();
});

increment() {
  this.quantity.update(q => q + 1); // Mutación local sin romper el flujo
}
```

**Beneficios:**
- Estado local derivado de props sin perder reactividad
- Reset automático cuando el padre cambia los inputs
- Patrón perfecto para forms y controles editables

## Zoneless Change Detection

Este proyecto usa `provideZonelessChangeDetection()` en lugar de Zone.js:

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZonelessChangeDetection(), // No más Zone.js
  ],
};
```

**¿Por qué Zoneless?**
- Bundle size más pequeño (~15KB menos)
- Mejor performance (sin monkey-patching de APIs del browser)
- Change detection más predecible y explícito
- Mejor debugging (stack traces limpios)

## Requisitos

- **Node.js** 20+
- **Bun** 1.2+ (package manager)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Alan-TheGentleman/angular21-zoneless.git
cd angular21-zoneless

# Instalar dependencias
bun install
```

## Scripts

```bash
# Development server
bun start

# Build de producción
bun run build

# Ejecutar tests
bun test
```

## Estructura del Proyecto

```
src/app/
├── components/
│   ├── quantity-selector/   # Demo: Linked Signals
│   ├── user-avatar/         # Demo: Signal Inputs + Computed
│   └── user-profile/        # Demo: Resource API
├── pages/
│   └── demo/                # Página de demostración interactiva
├── app.config.ts            # Configuración zoneless
└── app.routes.ts
```

## Stack Técnico

| Tecnología | Versión |
|------------|---------|
| Angular | 21.0.0 |
| TypeScript | 5.9.2 |
| Bun | 1.2.21 |
| Vitest | 4.0.8 |
| SCSS | - |

## Links Útiles

- [Angular 21 Release Notes](https://blog.angular.dev/)
- [Signal Inputs RFC](https://github.com/angular/angular/discussions/49682)
- [Resource API RFC](https://github.com/angular/angular/discussions/58510)
- [Zoneless Change Detection](https://angular.dev/guide/experimental/zoneless)

## Autor

**Alan Buscaglia** - [@AlanThGentleman](https://twitter.com/AlanThGentleman)

---

> *"Angular 21 es el Angular que siempre debió existir. Signals + Zoneless = Frontend sin quilombos."*
