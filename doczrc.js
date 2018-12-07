import pkg from './package.json';

// Only major and minor;
let version = pkg.version.split(".");
version = `${version[0]}.${version[1]}`;

export default {
  title: 'Reactware',
  description: 'Reactware is an open source toolkit for developing desktop PWA with HTML, CSS, and JS',
  dest: `./docs/v${version}`,
  src: './src',
  base: `/v${version}/`,
  hashRouter: true,
  htmlContext: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: '.docz/public/index.css',
        },
      ],
      raw: [`
        <style>
          .Layout.Flex > div > div {
            border: 1px solid gray;
            margin-right: 15px;
            padding: 10px 25px;
            border-radius: 1px;
            text-align:center;
          }
        </style>
      `],
    },
  },
};
