# Sitio personal (Astro + GitHub Pages)

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publicación

- Este repo incluye workflow en `.github/workflows/deploy.yml`.
- Publica automáticamente al hacer push a `main`.

## Importante

Actualiza `astro.config.mjs` con tu usuario/repositorio final:

- `site: https://TU_USUARIO.github.io`
- `base: /NOMBRE_DEL_REPO`
