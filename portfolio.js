const filters = document.querySelectorAll(".portfolio-filters button");
const portfolioItems = document.querySelectorAll(".portfolio-item");

const applyFilter = (filter) => {
  filters.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  portfolioItems.forEach((item) => {
    const categories = item.dataset.categories.split(" ");
    const isVisible = filter === "todos" || categories.includes(filter);

    item.classList.toggle("is-hidden", !isVisible);
  });

  window.history.replaceState(null, "", `#${filter}`);
};

filters.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

const initialFilter = window.location.hash.slice(1);
const availableFilters = [...filters].map((button) => button.dataset.filter);

applyFilter(availableFilters.includes(initialFilter) ? initialFilter : "todos");
