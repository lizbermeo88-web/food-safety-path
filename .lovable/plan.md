# Navegación global accesible

## Cambios
- Añadir a la cabecera compartida los botones “← Atrás” y “Adelante →”, disponibles en portada, acceso, módulos, lecciones, examen, certificado y recuperación de contraseña.
- Conectar ambos botones al historial del navegador mediante retroceso y avance.
- Adaptar la cabecera para que los controles sean claros y cómodos en móvil, manteniendo el diseño corporativo existente.
- Eliminar únicamente los controles “Anterior/Siguiente” situados al final de las lecciones para evitar duplicados.

## Comprobación
- Revisar en móvil y escritorio que la cabecera no se solape y que ambos controles respondan al historial.
- Confirmar que siguen presentes el DNI/NIE del registro, la ausencia de duraciones y el bloque QR del certificado.
- Confirmar que todas las pantallas cargan sin errores.

## Detalles técnicos
- El cambio global se concentrará en el componente compartido de cabecera; no se tocará el contenido del curso ni su lógica de progreso.
- Los botones permanecerán visibles aunque no exista historial previo o posterior; en ese caso, la acción no cambiará de pantalla.
- No se modificarán `src/data/course.ts`, `src/styles.css`, `src/routes/__root.tsx` ni `vite.config.ts`.
