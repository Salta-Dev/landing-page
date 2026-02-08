# SaltaDev - Landing Page

![SaltaDev Logo](/assets/img/logo-text.webp)

Sitio web oficial de la comunidad SaltaDev. Construido con Jekyll, Tailwind CDN y componentes reutilizables.

## Caracteristicas

- Diseno responsive para mobile y desktop.
- Landing con animaciones GSAP y scroll suave.
- Eventos dinamicos con countdown.
- Staff y colaboradores desde colecciones Jekyll.
- SEO completo (Open Graph, Twitter cards, canonical, robots, sitemap).

## Tecnologias

- Jekyll (GitHub Pages)
- Tailwind CSS via CDN
- GSAP 3.12.7 (animaciones)
- Liquid (templates)

## Estructura del proyecto

```
├── _confidents/          # Colaboradores
├── _events/              # Eventos
├── _includes/            # Componentes reutilizables (nav/footer/etc.)
├── _staff/               # Staff
├── assets/
│   ├── css/              # CSS por pagina
│   │   ├── index.css
│   │   ├── events.css
│   │   └── reglamento.css
│   ├── img/              # Imagenes
│   └── js/               # JS por pagina
│       ├── index.js
│       ├── events.js
│       └── reglamento.js
├── index.html
├── events.html
├── reglamento.html
├── _config.yml
└── robots.txt
```

## Desarrollo local

### Prerrequisitos

- Ruby 2.7+ y Bundler

### Pasos

1. Clonar el repo
   ```bash
   git clone https://github.com/Salta-Dev/landing-page.git
   cd landing-page
   ```

2. Instalar dependencias
   ```bash
   bundle install
   ```

3. Levantar el servidor
   ```bash
   bundle exec jekyll serve --livereload --config _config.yml
   ```

4. Abrir `http://localhost:4000`

### VS Code

Usa la task: "Jekyll GitHub Pages Server".

## Troubleshooting

- Si cambias `_config.yml`, reinicia el servidor de Jekyll.
- Si falla `bundle exec jekyll serve` en Windows, verifica Ruby/Bundler y vuelve a ejecutar `bundle install`.
- Si ves contenido viejo, borra `_site/` y vuelve a correr `bundle exec jekyll serve`.
- Si no aparece `sitemap.xml`, asegurate de tener `jekyll-sitemap` en el `Gemfile` y reinicia Jekyll.

## Gestion de contenido

### Eventos

Crear un archivo en `_events/` con formato `dd_mm_yyyy_00.md`.

Ejemplo:
```yaml
---
title: "Nombre del Evento"
description: "Descripcion del evento"
location: "Lugar"
photo: "/assets/img/events/evento.jpg"
link: "https://enlace-al-evento.com"
date: 2025-12-15 19:00:00 -0300
event_start_date: "15_12_2025:19_00_00"
event_end_date: "15_12_2025:22_00_00"
event_date_parsed: "15/12/2025"
event_hours_parsed: "19:00 - 22:00"
---
```

### Staff

Crear un archivo en `_staff/` con formato `nombre_apellido.md`:

```yaml
---
name: "Nombre Completo"
role: "Cargo"
description: "Descripcion"
photo: "/assets/img/staff/nombre_apellido.jpg"
linkedin: "https://linkedin.com/in/usuario"
github: "https://github.com/usuario"
twitter: "https://twitter.com/usuario"
---
```

### Colaboradores

Crear un archivo en `_confidents/` con formato `nombre.md`:

```yaml
---
name: "Nombre de la empresa"
description: "Descripcion"
customURL: "https://empresa.com"
icon: "/assets/img/partners/logo.png"
---
```

## SEO

- Metas Open Graph y Twitter en cada pagina.
- `robots.txt` y `sitemap.xml` generados por Jekyll.

## Despliegue

- GitHub Pages con push a `main`.
- Build manual: `bundle exec jekyll build`.

## Licencia

GPL-3.0. Ver [LICENSE](LICENSE).
