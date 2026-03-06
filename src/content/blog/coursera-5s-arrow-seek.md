---
title: "Coursera 5s Arrow Seek: cómo lo hice funcionar"
description: "Qué problema resolví, cómo intercepté el teclado y por qué el script corre en capture phase."
pubDate: 2026-03-06
category: "herramientas-ciberseguridad"
tags: ["coursera", "userscript", "tampermonkey", "productividad"]
draft: false
---

Quería una mejora simple: que las flechas izquierda/derecha en Coursera avanzaran **5 segundos** en vez de **10 segundos**.

## Qué problema había

Coursera ya maneja atajos de teclado en su propio reproductor. Si uno solo agrega un `keydown` normal, muchas veces el handler de la plataforma se ejecuta primero y tu lógica no gana prioridad.

## Qué enfoque usé

El script hace tres cosas clave:

1. Escucha `keydown` en **capture phase**.
2. Ignora inputs o campos editables para no romper escritura.
3. Toma el video activo y ajusta `currentTime` en `+5` o `-5`.

## Puntos técnicos importantes

- Uso `@run-at document-start` para enganchar temprano.
- Uso `e.preventDefault()` y `e.stopPropagation()` al detectar `ArrowLeft`/`ArrowRight`.
- Selecciono el video activo (preferentemente el que está reproduciendo).

Con eso se evita el comportamiento default de Coursera para esas teclas y se aplica el salto de 5s de forma consistente.

## Script

Repositorio del script:

[github.com/jsanhuezagomez/coursera-5-sec-skip](https://github.com/jsanhuezagomez/coursera-5-sec-skip)
