# es critic review (website)

Critic: Opus, fresh context, 16 Nov 2026. Inputs: i18n/en.json, i18n/es.json (223 segments, all drafted), glossary, es notes, metadata-es.md.

Mechanical checks, all clean: tag multiset per segment (alt/aria-label values aside), {placeholders}, HTML entities, plural keys (one/other), no em/en dashes, no curly or angle quotes.

App terms checked against the es catalog and apple_terms: level names, Hoy/Repaso/Ajustes, Siguiente, Todo listo, Esta semana, Calendario mensual, Hoy y semana, Quién estás siendo, Hacer menos/Hacer más, Pausar un hábito…, En pausa, Prepara tu espacio, Compañía/Desconectar, Registrar, Marcar, Día en cero, Marcar todo, Cerrar el día de ayer, El día termina a las, Cómo funciona Mostly, Exportar e importar, Eliminar todos los datos, Otros planes, Usar Apple Health, Sincronizar registros con iCloud, Ideas de Apple Health, Ahora no, Cerrar mis anillos, Salir al aire libre, Anotar cómo me siento, anillo Moverse, workout types, demo habit names and identities, En reposo, Centro de control, Pantalla de inicio/de bloqueo, En familia, Añadir widget, Editar widget, Personalizar, Salud > Compartir > Apps, Suscripciones, cuenta de Apple. Theme names are translated in the app (Grafito, Medianoche...), so the draft follows the app. The es do-less name words in the copy (menos, sin, dejar, reducir) match QuickAdd+DoLess.swift.

Search: home title starts with "Mostly Daily: Hábitos amables", meta description and eyebrows carry "registro/seguimiento de hábitos", "hábitos diarios", "widgets de hábitos"; JSON-LD keywords have 8 real phrases. Reads like native Spanish product copy overall.

Counts: 14 findings, 1 major, 13 minor.

## 43ff488ffa (major)
- Back: "Rest, low energy and travel days are not undone days. Finish a week in Often [reads: 'in often'] or Mostly and you earn an extra rest day."
- Problem: level words are adverbs in Spanish; after the preposition "en" bare "A menudo" reads as a frequency ("finish a week often"). es precedent rule level-word-after-preposition-add-nivel: name the level.
- Proposed: "Los días de descanso, de poca energía y de viaje no son días sin hacer. Termina una semana en el nivel A menudo o Casi siempre y ganas un día de descanso extra."

## 02a9c1a6ee (minor)
- Back: "Why almost always" (nav link).
- Problem: "Why Mostly" points at the app's approach; "Por qué Casi siempre" reads as "why almost always" in a menu. The app itself uses "Mostly" as the short brand in "Cómo funciona Mostly".
- Proposed: `<a href="/#why">Por qué Mostly</a><a href="/#widgets">Widgets</a><a href="/#private">Privacidad</a><a href="/#pricing">Precios</a><a href="/guides/">Guías</a><a href="/support.html">Ayuda</a>`

## 19a87c6f18 (minor)
- Same as 02a9c1a6ee (mobile menu).
- Proposed: `<a href="/#why">Por qué Mostly</a><a href="/#widgets">Widgets</a><a href="/#private">Privacidad</a><a href="/#pricing">Precios</a><a href="/#faq">Preguntas</a><a href="/guides/">Guías</a><a href="/support.html">Ayuda</a>`

## f72800165b (minor)
- Back: "More to read: a habit tracker without strict streaks, ..."
- Problem: "Más para leer:" is a calque of "Read more:"; a Spanish site says "Para saber más:" or "Lee también:".
- Proposed: `Lee también: <a href="/guides/habit-tracker-without-streaks.html">un registro de hábitos sin rachas estrictas</a>, <a href="/guides/one-missed-day.html">por qué un día sin hacerlo no rompe un hábito</a>, <a href="/guides/rest-days.html">los días de descanso</a> y <a href="/guides/sick-and-travel-days.html">los días de enfermedad y de viaje</a>.`

## 2a20218d57 (minor)
- Back: "More to read: habit widgets on the iPhone."
- Problem: same calque as f72800165b; keep both lines the same.
- Proposed: `Lee también: <a href="/guides/iphone-habit-widgets.html">widgets de hábitos en el iPhone</a>.`

