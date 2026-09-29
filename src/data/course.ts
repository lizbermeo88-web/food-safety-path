import mod1 from "@/assets/mod-1-legal.jpg";
import mod2 from "@/assets/mod-2-peligros.jpg";
import mod3 from "@/assets/mod-3-etas.jpg";
import mod4 from "@/assets/mod-4-higiene.jpg";
import mod5 from "@/assets/mod-5-frio.jpg";
import mod6 from "@/assets/mod-6-alergenos.jpg";

export const ASSOCIATION = "Asociación de Empresarios de Hostelería Álvaro Cunqueiro";
export const PASS_MARK = 80;

export type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "note"; title: string; text: string }
  | { kind: "table"; head: string[]; rows: string[][] };

export type Section = {
  title: string;
  blocks: Block[];
};

export type Question = {
  type: "multiple" | "boolean";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type Module = {
  id: number;
  tone: "mint" | "sky" | "lav" | "peach" | "butter" | "berry";
  title: string;
  summary: string;
  image: string;
  duration: string;
  sections: Section[];
  quiz: Question[];
};

const VF = ["Verdadero", "Falso"];

export const modules: Module[] = [
  {
    id: 1,
    tone: "mint",
    title: "Marco legal, responsabilidades y cultura de seguridad alimentaria",
    summary: "Qué es un manipulador, qué dice el Reglamento (CE) 852/2004 y de quién es la responsabilidad.",
    image: mod1,
    duration: "35 min",
    sections: [
      {
        title: "1.1 ¿Qué es un manipulador de alimentos?",
        blocks: [
          {
            kind: "p",
            text: "Son todas aquellas personas que, por su actividad laboral, están en contacto directo con los alimentos durante su preparación, fabricación, transformación, elaboración, envasado, almacenamiento, transporte, distribución, venta o servicio.",
          },
          {
            kind: "p",
            text: "Ser manipulador de alimentos no supone ningún riesgo de enfermar: supone ser más responsable. Los manipuladores tienen en sus manos la salud de los consumidores, por ello, es su responsabilidad realizar las prácticas higiénicas adecuadas.",
          },
        ],
      },
      {
        title: "1.2 El certificado de manipulador de alimentos",
        blocks: [
          {
            kind: "p",
            text: "Si vas a trabajar en un sector en contacto con los alimentos, necesitas un <strong>certificado de manipulador de alimentos.</strong> Este carnet acredita que cuentas con <strong>formación en materia de higiene alimentaria,</strong> necesaria para desarrollar tu trabajo.",
          },
          {
            kind: "p",
            text: "Cada Comunidad Autónoma tiene su normativa en materia de higiene de los alimentos, pero el certificado de manipulador de alimentos, una vez obtenido, es <strong>válido en todo el territorio nacional.</strong>",
          },
          {
            kind: "p",
            text: "Según la Nota Informativa del 17 de noviembre de 2013, no existen actualmente las limitaciones que existían cuando estaba en vigor el <strong>Real Decreto 202/2000 sobre: caducidad de los certificados</strong>, división por sectores, ni clasificación de alto y bajo riesgo, con lo que el certificado es <strong>válido para cualquier ámbito profesional</strong> que requiera manipulación.",
          },
          {
            kind: "p",
            text: "<strong>Los certificados de manipulador de alimentos expedidos posteriormente al año 2000 no tienen fecha de caducidad,</strong> eso significa que el «carnet» no caduca. No obstante, el <strong>Real Decreto 109/2010</strong> explica que no caduca el certificado, pero sí que se <strong>exige una formación continuada,</strong> lo que implica realizar cursos de reciclaje y aprendizaje. Es recomendable hacer esta formación cada 2 o 3 años.",
          },
        ],
      },
      {
        title: "1.3 Objetivo del curso y marco legal",
        blocks: [
          {
            kind: "p",
            text: "Nos vamos a centrar en el <strong>Reglamento (CE) 852/2004,</strong> al ser el marco legal de aplicación en relación con los trabajadores de las empresas alimentarias. Este reglamento es aplicable desde el 1 de enero de 2006.",
          },
          {
            kind: "p",
            text: "En el <strong>Capítulo XII del Anexo II del Reglamento (CE) 852/2004,</strong> relativo a «Formación», se establece que los operadores de empresa alimentaria deberán garantizar:",
          },
          {
            kind: "list",
            items: [
              "La supervisión y la instrucción o formación de los manipuladores de productos alimenticios en cuestiones de higiene alimentaria, de acuerdo con su actividad laboral.",
              "Que quienes tengan a su cargo el desarrollo y mantenimiento del procedimiento basado en los principios de <strong>APPCC</strong> (Artículo 5) o la aplicación de las guías de prácticas correctas de higiene hayan recibido una formación adecuada en lo tocante a la aplicación de los principios del <strong>APPCC.</strong>",
              "El cumplimiento de todos los requisitos de la legislación nacional relativa a los programas de formación para los trabajadores de determinados sectores alimentarios.",
            ],
          },
          {
            kind: "p",
            text: "El objetivo del presente curso es facilitar a las empresas alimentarias orientaciones en el ámbito de estos tres puntos.",
          },
        ],
      },
      {
        title: "1.4 Formación, instrucción y supervisión",
        blocks: [
          {
            kind: "p",
            text: "Es responsabilidad de las empresas alimentarias garantizar que el personal dispone de una formación adecuada a su puesto de trabajo.",
          },
          {
            kind: "p",
            text: "A su vez, las empresas alimentarias, para poder proporcionar las garantías de que no comercializan alimentos que no son seguros, deben <strong>implantar sistemas de autocontrol basados en el análisis de peligros y puntos de control críticos (APPCC).</strong> En estos sistemas de autocontrol deben incluir la planificación de la formación que tienen establecida para los manipuladores de la empresa alimentaria.",
          },
          {
            kind: "p",
            text: "La formación puede impartirse, entre otros, a través de la propia empresa alimentaria, de entidades de formación, o de centros o escuelas de formación profesional o educacional reconocidos por organismos oficiales dentro de la formación reglada.",
          },
          {
            kind: "note",
            title: "Cultura de seguridad alimentaria",
            text: "La cultura de seguridad alimentaria significa que la dirección da ejemplo, que se habla de higiene en el día a día, que cualquier trabajador puede avisar de un problema sin miedo y que las incidencias se registran y se corrigen. La normativa marca el mínimo; la cultura es lo que hace que se cumpla cada día.",
          },
        ],
      },
    ],
    quiz: [
      {
        type: "multiple",
        question: "¿Quién es considerado manipulador de alimentos?",
        options: [
          "Solo los cocineros de un restaurante",
          "Toda persona que, por su actividad laboral, está en contacto directo con los alimentos",
          "Solo quien elabora comida caliente",
          "Únicamente el responsable del establecimiento",
        ],
        correct: 1,
        explanation:
          "Incluye preparación, fabricación, transformación, elaboración, envasado, almacenamiento, transporte, distribución, venta o servicio.",
      },
      {
        type: "boolean",
        question: "El certificado de manipulador de alimentos obtenido en una Comunidad Autónoma es válido en todo el territorio nacional.",
        options: VF,
        correct: 0,
        explanation: "Una vez obtenido, el certificado es válido en todo el territorio nacional.",
      },
      {
        type: "boolean",
        question: "Los certificados expedidos después del año 2000 tienen fecha de caducidad.",
        options: VF,
        correct: 1,
        explanation: "No tienen fecha de caducidad, aunque sí se exige formación continuada.",
      },
      {
        type: "multiple",
        question: "¿Cuál es el reglamento europeo de referencia para los trabajadores de empresas alimentarias?",
        options: [
          "Reglamento (CE) 852/2004",
          "Real Decreto 202/2000",
          "Reglamento (UE) 1169/2011",
          "Real Decreto 109/2010",
        ],
        correct: 0,
        explanation: "El Reglamento (CE) 852/2004 es aplicable desde el 1 de enero de 2006.",
      },
      {
        type: "multiple",
        question: "¿De quién es la responsabilidad de garantizar que el personal tiene formación adecuada a su puesto?",
        options: [
          "De la empresa alimentaria",
          "Del cliente",
          "Del ayuntamiento",
          "De cada trabajador por su cuenta",
        ],
        correct: 0,
        explanation: "Es responsabilidad de las empresas alimentarias garantizar la formación adecuada del personal.",
      },
      {
        type: "boolean",
        question: "Ser manipulador de alimentos supone un riesgo de enfermar para el propio trabajador.",
        options: VF,
        correct: 1,
        explanation: "En absoluto: supone ser más responsable, porque tiene en sus manos la salud de los consumidores.",
      },
      {
        type: "multiple",
        question: "La formación recomendada de reciclaje debería repetirse aproximadamente cada…",
        options: ["10 años", "2 o 3 años", "6 meses", "Nunca, no es necesaria"],
        correct: 1,
        explanation: "Se exige formación continuada y es recomendable hacerla cada 2 o 3 años.",
      },
      {
        type: "multiple",
        question: "¿Qué deben incluir los sistemas de autocontrol respecto a la formación?",
        options: [
          "La planificación de la formación establecida para los manipuladores",
          "El horario de apertura del local",
          "Las nóminas del personal",
          "El listado de proveedores",
        ],
        correct: 0,
        explanation: "Los sistemas de autocontrol basados en APPCC incluyen la planificación de la formación.",
      },
      {
        type: "boolean",
        question: "La cultura de seguridad alimentaria implica que cualquier trabajador pueda avisar de un problema sin miedo.",
        options: VF,
        correct: 0,
        explanation: "La comunicación abierta de incidencias es parte esencial de la cultura de seguridad alimentaria.",
      },
      {
        type: "multiple",
        question: "El carnet de manipulador acredita que…",
        options: [
          "Cuentas con formación en materia de higiene alimentaria",
          "Has superado un examen médico",
          "Eres propietario de un negocio de hostelería",
          "Tienes cinco años de experiencia",
        ],
        correct: 0,
        explanation: "Acredita la formación en higiene alimentaria necesaria para desarrollar el trabajo.",
      },
    ],
  },
  {
    id: 2,
    tone: "sky",
    title: "Peligros y contaminación de los alimentos",
    summary: "Contaminación física, química, biológica y cruzada: causas, riesgos y cómo evitarlas.",
    image: mod2,
    duration: "40 min",
    sections: [
      {
  title: "2.1 Higiene alimentaria y calidad higiénica",
  blocks: [
    {
      kind: "p",
      text: "La calidad higiénica de un alimento depende de la calidad higiénica de la materia prima y de la manipulación correcta del mismo.",
    },
    {
      kind: "p",
      text: "La higiene alimentaria es el conjunto de medidas para que el alimento llegue al cliente <strong>seguro</strong>: sin suciedad, sin productos químicos peligrosos y sin microorganismos que puedan enfermar.",
    },
    {
      kind: "p",
      text: "La contaminación de un alimento es la presencia en él de cualquier sustancia u organismo no deseado. Puede ser de <strong>3 tipos: física, química y biológica</strong>. En los siguientes apartados verás cada una con detalle.",
    },
    {
      kind: "table",
      head: ["Tipo", "¿Qué es?", "Ejemplo en cocina"],
      rows: [
        ["Física", "Un objeto que no debería estar en el plato", "Pelo, cristal, tirita, anillo, plástico"],
        ["Química", "Una sustancia que no es alimento", "Lejía, insecticida, aceite de máquina"],
        ["Biológica", "Seres vivos que no se ven a simple vista", "Bacterias, virus, mohos, parásitos"],
      ],
    },
    {
      kind: "list",
      items: [
        "<strong>Se ve:</strong> casi siempre es contaminación física (un pelo, un cristal, un pendiente).",
        "<strong>No se ve y puede oler fuerte:</strong> piensa en química (lejía, desinfectante mal aclarado).",
        "<strong>No se ve y el alimento parece normal:</strong> piensa en biológica. Es la más peligrosa en hostelería.",
      ],
    },
    {
      kind: "note",
      title: "Para recordar en el puesto de trabajo",
      text: "Un alimento puede oler bien, verse bien y saborear bien… y estar contaminado. La calidad higiénica no se decide «a ojo»: se consigue con materia prima segura, manos limpias, utensilios limpios y separación de crudos y cocinados.",
    },
  ],
},
   {
  title: "2.2 Contaminación física",
  blocks: [
    {
      kind: "p",
      text: "La contaminación física es la presencia en el alimento de <strong>cuerpos extraños</strong>: objetos que no forman parte del plato y que el cliente no debería encontrarse nunca.",
    },
    {
      kind: "p",
      text: "Ejemplos habituales en hostelería: cristales, virutas metálicas, plásticos, piedras, astillas de madera, pelos, uñas, tiritas, pendientes, anillos, grapas o restos de embalaje.",
    },
    {
      kind: "table",
      head: ["De dónde sale", "Qué puede caer al alimento", "Qué puede pasar"],
      rows: [
        ["El manipulador", "Pelo, uña, pendiente, anillo, tirita, botón", "Asco, atragantamiento, reclamación"],
        ["La cocina y el local", "Cristal de vaso o lámpara, tornillo, viruta, plástico", "Corte en boca o digestivo"],
        ["La materia prima y el envase", "Piedra, hueso, grapa, trozo de caja o film", "Diente roto, rechazo del plato"],
      ],
    },
    {
      kind: "p",
      text: "No es una intoxicación (eso suele ser contaminación biológica). El daño aquí es <strong>mecánico</strong>: corta, pincha o atraganta. Aunque el objeto no enferme, el establecimiento responde igual ante el cliente y la inspección.",
    },
    {
      kind: "list",
      items: [
        "<strong>Sin joyas en el puesto:</strong> quita reloj, pulseras, pendientes y anillos. Acumulan suciedad y pueden caer al plato.",
        "<strong>Pelo recogido y cubierto.</strong> Una horquilla o un pelo es contaminación física y también arrastra microorganismos.",
        "<strong>Tiritas de color vivo</strong> (azul o similar, que no se confunda con el alimento) y guante encima si hay herida.",
        "<strong>Cuidado con el cristal:</strong> si se rompe un vaso o una lámpara, para el servicio en esa zona, retira alimentos expuestos y no recojas cristales con la mano desnuda.",
        "<strong>Revisa lo que entra:</strong> abre cajas lejos del plato, quita grapas y plásticos y mira las verduras y legumbres por si hay piedras.",
        "<strong>Luminarias protegidas</strong> y utensilios enteros: un vaso estrellado o un cubierto roto no se usa.",
      ],
    },
    {
      kind: "note",
      title: "Regla práctica",
      text: "Todo lo que llevas encima y no es uniforme puede acabar en el plato. Antes de entrar en cocina: nada de joyas, pelo cubierto, heridas tapadas con tirita visible y un vistazo a vasos, lámparas y envases.",
    },
  ],
},
      {
        title: "2.3 Contaminación química",
        blocks: [
          {
            kind: "p",
            text: "Es la presencia de sustancias químicas en el alimento: restos de productos de limpieza y desinfección, insecticidas, lubricantes, metales pesados, restos de plaguicidas o medicamentos veterinarios, o migraciones de envases no aptos para uso alimentario.",
          },
          { kind: "p", text: "Riesgos: alergias e intoxicaciones alimentarias." },
          {
            kind: "list",
            items: [
              "Guarda los productos químicos siempre separados de los alimentos y en su envase original etiquetado.",
              "No utilices envases de alimentos para guardar productos de limpieza ni al contrario.",
              "Respeta dosis, tiempos de actuación y aclarado indicados por el fabricante.",
              "Usa solo utensilios y envases de uso alimentario.",
            ],
          },
        ],
      },
      {
        title: "2.4 Contaminación biológica",
        blocks: [
          {
            kind: "p",
            text: "Es la producida por seres vivos: bacterias, virus, mohos, levaduras y parásitos. Es la más frecuente y la más peligrosa en hostelería.",
          },
          {
            kind: "p",
            text: "Riesgos: deterioro rápido de los alimentos, intoxicaciones alimentarias e incluso la muerte.",
          },
          {
            kind: "p",
            text: "Las bacterias necesitan unas condiciones concretas para multiplicarse. Si controlamos esas condiciones, controlamos el peligro:",
          },
          {
            kind: "table",
            head: ["Factor", "Condición que favorece a las bacterias"],
            rows: [
              ["Temperatura", "Entre 5 °C y 65 °C (zona de peligro), con óptimo en torno a 37 °C"],
              ["Humedad", "Alimentos con mucha agua disponible: carnes, pescados, salsas, lácteos"],
              ["Nutrientes", "Alimentos ricos en proteínas y azúcares"],
              ["Tiempo", "Cada 20 minutos pueden duplicarse en condiciones favorables"],
              ["Acidez", "pH próximo al neutro; los medios muy ácidos las frenan"],
            ],
          },
          {
            kind: "note",
            title: "Recuerda",
            text: "Un alimento contaminado por bacterias puede tener aspecto, olor y sabor completamente normales. No se puede confiar en los sentidos para decidir si un alimento es seguro.",
          },
        ],
      },
      {
        title: "2.5 Contaminación cruzada",
        blocks: [
          {
            kind: "p",
            text: "La contaminación cruzada es el paso de microorganismos u otros contaminantes desde un alimento contaminado (normalmente crudo) hasta otro alimento listo para el consumo, de forma directa o a través de manos, superficies, utensilios o equipos.",
          },
          {
            kind: "list",
            items: [
              "Separar siempre alimentos crudos de alimentos cocinados o listos para consumo, tanto en la elaboración como en el almacenamiento.",
              "Utilizar diferentes utensilios para alimentos crudos y cocidos. Al usarlos, lavarlos antes y después de tocar los alimentos.",
              "Lavarse las manos al cambiar de tarea y tras manipular alimentos crudos.",
              "Almacenar los alimentos protegidos y tapados, colocando los crudos por debajo de los cocinados en la cámara.",
              "Limpiar y desinfectar tablas, encimeras y cuchillos entre usos.",
            ],
          },
        ],
      },
      {
        title: "2.6 Plagas y animales indeseables",
        blocks: [
          {
            kind: "p",
            text: "Insectos, roedores y aves son vehículo de contaminación biológica y física. La prevención se basa en impedir su entrada, no darles alimento ni refugio y vigilar su presencia.",
          },
          {
            kind: "list",
            items: [
              "Mallas mosquiteras, puertas ajustadas y sumideros con rejilla.",
              "Retirar residuos con frecuencia y mantener los cubos tapados.",
              "No almacenar material inservible ni cajas de cartón de proveedores.",
              "Avisar de inmediato ante cualquier indicio: excrementos, roeduras, insectos vivos o muertos.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        type: "multiple",
        question: "¿Cuáles son los tres tipos de contaminación de los alimentos?",
        options: [
          "Física, química y biológica",
          "Directa, indirecta y cruzada",
          "Visible, invisible y dudosa",
          "Fría, caliente y templada",
        ],
        correct: 0,
        explanation: "La contaminación puede ser física, química o biológica.",
      },
      {
        type: "multiple",
        question: "Un trozo de cristal en un plato es un ejemplo de contaminación…",
        options: ["Química", "Física", "Biológica", "Cruzada"],
        correct: 1,
        explanation: "Los cuerpos extraños como cristales o metales son contaminación física.",
      },
      {
        type: "multiple",
        question: "¿Cuáles son los riesgos principales de la contaminación química?",
        options: [
          "Alergias e intoxicaciones alimentarias",
          "Solo mal sabor del alimento",
          "Únicamente pérdidas económicas",
          "Ningún riesgo si el alimento se cocina",
        ],
        correct: 0,
        explanation: "La contaminación química puede provocar alergias e intoxicaciones alimentarias.",
      },
      {
        type: "boolean",
        question: "Un alimento contaminado por bacterias siempre huele o sabe mal.",
        options: VF,
        correct: 1,
        explanation: "Puede tener aspecto, olor y sabor normales; los sentidos no garantizan la seguridad.",
      },
      {
        type: "multiple",
        question: "La zona de peligro de temperaturas para el crecimiento bacteriano está entre…",
        options: ["−18 °C y 0 °C", "5 °C y 65 °C", "65 °C y 100 °C", "0 °C y 4 °C"],
        correct: 1,
        explanation: "Entre 5 °C y 65 °C las bacterias se multiplican con facilidad.",
      },
      {
        type: "boolean",
        question: "Se pueden usar los mismos utensilios para alimentos crudos y cocinados si se enjuagan con agua.",
        options: VF,
        correct: 1,
        explanation: "Hay que utilizar utensilios diferentes y lavarlos antes y después de tocar los alimentos.",
      },
      {
        type: "multiple",
        question: "En la cámara frigorífica, los alimentos crudos deben colocarse…",
        options: [
          "Por debajo de los alimentos cocinados",
          "Por encima de los cocinados",
          "Mezclados, da igual el orden",
          "Siempre en la puerta",
        ],
        correct: 0,
        explanation: "Así se evita que sus jugos goteen sobre alimentos listos para consumo.",
      },
      {
        type: "multiple",
        question: "¿Qué NO debe hacerse con los productos de limpieza?",
        options: [
          "Guardarlos en envases de alimentos",
          "Mantenerlos en su envase original etiquetado",
          "Almacenarlos separados de los alimentos",
          "Respetar la dosis del fabricante",
        ],
        correct: 0,
        explanation: "Nunca se deben trasvasar productos químicos a envases de alimentos.",
      },
      {
        type: "boolean",
        question: "Las cajas de cartón de los proveedores conviene retirarlas para no favorecer las plagas.",
        options: VF,
        correct: 0,
        explanation: "El cartón y el material inservible sirven de refugio a insectos y roedores.",
      },
      {
        type: "multiple",
        question: "La calidad higiénica de un alimento depende de…",
        options: [
          "La calidad higiénica de la materia prima y de su manipulación correcta",
          "El precio del alimento",
          "La presentación del plato",
          "La marca del proveedor",
        ],
        correct: 0,
        explanation: "Materia prima segura más manipulación correcta.",
      },
    ],
  },
  {
    id: 3,
    tone: "peach",
    title: "Enfermedades de transmisión alimentaria (ETAs)",
    summary: "Qué son, cómo se producen, principales patógenos, síntomas y grupos de riesgo.",
    image: mod3,
    duration: "35 min",
    sections: [
      {
        title: "3.1 Qué son las ETAs",
        blocks: [
          {
            kind: "p",
            text: "Añadido por la Asociación para completar el módulo. Las enfermedades de transmisión alimentaria (ETAs) son las que se producen al consumir alimentos o agua contaminados por microorganismos, sus toxinas, parásitos o sustancias químicas.",
          },
          {
            kind: "list",
            items: [
              "Infección alimentaria: el microorganismo vivo llega al intestino y se multiplica allí (por ejemplo Salmonella, Campylobacter, Listeria).",
              "Intoxicación alimentaria: el daño lo causa una toxina ya presente en el alimento, aunque el microorganismo haya muerto (por ejemplo Staphylococcus aureus, Bacillus cereus, Clostridium botulinum).",
              "Toxiinfección: combinación de ambas situaciones.",
            ],
          },
          {
            kind: "p",
            text: "Se habla de brote cuando dos o más personas presentan la misma enfermedad después de consumir un mismo alimento.",
          },
        ],
      },
      {
        title: "3.2 Principales agentes y alimentos implicados",
        blocks: [
          {
            kind: "table",
            head: ["Agente", "Alimentos habituales", "Síntomas frecuentes"],
            rows: [
              ["Salmonella", "Huevo crudo y ovoproductos, carne de ave, salsas caseras", "Diarrea, fiebre, dolor abdominal, vómitos"],
              ["Staphylococcus aureus", "Alimentos manipulados en exceso: cremas, repostería, fiambres", "Vómitos intensos y de aparición rápida"],
              ["Listeria monocytogenes", "Quesos de leche cruda, ahumados, patés, listos para consumo", "Cuadro gripal; grave en embarazadas"],
              ["Escherichia coli (STEC)", "Carne picada poco cocinada, vegetales mal lavados", "Diarrea con sangre, complicaciones renales"],
              ["Campylobacter", "Pollo crudo, leche sin pasteurizar", "Diarrea, dolor abdominal, fiebre"],
              ["Anisakis", "Pescado crudo o poco cocinado", "Dolor abdominal, reacción alérgica"],
              ["Clostridium botulinum", "Conservas caseras mal esterilizadas", "Visión doble, parálisis; muy grave"],
            ],
          },
        ],
      },
      {
        title: "3.3 Causas más habituales en hostelería",
        blocks: [
          {
            kind: "list",
            items: [
              "Alimentos mantenidos demasiado tiempo entre 5 °C y 65 °C.",
              "Cocinado o recalentado insuficiente.",
              "Enfriamiento demasiado lento de grandes cantidades.",
              "Contaminación cruzada entre crudos y elaborados.",
              "Higiene personal deficiente, especialmente el lavado de manos.",
              "Manipuladores enfermos o con lesiones en las manos.",
              "Materias primas de origen desconocido o no controlado.",
            ],
          },
          {
            kind: "note",
            title: "Grupos de especial riesgo",
            text: "Embarazadas, lactantes y niños pequeños, personas mayores e inmunodeprimidos. Para ellos una ETA puede ser mucho más grave, por lo que se extreman las precauciones en sus comidas.",
          },
        ],
      },
      {
        title: "3.4 Qué hacer ante una sospecha",
        blocks: [
          {
            kind: "list",
            items: [
              "Avisar de inmediato al responsable del establecimiento.",
              "No tirar el alimento sospechoso: conservarlo refrigerado e identificado para las autoridades sanitarias.",
              "Retirar el producto del servicio y revisar registros de temperaturas y trazabilidad.",
              "Colaborar con la inspección sanitaria aportando la documentación del sistema de autocontrol.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        type: "multiple",
        question: "¿Qué es una infección alimentaria?",
        options: [
          "El microorganismo vivo llega al intestino y se multiplica",
          "El daño lo causa solo una toxina ya presente en el alimento",
          "Una reacción al gluten",
          "Un cuerpo extraño en el alimento",
        ],
        correct: 0,
        explanation: "En la infección el microorganismo vivo se multiplica en el intestino.",
      },
      {
        type: "multiple",
        question: "La Salmonella se asocia especialmente a…",
        options: [
          "Huevo crudo, ovoproductos y carne de ave",
          "Frutas de temporada",
          "Pan y bollería seca",
          "Agua embotellada",
        ],
        correct: 0,
        explanation: "El huevo crudo y las salsas caseras son vehículos clásicos de Salmonella.",
      },
      {
        type: "boolean",
        question: "Se considera brote cuando dos o más personas enferman tras consumir un mismo alimento.",
        options: VF,
        correct: 0,
        explanation: "Esa es la definición de brote de enfermedad de transmisión alimentaria.",
      },
      {
        type: "multiple",
        question: "¿Qué microorganismo es especialmente peligroso durante el embarazo?",
        options: ["Listeria monocytogenes", "Bacillus cereus", "Anisakis", "Mohos del pan"],
        correct: 0,
        explanation: "La listeriosis puede tener consecuencias graves en el embarazo.",
      },
      {
        type: "multiple",
        question: "El Anisakis se relaciona con el consumo de…",
        options: [
          "Pescado crudo o poco cocinado",
          "Verduras cocidas",
          "Quesos curados",
          "Legumbres en conserva",
        ],
        correct: 0,
        explanation: "Por eso el pescado para consumo en crudo debe congelarse previamente.",
      },
      {
        type: "boolean",
        question: "Ante una sospecha de intoxicación conviene tirar inmediatamente el alimento implicado.",
        options: VF,
        correct: 1,
        explanation: "Debe conservarse refrigerado e identificado para las autoridades sanitarias.",
      },
      {
        type: "multiple",
        question: "¿Cuál de estas NO es una causa habitual de ETA en hostelería?",
        options: [
          "Enfriar rápidamente los alimentos cocinados",
          "Recalentado insuficiente",
          "Contaminación cruzada",
          "Lavado de manos deficiente",
        ],
        correct: 0,
        explanation: "El enfriamiento rápido es precisamente una medida preventiva.",
      },
      {
        type: "multiple",
        question: "Staphylococcus aureus se asocia sobre todo a…",
        options: [
          "Alimentos muy manipulados como cremas y repostería",
          "Conservas caseras",
          "Carne picada cruda",
          "Agua de red",
        ],
        correct: 0,
        explanation: "Procede con frecuencia de las manos y las vías respiratorias del manipulador.",
      },
      {
        type: "boolean",
        question: "Las personas mayores y los inmunodeprimidos son grupos de especial riesgo frente a las ETAs.",
        options: VF,
        correct: 0,
        explanation: "También embarazadas, lactantes y niños pequeños.",
      },
      {
        type: "multiple",
        question: "El botulismo se relaciona principalmente con…",
        options: [
          "Conservas caseras mal esterilizadas",
          "Ensaladas embolsadas",
          "Pan recién hecho",
          "Fruta pelada",
        ],
        correct: 0,
        explanation: "Clostridium botulinum se desarrolla en ausencia de oxígeno en conservas mal procesadas.",
      },
    ],
  },
  {
    id: 4,
    tone: "mint",
    title: "Higiene personal del manipulador y buenas prácticas",
    summary: "Lavado de manos, ropa de trabajo, estado de salud y hábitos correctos en la cocina.",
    image: mod4,
    duration: "30 min",
    sections: [
      {
        title: "4.1 Las manos: la medida más eficaz",
        blocks: [
          {