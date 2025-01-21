"use strict";

let products = [
  {
    name: "Banana",
    quantity: 14,
    price: 0.79,
  },
  {
    name: "Apple",
    quantity: 3,
    price: 0.55,
  },
];

$(() => {
  Handlebars.registerPartial("productTemplate", $("#productTemplate").html());
  let productTemplate = Handlebars.compile($("#productTemplate").html());
  let productsList = Handlebars.compile($("#productsList").html());
  let $list = $("ul");
  let productsHtml = productsList(products);

  $list.html(productsHtml);

  // Create a new product
  let newProduct = {
    name: "Soup",
    quantity: 1,
    price: 1.29,
  };

  // Render the new product with the product template
  $list.append(productTemplate(newProduct));
});
