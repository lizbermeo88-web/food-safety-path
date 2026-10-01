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
    ],
    quiz: [],
  },
];

export const getModule = (id: number) => modules.find((m) => m.id === id);
