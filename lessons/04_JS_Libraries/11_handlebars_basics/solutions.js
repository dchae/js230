"use strict";

let posts = [
  {
    title: "Lorem ipsum dolor sit amet",
    published: "April 1, 2015",
    body: "<p>Sed ut <em>perspiciatis</em> unde <strong>omnis iste natus</strong> error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>",
    tags: ["launch school", "blog post", "2025", "handlebars"],
  },

  {
    title: "Test Post 2",
    published: "January 18, 2025",
    body: "<p>Pellentesque <em>fermentum</em> eros odio, a fermentum <strong>erat sodales</strong> et. Proin sit amet sollicitudin nisi, vitae finibus est. Aenean ac dictum libero, finibus imperdiet risus. Proin aliquam enim eget lectus lacinia eleifend. Etiam ut laoreet enim. Praesent pharetra purus nulla, in rutrum nibh bibendum eu. Praesent elementum, elit ac ullamcorper mollis, leo ante feugiat velit, luctus malesuada ante mauris sit amet justo. Proin sed vehicula dui. Etiam id nunc ac eros posuere efficitur viverra ut felis. Praesent quis nisl sit amet nibh dignissim elementum. Etiam blandit condimentum consequat. Proin laoreet elementum augue at cursus. Aenean ut euismod elit, nec posuere libero. In id dui sit amet sapien tristique congue. Morbi consequat auctor ex, ut viverra turpis. Duis sagittis, diam fermentum posuere vestibulum, mauris nisl pretium ex, at elementum nibh justo et ante. Integer volutpat laoreet libero, eu iaculis leo tempor non. Aliquam sed ornare enim. Morbi aliquam ante id velit facilisis tempus. Donec ac ultrices diam, eu pellentesque purus. Integer finibus dolor leo, at consectetur mauris dapibus id. Etiam posuere erat et convallis placerat. Integer eu magna interdum, mattis turpis eget, scelerisque mi. Nunc enim est, sollicitudin et sodales non, elementum sit amet sapien. Phasellus at pretium tortor, nec congue nulla.</p>",
  },
];

$(() => {
  let postsTemplate = Handlebars.compile($("#posts").html());
  Handlebars.registerPartial("tag", $("#tag").html());

  $("body").html(postsTemplate({ posts }));
});
