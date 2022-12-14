/**
 * UTILS
 */
// Functions to select elements
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Functions to show or hide elements
const hideElement = (selector) => selector.classList.add("hidden");
const showElement = (selector) => selector.classList.remove("hidden");

/**
 * CONSTANTS
 */
// Api base url
const baseUrl = "https://6387ea2bd94a7e50408fb858.mockapi.io/jobs/jobs";

// Sections html ids
const sectionsIds = {
  hero: "#hero",
  jobForm: "#container-job-form",
  list: "#container-list",
  filters: "#container-filters",
  loading: "#loading-indicator",
  detail: "#container-details",
  delete: "#container-confirm-delete",
};

const emptyFilterOption = "Opciones";

const filtersIds = {
  location: "#filter-location",
  seniority: "#filter-seniority",
  category: "#filter-category",
  search: "#filter-search",
  clear: "#filter-clear",
};

const navItemIds = {
  home: "#nav-home",
  create: "#nav-create-job",
  homeMobile: "#nav-homeMobile",
  createMobile: "#nav-create-jobMobile",
};

const formIds = {
  name: "#job-form-field-name",
  description: "#job-form-field-description",
  location: "#job-form-field-location",
  seniority: "#job-form-field-seniority",
  id: "#job-form-field-id",
  category: "#job-form-field-category",
  submit: "#submit-job-form",
  form: "#job-form",
};

const deleteIds = {
  confirm: "#confirm-delete",
  cancel: "#confirm-cancel",
};

/**
 * SELECTORS
 */
const sectionHero = $(sectionsIds.hero);
const sectionJobForm = $(sectionsIds.jobForm);
const sectionList = $(sectionsIds.list);
const sectionFilters = $(sectionsIds.filters);
const loadingIndicator = $(sectionsIds.loading);
const sectionDetail = $(sectionsIds.detail);
const sectionDelete = $(sectionsIds.delete);
const jobForm = $(formIds.form);
const filterLocation = () => $(filtersIds.location);
const filterSeniority = () => $(filtersIds.seniority);
const filterCategory = () => $(filtersIds.category);

/**
 * API CALLS
 */
// Get all
const getJobs = async () => {
  const response = await fetch(baseUrl);

  return await response.json();
};

// Get by filter
const getJobsByFilter = async (field, value) => {
  const response = await fetch(`${baseUrl}?${field}=${value}`);

  return await response.json();
};

// Get by id
const getJob = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);

  return await response.json();
};

// Create
const createJob = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(data),
  };

  return await fetch(baseUrl, options);
};

// Update
const editJob = async (id, data) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(data),
  };

  return await fetch(`${baseUrl}/${id}`, options);
};

// Delete
const deleteJob = async (id) => {
  const options = {
    method: "DELETE",
  };

  return await fetch(`${baseUrl}/${id}`, options);
};

/**
 * NAVIGATION
 */
const showHome = () => {
  hideElement(sectionJobForm);
  hideElement(sectionDetail);
  hideElement(sectionDelete);
  hideElement(loadingIndicator);

  showElement(sectionHero);
  showElement(sectionFilters);
  showElement(sectionList);
};

const showCreate = () => {
  hideElement(sectionDetail);
  hideElement(sectionDelete);
  hideElement(loadingIndicator);
  hideElement(sectionHero);
  hideElement(sectionFilters);
  hideElement(sectionList);

  jobForm.reset();

  showElement(sectionJobForm);
};

const showEdit = () => {
  hideElement(sectionDelete);
  hideElement(loadingIndicator);
  hideElement(sectionHero);
  hideElement(sectionFilters);
  hideElement(sectionList);
  hideElement(sectionDetail);

  showElement(sectionJobForm);
};

const showDetail = () => {
  hideElement(sectionDelete);
  hideElement(loadingIndicator);
  hideElement(sectionHero);
  hideElement(sectionFilters);
  hideElement(sectionJobForm);
  hideElement(sectionList);

  showElement(sectionDetail);
};

const showDelete = () => {
  hideElement(loadingIndicator);
  hideElement(sectionHero);
  hideElement(sectionFilters);
  hideElement(sectionList);
  hideElement(sectionJobForm);
  hideElement(sectionDetail);

  showElement(sectionDelete);
};

