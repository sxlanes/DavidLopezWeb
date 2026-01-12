# Sitio Web David López

Este proyecto ha sido generado utilizando React, Vite y Tailwind CSS, basado en el estilo solicitado y con el contenido extraído del archivo XML de WordPress.

## Estructura

- **src/pages**: Contiene las páginas principales (Inicio, Artículos, Cursos, Libros, Sobre Mí, Newsletter).
- **src/components**: Componentes reutilizables (Navegación, Hero, etc.).
- **src/data**: Contiene los datos extraídos (`posts.json`, etc.).
- **src/App.tsx**: Configuración de rutas.

## Instrucciones

1.  **Instalar dependencias** (ya realizado):
    ```bash
    npm install
    ```

2.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Esto abrirá el sitio en `http://localhost:5173`.

3.  **Construir para producción**:
    ```bash
    npm run build
    ```

## Notas
- Los artículos se cargan desde `src/data/posts.json`.
- Los cursos y libros tienen datos de ejemplo que puedes editar en `src/pages/Courses.tsx` y `src/pages/Books.tsx`.
