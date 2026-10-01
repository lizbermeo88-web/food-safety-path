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
  | { kind: "video"; src: string }
  | { kind: "audio"; src: string }
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
            text: "Son todas aquellas personas que, por su actividad laboral, están en **contacto directo con los alimentos** durante su preparación, fabricación, transformación, elaboración, envasado, almacenamiento, transporte, distribución, venta o servicio.<br/><br/>Ser manipulador de alimentos no supone ningún riesgo de enfermar: **supone ser más responsable**. Los manipuladores tienen en sus manos la salud de los consumidores, por ello, es su responsabilidad realizar las **prácticas higiénicas adecuadas**."
          },
          {
            kind: "video",
            src: "/bienvenida.mp4"
          },
          {
            kind: "audio",
            src: "/bienvenida.mp3"
          }
        ]
      },
      {
        title: "1.2 El certificado de manipulador de alimentos",
        blocks: [
          {
            kind: "p",
            text: "Si vas a trabajar en un sector en contacto con los alimentos, necesitas un <strong>certificado de manipulador de alimentos.</strong> Este carnet acredita que cuentas con <strong>formación en materia de higiene alimentaria,</strong> necesaria para desarrollar tu trabajo."
          },
          {
            kind: "p",
            text: "Cada Comunidad Autónoma tiene su normativa en materia de higiene de los alimentos, pero el certificado de manipulador de alimentos, una vez obtenido, es <strong>válido en todo el territorio nacional.</strong>"
          },
          {
            kind: "p",
            text: "Según la Nota Informativa del 17 de noviembre de 2013, no existen actualmente las limitaciones que existían cuando estaba en vigor el <strong>Real Decreto 202/2000 sobre: caducidad de los certificados</strong>, división por sectores, ni clasificación de alto y bajo riesgo, con lo que el certificado es <strong>válido para cualquier ámbito profesional</strong> que requiera manipulación."
          },
          {
            kind: "p",
            text: "<strong>Los certificados de manipulador de alimentos expedidos posteriormente al año 2000 no tienen fecha de caducidad,</strong> eso significa que el «carnet» no caduca. No obstante, el <strong>Real Decreto 109/2010</strong> explica que no caduca el certificado, pero sí que se <strong>exige una formación continuada,</strong> lo que implica realizar cursos de reciclaje y aprendizaje. Es recomendable hacer esta formación cada 2 o 3 años."
          }
        ]
      },
      {
        title: "1.3 Objetivo del curso y marco legal",
        blocks: [
          {
            kind: "p",
            text: "Nos vamos a centrar en el <strong>Reglamento (CE) 852/2004,</strong> al ser el marco legal de aplicación en relación con los trabajadores de las empresas alimentarias. Este reglamento es aplicable desde el 1 de enero de 2006."
          },
          {
            kind: "p",
            text: "En el <strong>Capítulo XII del Anexo II del Reglamento (CE) 852/2004,</strong> relativo a «Formación», se establece que los operadores de empresa alimentaria deberán garantizar:"
          },
          {
            kind: "list",
            items: [
              "La supervisión y la instrucción o formación de los manipuladores de productos alimenticios en cuestiones de higiene alimentaria, de acuerdo con su actividad laboral.",
              "Que quienes tengan a su cargo el desarrollo y mantenimiento del procedimiento basado en los principios de <strong>APPCC</strong> (Artículo 5) o la aplicación de las guías de prácticas correctas de higiene hayan recibido una formación adecuada en lo tocante a la aplicación de los principios del <strong>APPCC.</strong>",
              "El cumplimiento de todos los requisitos de la legislación nacional relativa a los programas de formación para los trabajadores de determinados sectores alimentarios."
            ]
          },
          {
            kind: "p",
            text: "El objetivo del presente curso es facilitar a las empresas alimentarias orientaciones en el ámbito de estos tres puntos."
          }
        ]
      },
      {
        title: "1.4 Formación, instrucción y supervisión",
        blocks: [
          {
            kind: "p",
            text: "Es responsabilidad de las empresas alimentarias garantizar que el personal dispone de una formación adecuada a su puesto de trabajo."
          },
          {
            kind: "p",
            text: "A su vez, las empresas alimentarias, para poder proporcionar las garantías de que no comercializan alimentos que no son seguros, deben <strong>implantar sistemas de autocontrol basados en el análisis de peligros y puntos de control críticos (APPCC).</strong> En estos sistemas de autocontrol deben incluir la planificación de la formación que tienen establecida para los manipuladores de la empresa alimentaria."
          },
          {
            kind: "p",
            text: "La formación puede impartirse, entre otros, a través de la propia empresa alimentaria, de entidades de formación, o de centros o escuelas de formación profesional o educacional reconocidos por organismos oficiales dentro de la formación reglada."
          },
          {
            kind: "note",
            title: "Cultura de seguridad alimentaria",
            text: "La cultura de seguridad alimentaria significa que la dirección da ejemplo, que se habla de higiene en el día a día, que cualquier trabajador puede avisar de un problema sin miedo y que las incidencias se registran y se corrigen. La normativa marca el mínimo; la cultura es lo que hace que se cumpla cada día."
          }
        ]
      }
    ],
    quiz: [
      {
        type: "multiple",
        question: "¿Quién es considerado manipulador de alimentos?",
        options: [
          "Solo los cocineros de un restaurante",
          "Toda persona que, por su actividad laboral, está en contacto directo con los alimentos",
          "Solo quien elabora comida caliente",
          "Únicamente el responsable del establecimiento"
        ],
        correct: 1,
        explanation: "Incluye preparación, fabricación, transformación, elaboración, envasado, almacenamiento, transporte, distribución, venta o servicio."
      },
      {
        type: "boolean",
        question: "El certificado de manipulador de alimentos obtenido en una Comunidad Autónoma es válido en todo el territorio nacional.",
        options: VF,
        correct: 0,
        explanation: "Una vez obtenido, el certificado es válido en todo el territorio nacional."
      }
    ]
  }
];
