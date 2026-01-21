# My Website

[Go to my website](https://www.wzy403.com/)

## Overview

This is a personal website project built using Vue 3. It features a blog section where content is written in Markdown, a project page, and an about page.

## Features

- **Markdown Blog:** Blog posts are written in Markdown and stored in the `src/assets/blog` folder. (See Blog Posts section below for template)
- **Project Section:** Information stored in JSON. (See Folder Structure section for format)
- **About Page:** Configuration stored in JSON. (See Folder Structure section for details)

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
  - sample tags2 (Optional)
---
```

- `id`: A unique identifier for the post.
- `title`: The title of the blog post.
- `date`: The publication date of the post in `yyyy-MM-dd` format.
- `tags`: The tags for each post record in `blogTags.json` file (split by a `-`).

## Folder Structure

```
mywebsite/
├── public/                     # Static assets
├── src/
│   ├── assets/
│   │   ├── blog/               # Markdown blog posts
│   │   │   └── blogImg/        # Images used in blog posts
│   │   ├── img/                # General website images
│   │   ├── aboutCommand.json   # Terminal commands for About page
│   │   ├── projectesList.json  # Project portfolio data
│   │   ├── blogTags.json       # Blog tag list
│   │   └── colors.json         # Language color mappings
│   ├── components/             # Reusable Vue components
│   ├── composables/            # Vue 3 composition functions
│   ├── router/                 # Vue Router configuration
│   ├── styles/                 # Global SCSS styles
│   ├── views/                  # Page-level Vue components
│   ├── App.vue
│   └── main.js
├── package.json
└── vue.config.js
```

## Contributing

As this is a personal project, contributions are not currently being accepted. However, feel free to fork the repository and experiment on your own.

## License

This project is licensed under the [GPL](LICENSE) License.

## Contact

For any inquiries or feedback, please reach out to me through email: zhengyu.wang@wzy403.com.