## 8a32797c56 (minor)
- Back: "Yours forever. Export as CSV whenever you want..."
- Problem: the bold lead "Tuyos" has no noun before it (masculine plural of what?); it only resolves after "tus datos" at the end. Also "para siempre" says more than "to keep".
- Proposed: `<b>Tus datos son tuyos.</b>Exporta como CSV cuando quieras, en cualquier plan. Premium nunca bloquea tus datos.`

## a7ea434cc1 (minor)
- Back: "Start with Free. Try Premium free for two weeks..."
- Problem: es rule plan-name-with-el-plan: a bare plan name after a preposition in a sentence reads as "start for free / with free". Name the plan.
- Proposed: "Empieza con el plan Gratis. Prueba Premium gratis durante dos semanas cuando quieras más. Si Premium termina, no se borra nada."

## 522e09e8bf (minor)
- Back: "Levels, without missing twice in a row, rest and time off"
- Problem: in a list of features the run label lowercased reads as an adverbial phrase, not a feature. Quote it as the app's label (straight quotes).
- Proposed: `Niveles, "Sin faltar dos veces seguidas", descanso y tiempo libre` (plain straight quotes, so the entity multiset stays equal to the English)

## 1e37d42e3c (minor)
- Back: "...When a new habit would go over the limit, a note on the form tells you before adding it..."
- Problem: "Cuando ... se pasaría" (conditional after "cuando") is not how a native writes it; "espera en En pausa" is clumsy.
- Proposed: `Gratis tiene 3 hábitos, y Premium tiene hábitos ilimitados, con el modo enfoque que mantiene 5 en foco a la vez. Si un hábito nuevo supera el límite, una nota en el formulario te avisa antes de añadirlo y te ofrece &quot;Pausar un hábito…&quot;. Elige uno para pausarlo: conserva su historial y su nivel, queda en En pausa y puedes reanudarlo cuando quieras. No se borra nada.`

## e214ef1d09 (minor)
- JSON-LD copy of 1e37d42e3c, same problem.
- Proposed: `Gratis tiene 3 hábitos, y Premium tiene hábitos ilimitados, con el modo enfoque que mantiene 5 en foco a la vez. Si un hábito nuevo supera el límite, una nota en el formulario te avisa antes de añadirlo y te ofrece "Pausar un hábito…". Elige uno para pausarlo: conserva su historial y su nivel, queda en En pausa y puedes reanudarlo cuando quieras. No se borra nada.`

## 4f8f184e06 (minor)
- Back: "Going to add one? Choose 'Do less' at the top of the new-habit sheet..."
- Problem: "la hoja de hábito nuevo" is developer language ("sheet"); a reader does not know a "hoja".
- Proposed: `¿Vas a añadir uno? Elige &quot;Hacer menos&quot; arriba al crear el hábito, o empieza el nombre con &quot;Menos&quot; o &quot;Dejar&quot;`

## 793f86be94 (minor)
- Back: "In the quick addition and in Settings > Apple Health..."
- Problem: "el añadido rápido" is a calque with no app string behind it; nobody calls a screen that.
- Proposed: replace the opening "En el añadido rápido y en Ajustes &gt; Apple Health," with "Al añadir un hábito y en Ajustes &gt; Apple Health,"; rest unchanged.

## 2ae54a5895 (minor)
- Back: "...On writing a name like 'Morning run' or 'Swim' suggests it to you..."
- Problem: the sentence has no subject ("te lo sugiere": who?). Also c2c032e641 below.
- Proposed: replace "Al escribir un nombre como &quot;Correr por la mañana&quot; o &quot;Nadar&quot; te lo sugiere," with "Si escribes un nombre como &quot;Correr por la mañana&quot; o &quot;Nadar&quot;, la app te lo sugiere,"; rest unchanged.

## c2c032e641 (minor)
- Back: "Choose what you do, like going for a run, yoga or swimming..."
- Problem: mixed list (infinitive, noun, infinitive); the app's own outcome is "hacer yoga".
- Proposed: replace "como salir a correr, yoga o nadar" with "como salir a correr, hacer yoga o nadar"; rest unchanged.
