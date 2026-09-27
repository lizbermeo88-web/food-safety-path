# Corregir recuperación de contraseña

## Cambios
- Centralizar la URL de recuperación para que siempre use el origen actual y termine exactamente en `/reset-password`.
- Reforzar el listener global para guardar la sesión temporal y, ante `PASSWORD_RECOVERY`, abrir inmediatamente `/reset-password`.
- Ajustar la pantalla de nueva contraseña para esperar correctamente la sesión de recuperación antes de validar el enlace y mantener la actualización segura.
- Comprobar el flujo visible, los errores del navegador y la compilación sin tocar los archivos excluidos.

## Detalles técnicos
- Los cambios se limitarán a `src/routes/acceso.tsx`, `src/hooks/useAuth.tsx` y `src/routes/reset-password.tsx`.
- Se conservará `supabase.auth.updateUser({ password })` y se evitarán redirecciones duplicadas.
