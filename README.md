# Catálogo de Cursos

Aplicación móvil educativa desarrollada con **React Native + Expo + JavaScript/JSX** para el I Examen Parcial de Desarrollo de Apps Multidispositivo I.

## Funcionalidades

- Catálogo local de cuatro cursos usando `FlatList`.
- Navegación entre Inicio y Detalle con React Navigation Stack.
- Formulario con `TextInput`, `useState` y `Switch`.
- Validación de nombre, correo (comprobación básica del carácter `@`) y aceptación de condiciones.
- Confirmación mediante `Alert`. El registro es simulado; no usa servidor ni base de datos.

## Cursos incluidos

1. React Native — 20 horas.
2. Diseño Web — 18 horas.
3. Ofimática — 16 horas.
4. Marketing Digital — 12 horas.

## Requisitos

- Node.js instalado.
- Expo Go en el teléfono.
- Conexión a la misma red Wi-Fi para la forma de inicio local, o usar el modo túnel.

## Instalación y ejecución

Abre una terminal dentro de la carpeta del proyecto y ejecuta:

```bash
npm install
npx expo install --fix
npx expo start
```

Si el teléfono no logra conectarse por la red local:

```bash
npx expo start --tunnel
```

Escanea el código QR con Expo Go. Si Expo indica incompatibilidad de SDK, sigue las versiones que recomiende `npx expo install --fix` para la versión de Expo instalada.

## Subir a GitHub

1. Crea un repositorio vacío en https://github.com/new llamado `catalogo-de-cursos`. No agregues README, licencia ni `.gitignore` desde GitHub porque ya vienen en este proyecto.
2. En una terminal abierta en esta carpeta, ejecuta:

```bash
git init
git add .
git commit -m "Crear app móvil Catálogo de Cursos"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/catalogo-de-cursos.git
git push -u origin main
```

3. Cambia `TU-USUARIO` por tu usuario real de GitHub. Si Git solicita autenticación, sigue el inicio de sesión que te presente GitHub.

## Pruebas para la demostración

- Tocar cada curso y comprobar que el detalle muestra los datos correctos.
- Confirmar con el nombre vacío: debe aparecer un aviso.
- Confirmar con un correo sin `@`: debe aparecer un aviso.
- Dejar el interruptor desactivado: no debe mostrar confirmación exitosa.
- Completar nombre y correo, activar el interruptor y confirmar: aparece el nombre y el curso seleccionado.

## Archivos principales

- `App.js`: catálogo, navegación, formulario, validaciones y estilos.
- `app.json`: configuración de Expo.
- `package.json`: dependencias y comandos.
