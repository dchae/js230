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

  getFiltered(formdata) {
    // filter the array
    let filtered = this.values.filter((x) => {
      for (let [k, v] of formdata) if (v && x[k] != v) return false;
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

  getOptions(arr, key, selectedKey) {
    const allOption = new Option("All", "", !selectedKey);
    const res = [allOption];
    const unique = [...new Set(arr.map((obj) => obj[key]))];
    unique.forEach((key) => {
      const selected = selectedKey === String(key);
      res.push(new Option(key, key, selected, selected));
    });
    return res;
  }

  populateFilters(carsArr, selections) {
    this.filters.forEach((filter) => {
      const name = filter.name;
      const options = this.getOptions(carsArr, name, selections.get(name));
      filter.replaceChildren(...options);
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.cars = this.model.values;
    this.filterSelections = new Map();
    this.initEventListeners();
  }

  renderPage() {
    this.view.renderCars(this.cars);
    this.view.populateFilters(this.cars, this.filterSelections);
  }

  initEventListeners() {
    // add filter event listener
    this.view.filterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.filterSelections = new Map(
        [...new FormData(e.currentTarget).entries()].filter(([_, v]) => v),
      );
      this.cars = this.model.getFiltered(this.filterSelections);

      // regenerate content
      this.renderPage();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const controller = new Controller(new Model(cars), new View());
  controller.renderPage();
});
