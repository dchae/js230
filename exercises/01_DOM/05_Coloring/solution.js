"use strict";

function colorGeneration(n) {
  let arr;
  for (let i = 0; i < n; i++) {
    arr = arr ? arr.flatMap((e) => [...e.children]) : [...document.body.children];
  }

  if (arr) arr.forEach((e) => e.classList.add("generation-color"));
}

// var colorGeneration=(n,i=0,arr)=>
// (i<n)?colorGeneration(n,i+1,arr?.flatMap((e)=>[...e.children])??[...document.body.children]):arr?.forEach((e)=>e.classList.add("generation-color"));

colorGeneration(0);
