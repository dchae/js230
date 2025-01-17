"use strict";

// 1.
async function asyncDownloadFile() {
  console.log("Downloading file...");
  let file = await new Promise((resolve) => {
    setTimeout(() => resolve("Download complete!"), 1500);
  });
  console.log(file);
}

// asyncDownloadFile();

// 2.
// function loadData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve("Data loaded");
//       } else {
//         reject("Network error");
//       }
//     }, 1000);
//   });
// }

async function loadData() {
  try {
    let msg = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Data loaded");
        } else {
          reject("Network error");
        }
      }, 1000);
    });
    console.log(msg);
  } catch (e) {
    console.error(e);
  }
}

// loadData();

// 3.
async function fetchResource(url) {
  try {
    // const response = await fetch(url);
    // const parsed = await response.json();
    const parsed = await fetch(url).then((res) => res.json());
    console.log(parsed);
  } catch {
    console.error("Failed to load resource");
  }

  console.log("Resource fetch attempt made");
}

// // Example usage:
// fetchResource("https://jsonplaceholder.typicode.com/todos/1");
// // Logs fetched data, then "Resource fetch attempt made"
// fetchResource("invalidUrl");
// // Logs "Failed to load resource", then "Resource fetch attempt made"

// 4.
// async function fetchUserProfile(id) {
//   await fetch(`https://jsonplaceholdertypicode.com/users/${id}`)
//     .then((res) => res.json())
//     .then((obj) => console.log("Profile: ", obj))
//     .catch(() => console.error("Fetch failed"));
//
//   await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
//     .then((res) => res.json())
//     .then((obj) => console.log("Posts: ", obj))
//     .catch(() => console.error("Fetch failed"));
//
//   await fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
//     .then((res) => res.json())
//     .then((obj) => console.log("Posts: ", obj))
//     .catch(() => console.error("Fetch failed"));
// }

// async function fetchUserProfile(id) {
//   try {
//     const profile = await fetch(
//       `https://jsonplaceholdertypicode.com/users/${id}`,
//     ).then((res) => res.json());
//     console.log("Profile: ", profile);
//   } catch (e) {
//     console.log("(Caught) ", e);
//   }
//
//   try {
//     const posts = await fetch(
//       `https://jsonplaceholder.typicode.com/users/${id}/posts`,
//     ).then((res) => res.json());
//     console.log("Posts: ", posts);
//   } catch (e) {
//     console.log("(Caught) ", e);
//   }
//
//   try {
//     const todos = await fetch(
//       `https://jsonplaceholder.typicode.com/users/${id}/todos`,
//     ).then((res) => res.json());
//     console.log("Todos: ", todos);
//   } catch (e) {
//     console.log("(Caught) ", e);
//   }
// }

// async function fetchUserProfile(id) {
//   let urls = [
//     `https://jsonplaceholder.typicode.com/users/${id}`,
//     `https://jsonplaceholdertypicode.com/users/${id}/posts`,
//     `https://jsonplaceholder.typicode.com/users/${id}/todos`,
//   ];
//
//   for (let url of urls) {
//     await fetch(url)
//       .then((response) => response.json())
//       .then(console.log)
//       .catch((e) => console.error("(Caught) " + e));
//   }
// }

async function fetchUserProfile(id) {
  const toLoad = [
    {
      name: "Profile",
      url: `https://jsonplaceholder.typicode.com/users/${id}`,
    },
    {
      name: "Posts",
      url: `https://jsonplaceholdertypicode.com/users/${id}/posts`,
    },
    {
      name: "Todos",
      url: `https://jsonplaceholder.typicode.com/users/${id}/todos`,
    },
  ];

  for (let { name, url } of toLoad) {
    try {
      let obj = await fetch(url).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          let e = new Error(response.statusText);
          e.status = response.status;
          throw e;
        }
      });
      console.log(`${name}: `, obj);
    } catch (e) {
      console.error(`Failed to load ${name}\n`, e);
    }
  }
}

// Example usage:
fetchUserProfile(1);
// Logs user profile, posts, and todos. Catches and logs errors at each step if they occur.
