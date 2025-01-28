"use strict";

const cars = [
  {
    make: "Honda",
    image: "images/honda-accord-2005.jpg",
    model: "Accord",
    year: 2005,
    price: 7000,
  },
  {
    make: "Honda",
    image: "images/honda-accord-2008.jpg",
    model: "Accord",
    year: 2008,
    price: 11000,
  },
  {
    make: "Toyota",
    image: "images/toyota-camry-2009.jpg",
    model: "Camry",
    year: 2009,
    price: 12500,
  },
  {
    make: "Toyota",
    image: "images/toyota-corrolla-2016.jpg",
    model: "Corolla",
    year: 2016,
    price: 15000,
  },
  {
    make: "Suzuki",
    image: "images/suzuki-swift-2014.jpg",
    model: "Swift",
    year: 2014,
    price: 9000,
  },
  {
    make: "Audi",
    image: "images/audi-a4-2013.jpg",
    model: "A4",
    year: 2013,
    price: 25000,
  },
  {
    make: "Audi",
    image: "images/audi-a4-2013.jpg",
    model: "A4",
    year: 2013,
    price: 26000,
  },
];

class Model {
  constructor(values) {
    this.values = values;
  }

  getOptions(arr, key) {
    const unique = [...new Set(arr.map((obj) => obj[key]))];
    return unique.map((key) => new Option(key));
  }

  filter(arr, formdata) {
    // filter the array
    let filtered = arr.filter((element) => {
      for (let [k, v] of formdata) if (v && element[k] != v) return false;
      return true;
    });
    return filtered;
  }
}

class View {
  constructor() {
    this.initTemplates();
    this.filterForm = document.querySelector("#filter-form");
    this.filters = document.querySelectorAll("#filter-form select");
  }

  initTemplates() {
    this.templates = {};
    // create Handlebars templates
    this.templates.cars = Handlebars.compile(
      document.querySelector("#cars-template").innerHTML,
    );

    // register partials
    Handlebars.registerPartial(
      "car",
      document.querySelector("#car-template").innerHTML,
    );
  }

  renderCars(carsArr) {
    const html = this.templates.cars(carsArr);
    document.querySelector(".car-grid").innerHTML = html;
  }

  populateFilters(carsArr, getOptions) {
    this.filters.forEach((filter) => {
      const name = filter.name;
      const options = getOptions(carsArr, name);
      filter.append(...options);
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.cars = this.model.values;
    this.initEventListeners();
  }

  renderPage() {
    this.view.renderCars(this.cars);
    this.view.populateFilters(this.cars, this.model.getOptions);
  }

  initEventListeners() {
    // add filter event listener
    this.view.filterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const filteredCars = this.model.filter(this.cars, data);

      // regenerate content
      this.view.renderCars(filteredCars);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const controller = new Controller(new Model(cars), new View());
  controller.renderPage();
});
