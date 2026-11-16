# es critic review (website guides)

Critic: Opus, fresh context, 16 Nov 2026. Scope: the 134 "drafted" segments in i18n/es.json (10 guide pages: index, apple-health-habits, cut-back-with-a-calendar, habit-tracker-without-streaks, habits-you-want-less-of, iphone-habit-widgets, one-missed-day, private-habit-tracker, rest-days, sick-and-travel-days). Reference: the 223 reviewed home and support segments, glossary, es notes (incl. the back-review precedent rules), metadata-es.md.

Mechanical checks, all clean: tag multiset per segment, hrefs and classes, no em/en dashes, no curly or angle quotes. The only entity difference is `&#x27;` in the one-missed-day title, which is the English apostrophe and has no Spanish counterpart. Raw `"` inside the text of an HTML segment appears only in 54fcca914b, where the English has it too.

App terms checked against the es catalog and apple_terms: Hacer menos, Menos/Dejar, Compañía/Desconectar, Día en cero (control), Marcar (control), widget names Hábito/Siguiente/Hoy/Hoy y semana/Calendario mensual/Esta semana/Quién estás siendo, En reposo, Centro de control, Añadir widget, Editar, Mantener privado, "un hábito privado"/"Hábito privado", Siri phrases ("Marca Leer en Mostly Daily", "Descanso hoy para Leer en Mostly Daily"), Descansar hoy, Poca energía, Viaje, Descanso, Tiempo libre, Vacaciones/Otra, Hola de nuevo, "3 de 4 días en cero esta semana", "Mañana es un día nuevo.", Ideas de Apple Health, Cerrar mis anillos, anillo Moverse, Salir al aire libre, En la cama antes de las 23:00, Anotar cómo me siento, Estado de ánimo, minutos de mindfulness, distancia caminando y corriendo (the app's own wording), horas de pie, Sincronizar registros con iCloud, Exportar e importar, Eliminar todos los datos, Tu día. All match except the unit "treats" (311a34cf50) and the App Store label (1dddcabedf).

Native read: most guides read like Spanish articles, with good idiomatic choices ("la vida va cuesta arriba", "no puedes más", "Lo que registras a mano manda", "lo que haces sin pensar"). What gives the translation away is a few calques ("cuando el día llega a tu objetivo", "habla con un servidor", "contar los días que llevas") and three places where a level word stands bare after "en" or as a subject, which the es precedent rules already settled.

Search: the titles use the words people search with ("registro de hábitos", "seguimiento de hábitos", "widgets de hábitos", "beber menos", "hábitos diarios" on the index) without stuffing. One structural problem: the H1 of the streaks guide shares its id with a reviewed home eyebrow and so renders as "Hábitos diarios sin presión" (see the first finding).

Counts: 17 findings (7 major, 10 minor).

## 50dff26f05 (major; with 927428b06f)
- Back: title "Habit tracking without strict streaks · Mostly Daily". The page's H1 and JSON-LD headline, however, render "Daily habits without pressure".
- Problem: the guide's `<h1>A habit tracker without streaks</h1>` has the same text as the home #why eyebrow, so `sid()` gives it the reviewed id 927428b06f ("Hábitos diarios sin presión"). The streaks article then has an H1 that never mentions rachas and a title that says something else. Two different headings for one article is inconsistent and weaker for search. The reviewed entry must not change, and no es text alone can fix this.
- Proposed: in the site, give the guide's H1 its own segment (for example, a slightly different English H1 such as "A habit tracker without streaks, explained", or a page-scoped id), translated as "Seguimiento de hábitos sin rachas estrictas". Keep this title as drafted. If the site is not changed, align the title with the H1 instead: "Hábitos diarios sin presión: seguimiento sin rachas estrictas · Mostly Daily".

## 6a42e82c88 (major)
- Back: "Steps, workouts, sleep, water and rings, checked off by you."
- Problem: "marcados por ti" means "checked off by you", which is the opposite of "checked off for you" (the app does it).
- Proposed: "Pasos, entrenamientos, sueño, agua y anillos, que se marcan solos."

## 311a34cf50 (major)
- Back: "... Choose a unit (drinks, sweets, minutes or your own word) ..."
- Problem: wrong app term. The app's unit for "treats" is "caprichos" (`ui::treats`, `%lld treats`). "dulces" is a different word from the one the user sees in the unit picker.
- Proposed: "En Mostly Daily, añade un hábito y elige "Hacer menos" arriba, o empieza el nombre con "Menos" o "Dejar". Elige una unidad (bebidas, caprichos, minutos o tu propia palabra), cuánto cuenta todavía como un día ligero (2 si no cambias nada) y cuántos días en cero a la semana quieres (4 si no cambias nada). Para el tiempo de pantalla, usa minutos para una app o un tipo de uso, como las redes sociales, y registra tú los minutos."

## 13f3db0404 (major)
- Back: "... Starting, Sometimes, Often and Mostly. Almost always it is the top level and you never need 100%."
- Problem: the level word as a bare sentence subject reads as an adverb ("almost always, it is the top level"). This breaks es precedent rule level-word-quoted-as-subject. The reviewed home says "el nivel más alto es Casi siempre".
- Proposed: "Cada hábito tiene un nivel de constancia según cuántas veces lo hiciste en el último par de meses: Empezando, A veces, A menudo y Casi siempre. El nivel más alto es Casi siempre y nunca necesitas el 100%. Un día sin hacerlo después de un buen mes cuesta unos puntos, y vuelven tan rápido como se fueron."

## cf689f7ec7 (major)
- Back: "... costs a few points; you are still at almost always ..."
- Problem: a bare level word after a preposition reads as a frequency. This breaks es precedent rule level-word-after-preposition-add-nivel. The reviewed home was fixed the same way ("en el nivel A menudo o Casi siempre").
- Proposed: "Cada hábito tiene un nivel según el último par de meses. Un día sin hacerlo después de un buen mes cuesta unos puntos; sigues en el nivel Casi siempre. El nivel se recupera tan rápido como bajó. Nunca necesitas el 100%."

## 237af1f5b0 (major)
- Back: "... Each week that ends with the habit in often or almost always also gives you one more rest day ..."
- Problem: same precedent rule as above, and inconsistent with the reviewed home sentence about the same rule ("Termina una semana en el nivel A menudo o Casi siempre").
- Proposed: "Descanso y Viaje comparten un tope flexible de 4 días al mes por hábito, que puedes cambiar de 0 a 10. Pasarte no es un problema: el menú muestra cuántos has usado, y un día de descanso extra sigue siendo un día de descanso, nunca un día sin hacer. Cada semana que termina con el hábito en el nivel A menudo o Casi siempre también te da un día de descanso más, y puedes guardar hasta 4."

## 1dddcabedf (major)
- Back: "... The App Store privacy label for Mostly Daily says No data is collected."
- Problem: Apple term. The label is a fixed App Store heading, and in the Spanish App Store it reads "Datos no recopilados". A paraphrase stops it from matching what the reader sees on the listing.
- Proposed: "Un registro de hábitos sabe mucho de ti, como cuándo duermes y cada cuánto bebes. Es un buen motivo para no tenerlo en el servidor de una empresa. La etiqueta de privacidad de Mostly Daily en el App Store dice Datos no recopilados."

## d5ce9953a7 (minor; same wording in edad9b1640)
- Back: "Link a habit to Apple Health and Mostly Daily marks it when the day arrives at your goal: ..."
- Problem: "cuando el día llega a tu objetivo" is a calque. In Spanish people reach a goal; a day doesn't.
- Proposed (d5ce9953a7): "Vincula un hábito con Apple Health y Mostly Daily lo marca cuando llegas a tu objetivo del día: pasos, entrenamientos, sueño, agua y más."
- Proposed (edad9b1640): "Vincula un hábito con Apple Health y Mostly Daily lo marca cuando llegas a tu objetivo del día: 8.000 pasos, 30 minutos de ejercicio, salir a correr, 7 horas de sueño, 2 litros de agua."

## 524f019e29 (minor)
- Back: "How to reduce the drinks, the sugar or the screen time" (H1).
- Problem: "reducir las bebidas" is an unnatural calque, and the drafted title for the same page already says it better ("Cómo beber menos, tomar menos azúcar o reducir el tiempo de pantalla"), with "beber menos" from the keyword field. The reviewed home link keeps its own wording, and a link doesn't have to match the H1 word for word.
- Proposed: "Cómo beber menos, tomar menos azúcar o reducir el tiempo de pantalla"

## 3b6ffaf33c (minor)
- Back: "Next to the level there is a streak: the days since you last missed twice in a row. ..."
- Problem: in this guide "racha" has meant the strict streak for three paragraphs ("Cuando la racha se rompe..."), and here it suddenly means Mostly's run with no label beside it. Readers will take it as the same streak the article just criticised. The es notes rule run-word-only-beside-label asks for the label next to "racha".
- Proposed: "Junto al nivel hay una racha distinta, la de no faltar dos veces seguidas: los días desde la última vez que te saltaste dos días seguidos. Con un día sin hacerlo la racha sigue. Dos días seguidos sin hacerlo la terminan, y una nueva empieza con tu siguiente registro. Más sobre esto en <a href="/guides/one-missed-day.html">por qué un día sin hacerlo no rompe un hábito</a>."

## 7a7496a6c5 (minor)
- Back: "Why a calendar of clear days works better than counting the days you have been at it."
- Problem: "los días que llevas" without "sin" doesn't say "days since" (without it). It reads as days of doing something.
- Proposed: "Por qué un calendario de días en cero funciona mejor que contar los días que llevas sin hacerlo."

## 993e0898b8 (minor)
- Back: "... A counter of "days you have been at it" makes one slip look like losing everything ..."
- Problem: the same gap. Spanish apps call this a "días sin" counter ("días sin fumar").
- Proposed: "Bebidas, azúcar, tiempo de pantalla. Un contador de "días sin" hace que un tropiezo parezca perderlo todo. Un calendario de días en cero cuenta la verdad."

## cfc0244b7a (minor)
- Back: "Free has three widgets. Habit is a habit with a ring to tap; ... Next shows the next pending habit ..."
- Problem: "Hábito es un hábito" and a bare "Siguiente" as a subject read like a typo. The widget names need "El widget" in front, as the reviewed home does ("el widget Siguiente").
- Proposed: "Gratis tiene tres widgets. El widget Hábito muestra un hábito con un anillo para tocar; si eliges un hábito de limitar, tiene un botón cuadrado que registra un día en cero. El widget Siguiente muestra el siguiente hábito pendiente y, cuando todo está hecho, tu mosaico. Hoy, el widget mediano, tiene el anillo del día y tus hábitos del día."

## 04a311a651 (minor)
- Back: "On the Lock Screen there is a round day ring with the habits done of the ones due ..."
- Problem: "con los hábitos hechos de los que tocan" is hard to parse.
- Proposed: "En la pantalla de bloqueo hay un anillo del día redondo con cuántos hábitos llevas hechos de los que tocan hoy, un rectángulo con tu siguiente hábito pendiente y una línea encima del reloj como "2/5 · Leer". El widget redondo Hábito marca un hábito sin desbloquear el teléfono. En el modo En reposo los widgets pierden el fondo y los nombres se hacen más grandes, para que puedas leerlos desde la cama."

## 8bec169450 (minor)
- Back: "Nothing in the app talks with a server" (H2).
- Problem: "hablar con un servidor" is a calque. In Spanish an app connects to a server.
- Proposed: "Nada en la app se conecta a un servidor"

## 6a5d9609db (minor)
- Back: "If you keep the drinks with Apple Health ..."
- Problem: the app says "Llevar las bebidas en Apple Health" (and the cut-back guide says "se pueden llevar en Apple Health"). "con" breaks that.
- Proposed: "Si llevas las bebidas en Apple Health, se quedan en Apple Health y en tu teléfono, nunca en iCloud. Mostly Daily es para llevar tu propio registro. No da consejos médicos y no es un tratamiento ni un programa de recuperación. Si te preocupa tu salud o lo que bebes, habla con un profesional."