const showLoading = (showFilters = false) => {
  hideElement(sectionDelete);
  hideElement(sectionList);
  hideElement(sectionJobForm);
  hideElement(sectionDetail);

  if (showFilters) {
    showElement(sectionFilters);
    showElement(sectionHero);
  } else {
    hideElement(sectionHero);
    hideElement(sectionFilters);
  }

  showElement(loadingIndicator);
};

/**
 * ELEMENTS
 */
const jobListItem = (job) => {
  const { id, name, description, location, category, seniority } = job;

  return `
<div class="flex flex-col justify-center items-center p-4 w-60 bg-slate-200 drop-shadow-lg hover:scale-105 ">
   <div class="text-gray-900 font-bold text-lg mb-2">${name}</div>
      <p class="text-sm mt-2">${description}</p>
      
      <div class="text-white flex flex-wrap justify-center items-center mt-4 ">
          <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm  mr-2 mb-2">${location}</p>
          <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm  mr-2 mb-2">${category}</p>
          <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm  mr-2 mb-2">${seniority}</p>
      </div>

      <button onclick="renderDetails(${id})" class="px-6 m-1 w-auto h-8 text-white  bg-[#4daaf2] hover:bg-blue-600  rounded-full btn-detail">
      Ver Detalles
      </button>
    </div>
</div>
`;
};

const jobDetailCard = (job) => {
  const { id, name, description, location, category, seniority } = job;

  return `<div class="max-w-xl flex  bg-white rounded-lg border border-gray-400 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div class="p-8">
        <h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white text-center">
          ${name}
        </h5>

      <p class="text-sm mt-2">${description}</p>
      
      <div class="flex justify-center items-center text-white  mt-4">
          <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm  mr-2 mb-2">${location}</p>
          <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm  mr-2 mb-2">${category}</p>
          <p class="inline-block bg-blue-900 rounded px-3 py-1 text-sm  mr-2 mb-2">${seniority}</p>
      </div>
  
      <div class = "flex justify-center items-center text-white space-x-4 mt-4">
      <button onClick="renderEdit(${id}, '${name}', '${description}', '${location}', '${category}', '${seniority}')" class="px-6 m-1 w-auto h-8 text-white  bg-[#4daaf2] hover:bg-blue-600  rounded-full btn-detail">
        Editar
      </button>
      <button onClick="renderDelet(${id})" class="px-6 m-1 w-auto h-8 text-white  bg-[#4daaf2] hover:bg-blue-600  rounded-full btn-detail">
        Eliminar
      </button>
      </div>
 </div>
</div>
`;
};

const filterOption = (value) => `<option value="${value}">${value}</option>`;

/**
 * RENDERING
 */
// Generate and insert the list of cards
const renderJobs = (jobs) => {
  sectionList.innerHTML = "";

  for (const job of jobs) {
    sectionList.innerHTML += jobListItem(job);
  }
};

// Generate and insert the options of the filters
const renderFilters = (jobs) => {
  const locations = [emptyFilterOption];
  const seniorities = [emptyFilterOption];
  const categories = [emptyFilterOption];

  for (const { location, seniority, category } of jobs) {
    if (!locations.includes(location)) {
      locations.push(location);
    }
    if (!seniorities.includes(seniority)) {
      seniorities.push(seniority);
    }
    if (!categories.includes(category)) {
      categories.push(category);
    }
  }

  const locationsOptions = locations.map(filterOption);
  filterLocation().innerHTML = locationsOptions.join("");

  const seniorityOptions = seniorities.map(filterOption);
  filterSeniority().innerHTML = seniorityOptions.join("");

  const categoryOptions = categories.map(filterOption);
  filterCategory().innerHTML = categoryOptions.join("");
};

const renderDetails = async (id) => {
  // 1. show loading
  showLoading(true);

  // fetch the job
  const job = await getJob(id);

  // set the element
  sectionDetail.innerHTML = jobDetailCard(job);

  // show the section
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  showDetail();
};

const renderEdit = (id, name, description, location, category, seniority) => {
  setFormValues({
    id,
    name,
    description,
    location,
    category,
    seniority,
  });

  showEdit();
};

const renderDelet = (id) => {
  showDelete();

  $(deleteIds.confirm).onclick = () => onDelete(id);
  $(deleteIds.cancel).onclick = showHome;
};

/**
 * FORM VALUES HANDLER
 */
const getFormValues = () => {
  return {
    name: $(formIds.name).value,
    description: $(formIds.description).value,
    category: $(formIds.category).value,
    location: $(formIds.location).value,
    seniority: $(formIds.seniority).value,
    id: $(formIds.id).value,
  };
};

