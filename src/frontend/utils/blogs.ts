export interface Blog {
  header: String;
  content: String;
  image: String;
  likes: Number;
}

export interface BlogPreview {
  header: string;
  content: string;
  image: string;
  author: string;
  likes: Number;
  comments: Number;
  views: Number;
  created: string;
}

export const categories = [
  "Health & Wellness",
  "Personal Finance",
  "Travel",
  "Relationships & Family",
  "Food & Recipes",
  "Home & Decor",
  "Fashion & Beauty",
  "Hobbies & Crafts",
  "Career & Business",
  "Technology & Gadgets",
  "Personal Development",
  "Entertainment & Culture",
];

export const blogs: BlogPreview[] = [
  {
    header: "Getting Started with Web Development",
    content:
      "A beginner-friendly guide to understanding the fundamentals of web development, from HTML and CSS to JavaScript and modern frameworks.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    likes: 128,
    views: 1542,
    author: "kyleeva53",
    comments: 24,
    created: "2026-09-18",
  },
  {
    header: "Why Clean Code Matters",
    content:
      "Writing code that is easy to read, maintain, and understand can make a huge difference when working on projects with other developers.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    likes: 96,
    author: "johndoe67",
    views: 1108,
    comments: 17,
    created: "2026-09-20",
  },
  {
    header: "Understanding APIs",
    content:
      "APIs allow different applications and services to communicate with each other. Here's a simple look at how requests, responses, and endpoints work.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    likes: 74,
    views: 893,
    author: "user1",
    comments: 12,
    created: "2026-09-21",
  },
  {
    header: "A Beginner's Guide to Git",
    content:
      "Learn the basics of Git, including repositories, branches, commits, merging, and how version control helps developers work safely.",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498",
    likes: 153,
    views: 1876,
    author: "user2",
    comments: 31,
    created: "2026-09-22",
  },
];
