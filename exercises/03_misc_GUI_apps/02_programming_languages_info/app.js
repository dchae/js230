"use strict";

const languages = [
  {
    name: "Ruby",
    description:
      "Ruby is a dynamic, reflective, object-oriented, " +
      "general-purpose programming language. It was designed and developed in the mid-1990s " +
      "by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, " +
      "Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, " +
      "including functional, object-oriented, and imperative. It also has a dynamic type " +
      "system and automatic memory management.",
  },

  {
    name: "JavaScript",
    description:
      "JavaScript is a high-level, dynamic, untyped, and interpreted " +
      "programming language. It has been standardized in the ECMAScript language " +
      "specification. Alongside HTML and CSS, JavaScript is one of the three core " +
      "technologies of World Wide Web content production; the majority of websites employ " +
      "it, and all modern Web browsers support it without the need for plug-ins. JavaScript " +
      "is prototype-based with first-class functions, making it a multi-paradigm language, " +
      "supporting object-oriented, imperative, and functional programming styles.",
  },

  {
    name: "Brainfuck",
    description:
      "Brainfuck is an esoteric programming language created in 1993 by Swiss student Urban Müller.",
  },

  {
    name: "Lisp",
    description:
      "Lisp (historically, LISP) is a family of computer programming languages " +
      "with a long history and a distinctive, fully parenthesized prefix notation. " +
      "Originally specified in 1958, Lisp is the second-oldest high-level programming " +
      "language in widespread use today. Only Fortran is older, by one year. Lisp has changed " +
      "since its early days, and many dialects have existed over its history. Today, the best " +
      "known general-purpose Lisp dialects are Common Lisp and Scheme.",
  },
];

const HEIGHT_LIM = 50;

function toggleCollapse(e) {
  const button = e.target;
  if (button.tagName !== "A") return;
  e.preventDefault();

  const section = e.target.closest("section");
  section.classList.toggle("collapsed");
  button.textContent = section.classList.contains("collapsed")
    ? "Show More"
    : "Show Less";
}

document.addEventListener("DOMContentLoaded", () => {
  // compile Handlebars template
  const template = Handlebars.compile(
    document.querySelector("#languages").innerHTML,
  );

  // create content
  const main = document.querySelector("main");
  languages.forEach((language) => {
    const html = template(language);
    main.insertAdjacentHTML("beforeend", html);
    const section = main.lastElementChild;
    const height = section.querySelector("p").offsetHeight;
    if (height > HEIGHT_LIM) {
      section.classList.add("collapsed");
      const button = document.createElement("a");
      button.href = "#";
      button.textContent = "Show More";
      section.appendChild(button);
    }
  });

  main.addEventListener("click", toggleCollapse);
});

// function shorten(s, lim = 120) {
//   return s.slice(0, lim + 1) + "...";
// }
//
// function toggleExpand(e) {
//   if (e.target.tagName !== "A") return;
//   e.preventDefault();
//
//   const section = e.target.closest("section");
//   const id = section.dataset.id;
//
//   if (section.classList.contains("expanded")) {
//     section.classList.remove("expanded");
//     section.querySelector("p").textContent = shorten(languages[id].description);
//     e.target.textContent = "Show More";
//   } else {
//     section.classList.add("expanded");
//     section.querySelector("p").textContent = languages[id].description;
//     e.target.textContent = "Show Less";
//   }
// }
//
// document.addEventListener("DOMContentLoaded", () => {
//   // create content
//   const template = Handlebars.compile(
//     document.querySelector("#languages").innerHTML,
//   );
//
//   const main = document.querySelector("main");
//   let html = template(languages);
//   main.insertAdjacentHTML("beforeend", html);
//
//   // show only first 120 chars
//   main
//     .querySelectorAll("p")
//     .forEach((p) => (p.textContent = shorten(p.textContent)));
//
//   main.addEventListener("click", toggleExpand);
// });
