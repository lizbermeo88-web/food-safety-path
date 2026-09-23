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
            text: "Si vas a trabajar en un sector en contacto con los alimentos, necesitas un certificado de manipulador de alimentos. Este carnet acredita que cuentas con formación en materia de higiene alimentaria, necesaria para desarrollar tu trabajo.",
          },
          {
            kind: "p",
            text: "Cada Comunidad Autónoma tiene su normativa en materia de higiene de los alimentos, pero el certificado de manipulador de alimentos, una vez obtenido, es válido en todo el territorio nacional.",
          },
          {
            kind: "p",
            text: "Según la Nota Informativa del 17 de noviembre de 2013, no existen actualmente las limitaciones que existían cuando estaba en vigor el Real Decreto 202/2000 sobre: caducidad de los certificados, división por sectores, ni clasificación de alto y bajo riesgo, con lo que el certificado es válido para cualquier ámbito profesional que requiera manipulación.",
          },
          {
            kind: "p",
            text: "Los certificados de manipulador de alimentos expedidos posteriormente al año 2000 no tienen fecha de caducidad, eso significa que el «carnet» no caduca. No obstante, el Real Decreto 109/2010 explica que no caduca el certificado, pero sí que se exige una formación continuada, lo que implica realizar cursos de reciclaje y aprendizaje. Es recomendable hacer esta formación cada 2 o 3 años.",
          },
        ],
      },
      {
        title: "1.3 Objetivo del curso y marco legal",
        blocks: [
          {
            kind: "p",
            text: "Nos vamos a centrar en el Reglamento (CE) 852/2004, al ser el marco legal de aplicación en relación con los trabajadores de las empresas alimentarias. Este reglamento es aplicable desde el 1 de enero de 2006.",
          },
          {
            kind: "p",
            text: "En el Capítulo XII del Anexo II del Reglamento (CE) 852/2004, relativo a «Formación», se establece que los operadores de empresa alimentaria deberán garantizar:",
          },
          {
            kind: "list",
            items: [
              "La supervisión y la instrucción o formación de los manipuladores de productos alimenticios en cuestiones de higiene alimentaria, de acuerdo con su actividad laboral.",
              "Que quienes tengan a su cargo el desarrollo y mantenimiento del procedimiento basado en los principios de APPCC (Artículo 5) o la aplicación de las guías de prácticas correctas de higiene hayan recibido una formación adecuada en lo tocante a la aplicación de los principios del APPCC.",
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
            text: "A su vez, las empresas alimentarias, para poder proporcionar las garantías de que no comercializan alimentos que no son seguros, deben implantar sistemas de autocontrol basados en el análisis de peligros y puntos de control críticos (APPCC). En estos sistemas de autocontrol deben incluir la planificación de la formación que tienen establecida para los manipuladores de la empresa alimentaria.",
          },
          {
            kind: "p",
            text: "La formación puede impartirse, entre otros, a través de la propia empresa alimentaria, de entidades de formación, o de centros o escuelas de formación profesional o educacional reconocidos por organismos oficiales dentro de la formación reglada.",
          },
          {
            kind: "note",
            title: "Cultura de seguridad alimentaria",
            text: "Añadido por la Asociación para completar el módulo: la cultura de seguridad alimentaria significa que la dirección da ejemplo, que se habla de higiene en el día a día, que cualquier trabajador puede avisar de un problema sin miedo y que las incidencias se registran y se corrigen. La normativa marca el mínimo; la cultura es lo que hace que se cumpla cada día.",
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
            text: "La contaminación de un alimento es la presencia en él de cualquier sustancia u organismo no deseado. Puede ser de 3 tipos: física, química y biológica.",
          },
        ],
      },
      {
        title: "2.2 Contaminación física",
        blocks: [
          {
            kind: "p",
            text: "Añadido por la Asociación: es la presencia en el alimento de cuerpos extraños como cristales, virutas metálicas, plásticos, piedras, astillas de madera, pelos, uñas, tiritas, pendientes, anillos o restos de embalaje.",
          },
          {
            kind: "list",
            items: [
              "Riesgos: heridas y cortes en la boca o el aparato digestivo, atragantamiento y rechazo del producto.",
              "Prevención: retirar joyas y objetos personales, no usar cristal en zona de manipulación, proteger luminarias, revisar envases y cribar o inspeccionar las materias primas.",
            ],
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
            kind: "p",
            text: "Añadido por la Asociación para completar el módulo. Las manos son la principal vía de transmisión de microorganismos a los alimentos. Su lavado correcto es la medida preventiva más eficaz y más barata.",
          },
          {
            kind: "list",
            items: [
              "Mojar las manos con agua templada y aplicar jabón.",
              "Frotar palmas, dorso, entre los dedos, pulgares, uñas y muñecas durante al menos 20 segundos.",
              "Aclarar con abundante agua.",
              "Secar con papel de un solo uso o aire; nunca con el paño de cocina ni con el delantal.",
            ],
          },
          {
            kind: "p",
            text: "Hay que lavarse las manos al incorporarse al puesto, después de ir al servicio, al cambiar de tarea, tras manipular alimentos crudos, residuos, dinero, envases, móviles o productos de limpieza, y tras toser, estornudar o tocarse la cara o el pelo.",
          },
          {
            kind: "note",
            title: "Los guantes no sustituyen al lavado",
            text: "Si se usan guantes, deben cambiarse al cambiar de tarea o de alimento y siempre que se rompan. Unos guantes sucios contaminan igual que unas manos sucias.",
          },
        ],
      },
      {
        title: "4.2 Aspecto e indumentaria",
        blocks: [
          {
            kind: "list",
            items: [
              "Ropa de trabajo limpia, de uso exclusivo para la actividad y de color claro.",
              "Cubrecabeza que recoja todo el pelo; barba protegida cuando proceda.",
              "Calzado de trabajo cerrado y antideslizante.",
              "Uñas cortas, limpias y sin esmalte ni uñas postizas.",
              "Sin anillos, pulseras, relojes, pendientes colgantes ni piercings visibles en zona de manipulación.",
              "No usar perfumes intensos que puedan transferir olores a los alimentos.",
            ],
          },
        ],
      },
      {
        title: "4.3 Estado de salud y lesiones",
        blocks: [
          {
            kind: "p",
            text: "El manipulador que presente diarrea, vómitos, fiebre, infección de garganta, lesiones cutáneas infectadas o supuración de oídos, ojos o nariz debe comunicarlo al responsable y no manipular alimentos hasta su recuperación.",
          },
          {
            kind: "list",
            items: [
              "Las heridas y cortes se cubren con apósito impermeable de color llamativo y, sobre él, un guante.",
              "No se debe manipular alimentos con lesiones supurantes en las manos.",
              "Cualquier síntoma digestivo debe comunicarse aunque sea leve.",
            ],
          },
        ],
      },
      {
        title: "4.4 Hábitos correctos durante el trabajo",
        blocks: [
          {
            kind: "list",
            items: [
              "No fumar, comer, mascar chicle ni beber en la zona de manipulación.",
              "No toser ni estornudar sobre los alimentos; hacerlo sobre un pañuelo desechable o el codo y lavarse después las manos.",
              "No probar la comida con el dedo ni con la misma cuchara varias veces.",
              "No secar las manos ni los utensilios con el paño del hombro ni con el delantal.",
              "Usar pinzas o utensilios en lugar de las manos para los alimentos listos para consumo.",
              "Mantener el móvil fuera de la zona de manipulación.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        type: "multiple",
        question: "¿Cuánto tiempo, como mínimo, debe durar el frotado en el lavado de manos?",
        options: ["3 segundos", "20 segundos", "5 minutos", "El tiempo que haga falta para enjuagar"],
        correct: 1,
        explanation: "Al menos 20 segundos, incluyendo uñas, entre los dedos y muñecas.",
      },
      {
        type: "boolean",
        question: "Llevar guantes permite prescindir del lavado de manos.",
        options: VF,
        correct: 1,
        explanation: "Los guantes no sustituyen al lavado y deben cambiarse al cambiar de tarea.",
      },
      {
        type: "multiple",
        question: "¿Con qué se deben secar las manos?",
        options: [
          "Con papel de un solo uso o aire",
          "Con el delantal",
          "Con el paño de cocina",
          "Al aire, sacudiéndolas sobre la encimera",
        ],
        correct: 0,
        explanation: "Nunca con el paño de cocina ni con el delantal.",
      },
      {
        type: "multiple",
        question: "Un corte en un dedo debe cubrirse con…",
        options: [
          "Apósito impermeable de color llamativo y un guante encima",
          "Una servilleta de papel",
          "Nada, si no sangra",
          "Film transparente",
        ],
        correct: 0,
        explanation: "El color llamativo facilita detectarlo si se desprende.",
      },
      {
        type: "boolean",
        question: "Un manipulador con diarrea o vómitos debe comunicarlo y no manipular alimentos.",
        options: VF,
        correct: 0,
        explanation: "Debe comunicarlo al responsable y apartarse de la manipulación hasta recuperarse.",
      },
      {
        type: "multiple",
        question: "¿Cuál de estas prácticas es correcta en zona de manipulación?",
        options: [
          "Usar pinzas para los alimentos listos para consumo",
          "Mascar chicle mientras se emplata",
          "Llevar el móvil en la mano",
          "Probar la salsa con el dedo",
        ],
        correct: 0,
        explanation: "Se evita el contacto directo de las manos con alimentos listos para consumo.",
      },
      {
        type: "multiple",
        question: "Respecto a las uñas, lo correcto es llevarlas…",
        options: [
          "Cortas, limpias y sin esmalte",
          "Largas pero limpias",
          "Con esmalte transparente",
          "Postizas, si están bien pegadas",
        ],
        correct: 0,
        explanation: "El esmalte y las uñas postizas pueden desprenderse y acumulan suciedad.",
      },
      {
        type: "boolean",
        question: "Se puede usar la ropa de calle para trabajar si está limpia.",
        options: VF,
        correct: 1,
        explanation: "La ropa de trabajo debe ser de uso exclusivo para la actividad.",
      },
      {
        type: "multiple",
        question: "Después de tocar dinero o envases, el manipulador debe…",
        options: [
          "Lavarse las manos antes de volver a tocar alimentos",
          "Frotarse las manos en el delantal",
          "Seguir trabajando con normalidad",
          "Ponerse guantes sobre las manos sucias",
        ],
        correct: 0,
        explanation: "El cambio de tarea siempre exige lavado de manos.",
      },
      {
        type: "multiple",
        question: "¿Qué debe hacerse al toser o estornudar en cocina?",
        options: [
          "Hacerlo sobre un pañuelo desechable o el codo y lavarse las manos",
          "Girar la cabeza hacia el alimento",
          "Taparse la boca con la mano y continuar",
          "Nada en particular",
        ],
        correct: 0,
        explanation: "Y después siempre lavado de manos.",
      },
    ],
  },
  {
    id: 5,
    tone: "sky",
    title: "Limpieza, desinfección, conservación y cadena de frío",
    summary: "Plan de limpieza, temperaturas de referencia, descongelación y control de la cadena de frío.",
    image: mod5,
    duration: "40 min",
    sections: [
      {
        title: "5.1 Limpieza y desinfección no son lo mismo",
        blocks: [
          {
            kind: "p",
            text: "Añadido por la Asociación para completar el módulo. Limpiar es eliminar la suciedad visible, los restos de alimentos y la grasa. Desinfectar es reducir los microorganismos presentes hasta niveles que no supongan un riesgo. Sobre una superficie sucia el desinfectante no funciona: primero se limpia y después se desinfecta.",
          },
          {
            kind: "list",
            items: [
              "Retirar los restos sólidos.",
              "Lavar con agua y detergente, frotando.",
              "Aclarar con agua potable.",
              "Aplicar el desinfectante respetando dosis y tiempo de contacto.",
              "Aclarar si el producto lo requiere y dejar secar al aire.",
            ],
          },
          {
            kind: "note",
            title: "Plan de limpieza",
            text: "Debe indicar qué se limpia, con qué producto y dosis, con qué frecuencia, quién es el responsable y cómo se registra. Los útiles de limpieza también se limpian, se secan y se guardan fuera de la zona de alimentos.",
          },
        ],
      },
      {
        title: "5.2 Temperaturas de referencia",
        blocks: [
          {
            kind: "table",
            head: ["Situación", "Temperatura"],
            rows: [
              ["Refrigeración de alimentos frescos y platos preparados", "Entre 0 °C y 5 °C (según producto, hasta 8 °C)"],
              ["Congelación y ultracongelación", "−18 °C o inferior"],
              ["Cocinado en el centro del producto", "Al menos 65 °C, preferible 75 °C"],
              ["Mantenimiento en caliente", "65 °C o más"],
              ["Zona de peligro", "Entre 5 °C y 65 °C"],
            ],
          },
          {
            kind: "p",
            text: "La temperatura se mide con termómetro-sonda en el centro del producto, desinfectando la sonda entre mediciones, y se anota en el registro correspondiente.",
          },
        ],
      },
      {
        title: "5.3 La cadena de frío",
        blocks: [
          {
            kind: "p",
            text: "La cadena de frío es el mantenimiento continuado de la temperatura de refrigeración o congelación desde el origen del alimento hasta su consumo. Cada interrupción acelera el crecimiento microbiano y reduce la vida útil.",
          },
          {
            kind: "list",
            items: [
              "Comprobar la temperatura en la recepción de mercancía y rechazar lo que llegue fuera de temperatura.",
              "Guardar de inmediato los productos refrigerados y congelados; no dejarlos esperando en el muelle o la cocina.",
              "No sobrecargar las cámaras y permitir la circulación del aire.",
              "Enfriar los platos cocinados con rapidez antes de refrigerarlos, en recipientes poco profundos.",
              "Un alimento descongelado no debe volver a congelarse en crudo.",
            ],
          },
        ],
      },
      {
        title: "5.4 Descongelación, conservación y rotación",
        blocks: [
          {
            kind: "list",
            items: [
              "Descongelar en refrigeración, dentro de un recipiente que recoja los líquidos, nunca a temperatura ambiente.",
              "Cubrir y etiquetar todos los alimentos almacenados con su fecha.",
              "Aplicar el sistema FIFO: lo primero que entra es lo primero que sale, respetando fechas de caducidad y de consumo preferente.",
              "No conservar alimentos en las latas o envases abiertos; pasarlos a recipientes de uso alimentario tapados.",
              "El pescado destinado a consumo en crudo o casi crudo debe congelarse previamente para prevenir el Anisakis.",
            ],
          },
          {
            kind: "note",
            title: "Fecha de caducidad y consumo preferente",
            text: "La fecha de caducidad marca un límite de seguridad: pasada esa fecha el alimento no debe consumirse. El consumo preferente indica pérdida de cualidades, no necesariamente riesgo.",
          },
        ],
      },
    ],
    quiz: [
      {
        type: "multiple",
        question: "¿Cuál es el orden correcto?",
        options: [
          "Retirar restos, lavar con detergente, aclarar, desinfectar",
          "Desinfectar y después lavar",
          "Solo desinfectar, es más rápido",
          "Aclarar, desinfectar y dejar los restos",
        ],
        correct: 0,
        explanation: "Sobre una superficie sucia el desinfectante no resulta eficaz.",
      },
      {
        type: "multiple",
        question: "La temperatura de conservación de los congelados debe ser…",
        options: ["−18 °C o inferior", "0 °C", "−5 °C", "4 °C"],
        correct: 0,
        explanation: "Congelación y ultracongelación a −18 °C o menos.",
      },
      {
        type: "multiple",
        question: "El cocinado debe alcanzar en el centro del producto al menos…",
        options: ["45 °C", "55 °C", "65 °C", "100 °C"],
        correct: 2,
        explanation: "Al menos 65 °C, siendo preferible 75 °C en el centro del alimento.",
      },
      {
        type: "boolean",
        question: "Un alimento descongelado puede volver a congelarse en crudo sin problema.",
        options: VF,
        correct: 1,
        explanation: "No debe recongelarse en crudo; se cocina antes si procede.",
      },
      {
        type: "multiple",
        question: "La forma correcta de descongelar es…",
        options: [
          "En refrigeración, en un recipiente que recoja los líquidos",
          "A temperatura ambiente en la encimera",
          "Al sol",
          "En agua caliente varias horas",
        ],
        correct: 0,
        explanation: "La descongelación en refrigeración evita la zona de peligro.",
      },
      {
        type: "multiple",
        question: "El sistema FIFO significa…",
        options: [
          "Lo primero que entra es lo primero que sale",
          "Lo último que entra sale primero",
          "Congelar todo al llegar",
          "Servir primero los platos más caros",
        ],
        correct: 0,
        explanation: "Garantiza la rotación correcta de existencias.",
      },
      {
        type: "boolean",
        question: "La fecha de caducidad indica solo una pérdida de cualidades del alimento.",
        options: VF,
        correct: 1,
        explanation: "Eso corresponde al consumo preferente; la caducidad es un límite de seguridad.",
      },
      {
        type: "multiple",
        question: "El mantenimiento en caliente de platos cocinados debe hacerse a…",
        options: ["65 °C o más", "40 °C", "50 °C", "Temperatura ambiente"],
        correct: 0,
        explanation: "Por debajo de 65 °C se entra en la zona de peligro.",
      },
      {
        type: "multiple",
        question: "¿Qué debe recogerse en el plan de limpieza?",
        options: [
          "Qué se limpia, con qué producto y dosis, frecuencia, responsable y registro",
          "Solo el nombre del producto utilizado",
          "El horario del personal",
          "Las ventas del día",
        ],
        correct: 0,
        explanation: "El plan de limpieza forma parte del sistema de autocontrol.",
      },
      {
        type: "boolean",
        question: "Los platos cocinados deben enfriarse con rapidez antes de refrigerarlos.",
        options: VF,
        correct: 0,
        explanation: "El enfriamiento rápido en recipientes poco profundos reduce el tiempo en zona de peligro.",
      },
    ],
  },
  {
    id: 6,
    tone: "lav",
    title: "Alérgenos, trazabilidad y nociones de APPCC",
    summary: "Los 14 alérgenos de declaración obligatoria, información al cliente, trazabilidad y principios del APPCC.",
    image: mod6,
    duration: "45 min",
    sections: [
      {
        title: "6.1 Alergias e intolerancias",
        blocks: [
          {
            kind: "p",
            text: "Añadido por la Asociación para completar el módulo, junto con la cartelería de alérgenos aportada por la Asociación. La alergia alimentaria es una reacción del sistema inmunitario frente a una proteína del alimento; puede ser grave e incluso mortal (shock anafiláctico) con cantidades mínimas. La intolerancia es una dificultad para digerir o metabolizar un componente, con síntomas generalmente digestivos y dependientes de la cantidad.",
          },
        ],
      },
      {
        title: "6.2 Los 14 alérgenos de declaración obligatoria",
        blocks: [
          {
            kind: "p",
            text: "El Reglamento (UE) 1169/2011 obliga a informar de la presencia de estas 14 sustancias, también en los alimentos servidos sin envasar:",
          },
          {
            kind: "list",
            items: [
              "Cereales que contengan gluten (trigo, centeno, cebada, avena, espelta, kamut).",
              "Crustáceos y productos a base de crustáceos.",
              "Huevos y productos a base de huevo.",
              "Pescado y productos a base de pescado.",
              "Cacahuetes y productos a base de cacahuetes.",
              "Soja y productos a base de soja.",
              "Leche y sus derivados, incluida la lactosa.",
              "Frutos de cáscara: almendras, avellanas, nueces, anacardos, pistachos, etc.",
              "Apio y productos derivados.",
              "Mostaza y productos derivados.",
              "Granos de sésamo y productos a base de sésamo.",
              "Dióxido de azufre y sulfitos en concentraciones superiores a 10 mg/kg o 10 mg/l.",
              "Altramuces y productos a base de altramuces.",
              "Moluscos y productos a base de moluscos.",
            ],
          },
          {
            kind: "note",
            title: "Información al cliente",
            text: "La información sobre alérgenos debe estar disponible por escrito y ser accesible: carta, ficha por plato, carpeta o cartel. No basta con que un camarero lo recuerde de memoria. Ante la duda, nunca se improvisa: se consulta la ficha o se dice claramente que no se puede garantizar.",
          },
        ],
      },
      {
        title: "6.3 Cómo evitar el contacto cruzado por alérgenos",
        blocks: [
          {
            kind: "list",
            items: [
              "Lavarse las manos y cambiar de guantes antes de preparar un plato para una persona alérgica.",
              "Utilizar utensilios, tablas, recipientes y superficies limpios y, si es posible, exclusivos.",
              "No freír en el mismo aceite alimentos con y sin alérgeno.",
              "Almacenar los productos sin alérgeno tapados y por encima del resto.",
              "Leer siempre la etiqueta de cada lote: la receta del fabricante puede cambiar.",
              "Servir el plato del cliente alérgico identificado y, preferiblemente, en primer lugar.",
            ],
          },
        ],
      },
      {
        title: "6.4 Trazabilidad",
        blocks: [
          {
            kind: "p",
            text: "La trazabilidad es la capacidad de seguir el rastro de un alimento a lo largo de toda la cadena: de dónde viene, qué se ha hecho con él y a dónde ha ido. Permite retirar del mercado con rapidez un producto con problemas.",
          },
          {
            kind: "list",
            items: [
              "Trazabilidad hacia atrás: albaranes y facturas de proveedores, lotes y fechas de recepción.",
              "Trazabilidad interna: qué lote se ha usado en qué elaboración y en qué fecha.",
              "Trazabilidad hacia delante: a quién se ha suministrado el producto (cuando se vende a otras empresas).",
              "Conservar la documentación el tiempo establecido y mantener los lotes identificados al trasvasar productos.",
            ],
          },
        ],
      },
      {
        title: "6.5 Nociones de APPCC",
        blocks: [
          {
            kind: "p",
            text: "El APPCC (Análisis de Peligros y Puntos de Control Crítico) es un sistema preventivo de autocontrol que identifica los peligros de cada etapa del proceso y establece cómo controlarlos. Las empresas alimentarias deben implantar sistemas de autocontrol basados en los principios del APPCC o aplicar guías de prácticas correctas de higiene.",
          },
          {
            kind: "list",
            items: [
              "Principio 1. Identificar y analizar los peligros en cada fase.",
              "Principio 2. Determinar los puntos de control crítico (PCC).",
              "Principio 3. Establecer los límites críticos para cada PCC.",
              "Principio 4. Establecer un sistema de vigilancia de los PCC.",
              "Principio 5. Definir las medidas correctoras cuando un PCC está fuera de control.",
              "Principio 6. Establecer procedimientos de verificación del sistema.",
              "Principio 7. Crear un sistema de documentación y registros.",
            ],
          },
          {
            kind: "p",
            text: "Antes del APPCC deben funcionar los prerrequisitos o planes generales de higiene: control del agua, limpieza y desinfección, control de plagas, mantenimiento, formación, trazabilidad, control de proveedores y gestión de residuos.",
          },
          {
            kind: "note",
            title: "El papel del manipulador",
            text: "El manipulador es quien vigila la mayoría de los puntos de control: temperaturas, tiempos, estado de las materias primas y limpieza. Anotar los registros con veracidad y avisar de las desviaciones es parte esencial de su trabajo.",
          },
        ],
      },
    ],
    quiz: [
      {
        type: "multiple",
        question: "¿Cuántas sustancias alergénicas son de declaración obligatoria en la Unión Europea?",
        options: ["8", "10", "14", "20"],
        correct: 2,
        explanation: "El Reglamento (UE) 1169/2011 establece 14 alérgenos de declaración obligatoria.",
      },
      {
        type: "multiple",
        question: "¿Cuál de estos NO está en la lista de los 14 alérgenos?",
        options: ["Apio", "Mostaza", "Tomate", "Altramuces"],
        correct: 2,
        explanation: "El tomate no forma parte de la lista de declaración obligatoria.",
      },
      {
        type: "boolean",
        question: "Basta con que el personal de sala recuerde de memoria los alérgenos de cada plato.",
        options: VF,
        correct: 1,
        explanation: "La información debe estar disponible por escrito y ser accesible al cliente.",
      },
      {
        type: "multiple",
        question: "La diferencia principal entre alergia e intolerancia es que la alergia…",
        options: [
          "Implica una reacción del sistema inmunitario y puede ser grave con cantidades mínimas",
          "Solo produce molestias digestivas leves",
          "Depende siempre de la cantidad ingerida",
          "Desaparece cocinando el alimento",
        ],
        correct: 0,
        explanation: "La alergia puede provocar shock anafiláctico con trazas del alimento.",
      },
      {
        type: "multiple",
        question: "Para preparar el plato de un cliente alérgico, lo correcto es…",
        options: [
          "Lavarse las manos, cambiar de guantes y usar utensilios limpios o exclusivos",
          "Retirar el ingrediente del plato ya emplatado",
          "Usar la misma tabla si se ve limpia",
          "Freírlo en el aceite habitual",
        ],
        correct: 0,
        explanation: "Hay que evitar cualquier contacto cruzado, incluido el aceite compartido.",
      },
      {
        type: "boolean",
        question: "Los sulfitos deben declararse cuando superan 10 mg/kg o 10 mg/l.",
        options: VF,
        correct: 0,
        explanation: "Es el umbral fijado para el dióxido de azufre y los sulfitos.",
      },
      {
        type: "multiple",
        question: "La trazabilidad hacia atrás se documenta principalmente con…",
        options: [
          "Albaranes y facturas de proveedores, lotes y fechas de recepción",
          "El libro de reservas",
          "Las encuestas de satisfacción",
          "El registro de temperaturas del comedor",
        ],
        correct: 0,
        explanation: "Permite saber de dónde viene cada producto.",
      },
      {
        type: "multiple",
        question: "¿Qué significa APPCC?",
        options: [
          "Análisis de Peligros y Puntos de Control Crítico",
          "Aplicación de Prácticas Profesionales de Cocina Colectiva",
          "Auditoría Permanente de Productos y Control de Calidad",
          "Acta de Prevención de Plagas y Contaminación Cruzada",
        ],
        correct: 0,
        explanation: "Es un sistema preventivo de autocontrol.",
      },
      {
        type: "multiple",
        question: "¿Cuántos principios tiene el sistema APPCC?",
        options: ["3", "5", "7", "14"],
        correct: 2,
        explanation: "Siete principios, desde el análisis de peligros hasta la documentación y registros.",
      },
      {
        type: "multiple",
        question: "Los prerrequisitos o planes generales de higiene incluyen…",
        options: [
          "Control del agua, limpieza y desinfección, plagas, mantenimiento, formación y trazabilidad",
          "Solo la formación del personal",
          "La carta de vinos",
          "El plan de marketing del local",
        ],
        correct: 0,
        explanation: "Deben funcionar antes de aplicar el APPCC.",
      },
      {
        type: "boolean",
        question: "El manipulador es quien vigila en el día a día la mayoría de los puntos de control.",
        options: VF,
        correct: 0,
        explanation: "Temperaturas, tiempos, materias primas y limpieza se vigilan en el puesto de trabajo.",
      },
      {
        type: "multiple",
        question: "Si un punto de control crítico se sale de sus límites, hay que…",
        options: [
          "Aplicar la medida correctora prevista y registrar la incidencia",
          "Continuar el servicio y no anotarlo",
          "Cambiar el límite crítico",
          "Esperar a la siguiente inspección",
        ],
        correct: 0,
        explanation: "El principio 5 del APPCC establece las medidas correctoras.",
      },
    ],
  },
];

export const getModule = (id: number) => modules.find((m) => m.id === id);

export const toneClasses: Record<
  Module["tone"],
  { card: string; badge: string; num: string; chip: string }
> = {
  mint: { card: "bg-mint/50", badge: "bg-mint-deep", num: "text-mint-deep", chip: "bg-mint/70" },
  sky: { card: "bg-sky/50", badge: "bg-sky-deep", num: "text-sky-deep", chip: "bg-sky/70" },
  lav: { card: "bg-lav/60", badge: "bg-lav-deep", num: "text-lav-deep", chip: "bg-lav/70" },
  peach: { card: "bg-peach/60", badge: "bg-berry", num: "text-berry", chip: "bg-peach/70" },
  butter: { card: "bg-butter/60", badge: "bg-mint-deep", num: "text-mint-deep", chip: "bg-butter/80" },
  berry: { card: "bg-peach/60", badge: "bg-berry", num: "text-berry", chip: "bg-peach/70" },
};
