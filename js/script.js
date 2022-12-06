// selectores
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Útiles
const hero = $("#hero");
const cardsSecundary = $("#cardsSecundary");
const createJobs = $("#createJobs");
const formulario = $("#formulario");
const filters = $("#filters");
const start = $("#start");

const getJob = (id) => {
  fetch(`https://6387ea2bd94a7e50408fb858.mockapi.io/jobs/jobs/${id}`)
    .then((res) => res.json())
    .then((data) => viewDetails(data));
};
getJob();
