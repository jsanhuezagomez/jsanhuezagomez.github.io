---
title: "¿Vale la pena cambiarse de AFP?"
description: "Cómo se calcula patrimonio final, comisiones y diferencia invertida."
pubDate: 2026-03-06
category: "calculadoras"
tags: ["afp", "comisiones", "finanzas"]
draft: false
---

Últimamente me han llamado para ofrecerme un cambio de AFP para volver a mi AFP antigua. Esto es un cambio deliberado que hice después de darle quizás más tiempo y energía del que debería a esa decisión. Por lo tanto permíteme ahorrarte las próximas 30 calorías y decirte porqué deberías o no cambiarte de AFP.

Primero veamos si vale la pena poner plata en las AFPs:

## Rentabilidad base de las AFP

Si bien las AFPs como ahorro obligatorio permiten tener ahorros garantizados al momento de jubilarse y la rentabilidad es buena comparado con algunas de las herramientas financieras disponibles en el mercado chileno, la verdad, es que si lo comparamos con el S&P500, la rentabilidad es, honestamente, mediocre.

Como comparación este es el Fondo A (el más riesgoso y el que más paga) con un promedio anual de rentabilidad entre el 2002 y el 2026 del 5.83% en el mejor de los casos ([link](https://www.spensiones.cl/portal/institucional/597/w3-article-15807.html))
![Rentabilidad de AFPs 2002-2026](/githubWebsite/images/rentabilidad_fondo_a.png)

Al momento de escribir este artículo, PlanVital era la AFP con mayor rentabilidad real en los últimos 5 años, con una rentabilidad promedio anual de 3.03%
![Rentabilidad de AFPs últimos 5 años](/githubWebsite/images/rentabilidad_fondo_a_planvital.png)

Los últimos 5 años se pueden ver en [Superintendencia de Pensiones](https://www.spensiones.cl/infoydec)

![Rentabilidad de todos los fondos A últimos 5 años](/githubWebsite/images/rentabilidad_fondo_a_todos_5.png)

En comparación, el ETF IVV que replica el S&P500 rentó un promedio anual real de 8.84% en el periodo 2002-2026, mientras que en los últimos 5 años rindió un promedio de 10.06% real ([link](totalrealreturns.com/s/IVV?start=2021-01-31&end=2026-01-31))

![Rentabilidad de IVV 2002-2026](/githubWebsite/images/rentabilidad_ivv_periodoafp.png)
![Rentabilidad de IVV últimos 5 años](/githubWebsite/images/rentabilidad_ivv_5.png)

Visto de esta forma, en términos de hacer crecer el patrimonio, la opción dominante siempre debería ser evitar la AFP y colocar los ahorros en inversiones más valiosas

## Cotización obligatoria y comisiones

El dinero que va a las AFPs viene de tu sueldo bruto, del cual se descuenta un 10%. Si tu sueldo es mayor al máximo imponible de 90 UFs (más de 3.5 millones), entonces, será el 10% de esas 90 UFs. Además, de tu sueldo bruto se paga una comisión que es variable y depende de la AFP que elijas, que va desde el 0.46% a 1.45% de tu sueldo bruto **total**.

Por ejemplo si tu sueldo es de 1.000.000, ahorrarías 100.000 pesos al mes en la AFP y, además, estarás pagando 4.600 de comisión mensual si estuvieras en AFP UNO (la AFP con la comisión más barata a la fecha) y 14.500 si estuvieras en Provida (la AFP con comisión más cara). Si lo miras de forma anual, la diferencia entre AFP UNO y Provida es de 118.800 CLP extra que estás pagando.

## Rentabilidades y rentabilidades

Como se puede ver en la primera imagen del artículo, la rentabilidad depende de la AFP en cuestión, pero que en el periodo 2002-2026 son de menos de 0.35% entre la AFP más rentable y la menos. Si lo vemos en los últimos 5 años en [Superintendencia de Pensiones](https://www.spensiones.cl/infoydec), vemos que la diferencia es de 0.56%. 

La pregunta entonces que cabe hacerse es, ¿Vale la pena cambiarse de AFP cuando mi rentabilidad y mis comisiones cambian? Hagamos el ejercicio a 5 años, y veamos si el patrimonio acumulado gracias al cambio en rentabilidad vale el cambio en comisiones.

## Calculadora de cambio

Con esto en mente se construyó una calculadora para ver si vale la pena el cambio. Los supuestos son los siguientes:
- Horizonte de 5 años
- El sueldo de la persona se mantiene estable, en un monto real, durante esos 5 años
- La diferencia entre la comisión más cara y la más barata se ahorra en un fondo alternativo con una rentabilidad diferente a la de las AFP (porque estamos claros en que ahorrar mal es mejor que no ahorrar)

Luego de 5 años se compara cual de las dos tiene mayor patrimonio acumulado. Se suma los depositos de sueldo, más la rentabilidad de la AFP, menos las comisiones y más la diferencia de comisión que se va a un fondo alternativo.

## Ejemplo

Usando los datos de 2002-2026, una persona mayor con:
- Un sueldo bruto de 1.200.000.
- 80.000.000 pesos ahorrados en la AFP.
- Se quiere cambiar de Fondo A:
    - En Habitat (comisión de 1.27% y rentabilidad de 5.83%).
    - A Planvital (comisión de 1.16% y rentabilidad de 5.48%).
- Invierte la diferencia afuera al 5%.

![Calculadora ejemplo 1](/githubWebsite/images/calculadora1.png)

Le sale más a cuenta quedarse en la AFP actual.

Usando los datos de los últimos 5 años, un adulto joven, senior en IT con un muy buen sueldo piensa en cambiarse:
- Sueldo bruto igual al maximo imponible de 3.577.178
- 15.000.000 de pesos ahorrados en la AFP
- Se quiere cambiar de Fondo A:
    - En Planvital (comisión del 1.16%, rentabilidad del 3.04%)
    - A UNO (comisión del 0.46%, rentabilidad del 2.48%)
- Invierte la diferencia en IVV al 10%

![Calculadora ejemplo 2](/githubWebsite/images/calculadora2.png)

Le sale más a cuenta cambiarse de AFP.

La calculadora se encuentra en el siguiente link:

[Calculadora "¿Vale la pena cambiarse de AFP?"](/githubWebsite/herramientas/calculadora-afp/index.html)


