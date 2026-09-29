# Profesionalizar navegación, inscripción y certificado

## Cambios
- Ajustar la navegación inferior de cada apartado: botones “← Anterior” y “Siguiente →” a ancho completo en móvil; el último apartado llevará al examen.
- Retirar de todas las pantallas los tiempos estimados de los módulos, sin modificar el temario ni las preguntas.
- Añadir “DNI / NIE” obligatorio al registro, validarlo y guardarlo como `dni` en los datos de la cuenta.
- Recuperar ese documento desde la cuenta y mostrarlo debajo del nombre en el certificado.
- Añadir al diploma un bloque visual de verificación QR vinculado al código de registro.

## Comprobación
- Revisar registro, navegación de apartados, paso al examen y certificado en móvil y escritorio.
- Confirmar que no quedan duraciones visibles y que la aplicación compila sin errores.

## Detalles técnicos
- No se cambiará `src/data/course.ts`; se ocultará `duration` únicamente en las vistas.
- El DNI/NIE se almacenará en `user_metadata.dni`, tal como se solicita, sin ampliar tablas.
- Se usará el icono QR ya disponible para evitar dependencias nuevas.
- Los cambios quedarán en la rama conectada; Lovable sincroniza esa rama con GitHub, pero no haré operaciones manuales de Git.
