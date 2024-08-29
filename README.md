# My Website

[Go to my website](https://www.wzy403.com/)

## Overview

This is a personal website project built using Vue 3. It features a blog section where content is written in Markdown.

## Features

- **Vue 3:** The project is developed using Vue 3.
- **Markdown Blog:** Blog posts are written in Markdown and stored in the `src/assets/blog` folder.
- **Post Metadata:** Each blog post includes a metadata header.

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/wzy403/mywebsite.git
    cd mywebsite
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Run the development server:**
    ```sh
    npm run serve
    ```

4. **Build for production:**
    ```sh
    npm run build
    ```

## Blog Posts

Blog posts are written in Markdown and should be placed in the `src/assets/blog` folder. Each post must begin with the following metadata template:

```markdown
---
id: 114514
title: example title
date: yyyy-MM-dd
tags: 
  - sample tags1
  - sample tags2
---
```

- `id`: A unique identifier for the post.
- `title`: The title of the blog post.
- `date`: The publication date of the post in `yyyy-MM-dd` format.
- `tags`: The tags for each post record in `blogTags.json` file (split by a `-`).

## Folder Structure

```
mywebsite/
├── public/
├── src/
│   ├── assets/
│   │   └── blog/
│   │   │   └── blogImg/
│   │   └── img/
│   ├── components/
|   ├── router/
│   ├── views/
│   ├── App.vue
│   └── main.js
├── .gitignore
├── README.md
├── package.json
└── webpack.config.js
```

## Contributing

As this is a personal project, contributions are not currently being accepted. However, feel free to fork the repository and experiment on your own.

## License

This project is licensed under the [GPL](LICENSE) License.

## Contact

For any inquiries or feedback, please reach out to me through email: zhengyu.wang@wzy403.com.
