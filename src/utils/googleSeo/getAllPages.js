// utils/sitemap.js
import fs from 'fs';
import path from 'path';

const excludedPages = ['user']; // Pages or directories to exclude

const getAllPages = () => {
  const pagesDirectory = path.join(process.cwd(), 'pages');
  const pages = [];

  const collectPages = (directory) => {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const relativePath = path.relative(pagesDirectory, filePath);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        if (!excludedPages.includes(file)) {
          collectPages(filePath);
        }
      } else if (
        relativePath !== 'sitemap.xml.js' &&
        relativePath.endsWith('.jsx') &&
        !excludedPages.includes(file.replace(/\.jsx$/, ''))
      ) {
        const pagePath = relativePath.replace(/\.jsx$/, '').replace(/\\/g, '/');
        pages.push(pagePath);
      }
    });
  };

  collectPages(pagesDirectory);

  return pages;
};

export { getAllPages };
