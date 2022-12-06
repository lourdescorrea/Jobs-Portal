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

///
const getJobs2 = async (id) => {
  const response = await fetch(
    `https://6387ea2bd94a7e50408fb858.mockapi.io/jobs/jobs/${id}`
  );
  const jobs = await response.json();
  return jobs;
};

// Envio la info editada a la Api
const editJobs = (id) => {
  fetch(`https://6387ea2bd94a7e50408fb858.mockapi.io/jobs/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(saveJobsInfo()),
  }).finally(() => (window.location.href = "index.html"));
};
