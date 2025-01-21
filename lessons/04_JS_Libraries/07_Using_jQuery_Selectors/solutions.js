"use strict";

$(() => {
  // 1.
  // let res = $("h1");

  // 2.
  // let res = $("#site_title");

  // 3.
  // let res = $("article").find("li");
  // let res = $("article li");

  // 4.
  // let res = $("article li").eq(2);

  // 5.
  // let res = $("table").find("tr").odd();

  // 6.
  // let res = $("li li:contains(ac ante)").parents("li").eq(0);

  // 7.
  // let res = $("li li:contains(ac ante)").next();

  // 8.
  // let res = $("td").last();

  // 9.
  // let res = $("td:not(.protected)");

  // 10.
  // let res = $("a").filter(function (i) {
  //   return this.getAttribute("href").startsWith("#");
  // });
  // let res = $("a[href^='#']");

  // 11.
  let res = $("[class*='block']");

  res.addClass("highlight");
});