const setFormValues = (job) => {
  const { name, description, category, location, seniority, id } = job;

  $(formIds.name).value = name;
  $(formIds.description).value = description;
  $(formIds.category).value = category;
  $(formIds.location).value = location;
  $(formIds.seniority).value = seniority;
  $(formIds.id).value = id;
};

/**
 * HANDLERS
 */
const onLoad = async () => {
  // 1. show loading
  showLoading(true);

  // 2. fetch jobs
  const jobs = await getJobs();

  // 3. render jobs list
  renderJobs(jobs);

  // 4. render filters options
  renderFilters(jobs);

  // 5. hidde loading and show list after two seconds
  await new Promise((resolve) => setTimeout(() => resolve(), 2000));
  showHome();
};

const onFilter = async () => {
  // 1. show loading
  showLoading(true);

  // 2. fetch jobs
  const location = filterLocation().value;
  const seniority = filterSeniority().value;
  const category = filterCategory().value;

  let field = "";
  let value = "";

  if (location !== emptyFilterOption) {
    field = "location";
    value = location;
  } else if (seniority !== emptyFilterOption) {
    field = "seniority";
    value = seniority;
  } else if (category !== emptyFilterOption) {
    field = "category";
    value = category;
  } else {
    return;
  }

  const jobs = await getJobsByFilter(field, value);

  // 3. render jobs list
  renderJobs(jobs);

  // 4. hidde loading and show list after two seconds
  await new Promise((resolve) => setTimeout(() => resolve(), 2000));
  showHome();
};

const onClearFilters = async () => {
  // 1. show loading
  showLoading(true);

  // 2. fetch jobs
  const jobs = await getJobs();

  // 3. render jobs list
  renderJobs(jobs);

  // 4. render filters options and clear values
  renderFilters(jobs);
  filterLocation().value = emptyFilterOption;
  filterSeniority().value = emptyFilterOption;
  filterCategory().value = emptyFilterOption;

  // 5. hidde loading and show list after two seconds
  await new Promise((resolve) => setTimeout(() => resolve(), 2000));
  showHome();
};

const onSubmit = async (e) => {
  // 0. avoid native action
  e.preventDefault();

  // 1. show loading
  showLoading(true);

  // 2. get values
  const { id, ...job } = getFormValues();

  // 3. create or update the job if the id exist in the form
  if (id) {
    await editJob(id, job);
  } else {
    await createJob(job);
  }

  // 4. get jobs
  const jobs = await getJobs();

  // 3. render jobs list
  renderJobs(jobs);

  // 4. render filters options
  renderFilters(jobs);

  // 5. hidde loading and show list after two seconds
  await new Promise((resolve) => setTimeout(() => resolve(), 2000));
  showHome();
};

const onDelete = async (id) => {
  // 1. show loading
  showLoading(true);

  // 2. get values
  await deleteJob(id);

  // 3. get jobs
  const jobs = await getJobs();

  // 4. render jobs list
  renderJobs(jobs);

  // 5. render filters options
  renderFilters(jobs);

  // 6. hidde loading and show list after two seconds
  await new Promise((resolve) => setTimeout(() => resolve(), 2000));
  showHome();
};

/**
 * LISTENERS
 */
// Listen to the page load completed
window.addEventListener("load", onLoad);

// Listen to the filters search button click event
$(filtersIds.search).addEventListener("click", onFilter);

// Listen to the filters clear button click event
$(filtersIds.clear).addEventListener("click", onClearFilters);

// Listen to navigation buttons
$(navItemIds.home).addEventListener("click", showHome);
$(navItemIds.create).addEventListener("click", showCreate);

// Listen to navigation mobile
$(navItemIds.homeMobile).addEventListener("click", showHome);
$(navItemIds.createMobile).addEventListener("click", showCreate);

// Listen to the form submit event
jobForm.addEventListener("submit", onSubmit);

//  Listen to the nav mobile button click event
$("#burguerMobile").addEventListener("click", () => {
  $("#mobile-nav-bar").classList.remove("hidden");
  $("#crussMobile").classList.remove("hidden");
  $("#burguerMobile").classList.add("hidden");
});

$("#crussMobile").addEventListener("click", () => {
  $("#mobile-nav-bar").classList.add("hidden");
  $("#crussMobile").classList.add("hidden");
  $("#burguerMobile").classList.remove("hidden");
});
