# Instrucciones para subir a GitHub Pages

## 1. Crear repositorio en GitHub
- Ve a https://github.com/new
- Nombre: `xv` (o el que prefieras)
- Público (necesario para GitHub Pages)
- NO marques ninguna opción de inicialización
- Clic en "Create repository"

## 2. Conectar y subir el código
Ejecuta estos comandos (reemplaza TU-USUARIO con tu usuario de GitHub):

```bash
cd "c:\Users\Valentin Colli\Desktop\xv"
git remote add origin https://github.com/TU-USUARIO/xv.git
git branch -M main
git push -u origin main
```

## 3. Activar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Clic en "Settings" (Configuración)
3. En el menú lateral, clic en "Pages"
4. En "Source", selecciona la rama "main"
5. Clic en "Save"
6. Tu sitio estará disponible en: https://TU-USUARIO.github.io/xv/

## Nota importante sobre el archivo de música
El archivo MP3 es muy grande (puede ser >50MB). GitHub tiene un límite de 100MB por archivo.
Si el archivo es muy grande, considera:
- Usar un servicio externo para el audio (SoundCloud, etc.)
- Comprimir el archivo
- Usar un formato más pequeño
