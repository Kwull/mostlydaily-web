# es adjudicator decisions (website guides)

Adjudicator: Fable, fresh context, 16 Nov 2026. Findings: 17 segments (7 major, 10 minor). Accepted: 16 (15 with the critic's text, 1 with a third text: 3b6ffaf33c). Rejected: 1 (50dff26f05, needs a site change). All 134 drafted segments set to reviewed; `tools/i18n.py check es`: 0 problems.

## 50dff26f05 (with 927428b06f)
- Decision: reject
- Final: `Seguimiento de hábitos sin rachas estrictas · Mostly Daily` (the draft)
- Reason: The title is right and has the search words. The fault is in the site: the guide's H1 shares the id 927428b06f with the reviewed home eyebrow, so it renders "Hábitos diarios sin presión". A reviewed entry does not change, and bending the title to match a wrong H1 makes the title worse. See "Not settled".

## 6a42e82c88
- Decision: accept
- Final: `Pasos, entrenamientos, sueño, agua y anillos, que se marcan solos.`
- Reason: "marcados por ti" says the user does it. "se marcan solos" is the wording of the reviewed pages.

## 311a34cf50
- Decision: accept
- Final: `... Elige una unidad (bebidas, caprichos, minutos o tu propia palabra) ...` (rest unchanged)
- Reason: The app's unit for "treats" is "caprichos".

## 13f3db0404
- Decision: accept
- Final: `... Empezando, A veces, A menudo y Casi siempre. El nivel más alto es Casi siempre y nunca necesitas el 100%. ...` (rest unchanged)
- Reason: es rule: a bare level word as subject reads as a frequency. Same sentence as the reviewed home.

## cf689f7ec7
- Decision: accept
- Final: `... cuesta unos puntos; sigues en el nivel Casi siempre. ...` (rest unchanged)
- Reason: es rule: name the level after a preposition.

## 237af1f5b0
- Decision: accept
- Final: `... Cada semana que termina con el hábito en el nivel A menudo o Casi siempre también te da un día de descanso más, y puedes guardar hasta 4.` (rest unchanged)
- Reason: Same rule, and the reviewed home says "en el nivel A menudo o Casi siempre".

## 1dddcabedf
- Decision: accept
- Final: `... La etiqueta de privacidad de Mostly Daily en el App Store dice Datos no recopilados.` (rest unchanged)
- Reason: The App Store heading in Spain is "Datos no recopilados"; the reader should see the same words on the listing. Not in apple_terms (it has no App Store web strings), so this is from the store page, not from the tool.

## d5ce9953a7, edad9b1640
- Decision: accept (both)
- Final: `Vincula un hábito con Apple Health y Mostly Daily lo marca cuando llegas a tu objetivo del día: ...` (lists unchanged)
- Reason: In Spanish a person reaches a goal, a day does not.

## 524f019e29
- Decision: accept
- Final: `Cómo beber menos, tomar menos azúcar o reducir el tiempo de pantalla`
- Reason: "reducir las bebidas" is a calque. The H1 now matches the page title and has "beber menos" from the keyword field.

## 3b6ffaf33c
- Decision: accept the finding, third text
- Final: `Junto al nivel está la racha sin faltar dos veces seguidas: los días desde la última vez que faltaste dos días seguidos. Con un día sin hacerlo la racha sigue. Dos días seguidos sin hacerlo la terminan, y una nueva empieza con tu siguiente registro. Más sobre esto en <a href="/guides/one-missed-day.html">por qué un día sin hacerlo no rompe un hábito</a>.`
- Reason: "racha" needs its label beside it after three paragraphs about strict streaks. The critic's "una racha distinta" adds a word the English does not have; the app's label "sin faltar dos veces seguidas" does the job, as in the reviewed "Tu racha cuenta los días sin faltar dos veces seguidas". "faltaste dos días seguidos" also drops the unclear "faltaste dos veces".

## 7a7496a6c5
- Decision: accept
- Final: `Por qué un calendario de días en cero funciona mejor que contar los días que llevas sin hacerlo.`
- Reason: "los días que llevas" alone reads as days of doing something.

## 993e0898b8
- Decision: accept
- Final: `Bebidas, azúcar, tiempo de pantalla. Un contador de "días sin" hace que un tropiezo parezca perderlo todo. Un calendario de días en cero cuenta la verdad.`
- Reason: "días sin" is what Spanish apps call this counter.

## cfc0244b7a
- Decision: accept
- Final: `Gratis tiene tres widgets. El widget Hábito muestra un hábito con un anillo para tocar; si eliges un hábito de limitar, tiene un botón cuadrado que registra un día en cero. El widget Siguiente muestra el siguiente hábito pendiente y, cuando todo está hecho, tu mosaico. Hoy, el widget mediano, tiene el anillo del día y tus hábitos del día.`
- Reason: "Hábito es un hábito" and a bare "Siguiente" read like typos; the reviewed pages say "el widget Hoy".

## 04a311a651
- Decision: accept
- Final: `En la pantalla de bloqueo hay un anillo del día redondo con cuántos hábitos llevas hechos de los que tocan hoy, ...` (rest unchanged)
- Reason: The draft was hard to parse.

## 8bec169450
- Decision: accept
- Final: `Nada en la app se conecta a un servidor`
- Reason: An app connects to a server in Spanish; "habla con" is a calque.

## 6a5d9609db
- Decision: accept
- Final: `Si llevas las bebidas en Apple Health, se quedan en Apple Health y en tu teléfono, nunca en iCloud. ...` (rest unchanged)
- Reason: The app's switch is "Llevar las bebidas en Apple Health".

## Not settled
- Streaks guide H1 (site work, not a translation fix): `<h1>A habit tracker without streaks</h1>` in guides/habit-tracker-without-streaks.html hashes to the same id as the home #why eyebrow (927428b06f), so the es H1 and the JSON-LD headline render "Hábitos diarios sin presión" while the title says "Seguimiento de hábitos sin rachas estrictas". Recommendation: give the guide's H1 and headline a page-scoped id in tools/i18n.py (or a slightly different English H1) and translate it "Seguimiento de hábitos sin rachas estrictas". The same collision is likely in de, pl, uk and ru.
- "Datos no recopilados" is the label on the Spain storefront; worth one look at the live es listing before publishing.
