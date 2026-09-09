# CalcAIEP

Calculadora web (HTML, CSS y JavaScript) para las prácticas de **Aseguramiento de la Calidad** del curso.

La aplicación cubre las cuatro operaciones básicas (`+ − × ÷`), historial, atajos de teclado y tema claro/oscuro. Debe usarse como un producto entregado por “otro equipo”: ustedes no corrigen el código salvo que la actividad lo pida; primero **encuentran, documentan y priorizan** defectos.

## Cómo abrirla

1. Clona o descarga este repositorio.
2. Abre `index.html` en el navegador, o sírvelo con Live Server / `npx serve`.
3. Lee la ayuda de la propia calculadora (botón **?**). Ese texto es la especificación funcional de referencia.

No se requiere build ni dependencias.

## Qué incluye el producto

- Suma, resta, multiplicación y división
- Historial reutilizable y persistente
- Teclado físico
- Tema claro/oscuro y ajuste de decimales

## Actividades de QA

Las consignas están en [`docs/actividades-qa.md`](docs/actividades-qa.md).  
La plantilla de incidencia está en [`docs/plantilla-incidencia.md`](docs/plantilla-incidencia.md).



## Estructura

```
index.html
css/styles.css
js/calculator.js
js/history.js
js/ui.js
docs/
```

## Nota para docentes

Antes de compartir el repositorio con el curso, elimina la carpeta `docente/` (contiene el catálogo de defectos intencionales).
