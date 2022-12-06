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

// Función que trae la información del formulario
const saveJobsInfo = () => {
  return {
    name: $("#nameJobs").value,
    description: $("#description").value,
    category: $("#category").value,
    location: $("#location").value,
    seniority: $("#seniority").value,
  };
};

const deleteJobs = (id) => {
  fetch(`https://6387ea2bd94a7e50408fb858.mockapi.io/jobs/jobs/${id}`, {
    method: "DELETE",
  }).finally(() => (window.location.href = "index.html"));
};

// Envio la info de la Api
const creatingJobs = () => {
  fetch(`https://6387ea2bd94a7e50408fb858.mockapi.io/jobs/jobs/`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(saveJobs()),
  }).finally(() => (window.location.href = "index.html"));
};

const saveJobs = () => {
  return {
    name: $("#nameJobs").value,
    description: $("#description").value,
    category: $("#category").value,
    location: $("#location").value,
    seniority: $("#seniority").value,
  };
};

// genera la cards

const renderJobs = (jobs) => {
  $("#container").innerHTML = "";

  $("#container").innerHTML += `
        <div class="  flex flex-col p-4 w-60 bg-slate-200 drop-shadow-lg hover:scale-105 ">
        <div class="text-gray-900 font-bold text-xl mb-2">${name}</div>
        
            <p class="text-sm mt-2">${description}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
            consectetur unde ipsum nesciunt autem deleniti ipsa rerum dolor!
            </p>
            
            <div class="text-white items-center mt-4">
                <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm   mr-2 mb-2">${location}</p>
                <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm  mr-2 mb-2">${category}</p>
                <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm  mr-2 mb-2">${seniority}</p>
            </div>

            <button class="px-6 m-1 w-auto h-8 text-white  bg-[#4daaf2] hover:bg-blue-600  rounded-full btn-detail" data-id="${id}">
            Ver Detalles
            </button>
        </div>

`;
};
for (const btn of $$(".btn-detail")) {
  btn.addEventListener("click", () => {
    hideElement(container);
    hideElement(filters);
    showElement(details);
    const jobsId = btn.getAttribute("data-id");
    getJobs2(jobsId).then((data) => viewDetails(data));
  });
}

const viewDetails = (jobs) => {
  $("#container").innerHTML = "";
  $("#details").innerHTML = `
  
        <div class="max-w-xl flex  bg-white rounded-lg border border-gray-400 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="p-8">
                  <h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white text-center">
                  ${jobs.name}</h5>
  
                  <p class="text-sm mt-2">${jobs.description}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
                  consectetur unde ipsum nesciunt autem deleniti ipsa rerum dolor!
                  </p>
                  
                  <div class="flex justify-center items-center text-white  mt-4">
                      <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm   mr-2 mb-2">${jobs.location}</p>
                      <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm  mr-2 mb-2">${jobs.category}</p>
                      <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm  mr-2 mb-2">${jobs.seniority}</p>
                  </div>
              
                  <div class = "flex justify-center items-center text-white space-x-4 mt-4">
                      <a href="#" class=" flex justify-center items-center h-8 w-20 rounded-full  bg-[#4daaf2] btn btnEdit" data-id="${jobs.id}">Editar</a>
                      <a href="#" class=" flex justify-center items-center h-8 w-20 rounded-full bg-red-600 btn btnDelete" data-id="${jobs.id}">Eliminar</a>
                  </div>
             </div>
        </div>
      `;

  for (const btn of $$(".btnEdit")) {
    btn.addEventListener("click", () => {
      hideElement(filters);
      hideElement(details);
      const jobsId = btn.getAttribute("data-id");
      $("#submit").setAttribute("data-id", jobsId);
      getJobs2(jobsId).then((data) => viewForms(data));
    });
  }

  for (const btn of $$(".btnDelete")) {
    btn.addEventListener("click", () => {
      const jobsId = btn.getAttribute("data-id");
      $("#delete").setAttribute("data-id", jobsId);
      deleteJobs(jobsId);
    });
  }
};

// Función para formulario editar desde card detalles
const viewForms = (jobs) => {
  $("#container").innerHTML = "";
  showElement(formulario);

  $("#nameJobs").value = jobs.name;
  $("#description").value = jobs.description;
  $("#location").value = jobs.location;
  $("#seniority").value = jobs.seniority;
  $("#category").value = jobs.category;
};
