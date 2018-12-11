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
          .Rw_Layouts_Flex > div > div {
            border: 1px solid #ced4dd;
            margin-right: 15px;
            padding: 10px;
            border-radius: 1px;
            text-align:center;
            background: #eef1f5
          }
          .Rw_Layouts_Grid > div,
          .Rw_Layouts_Grid > div > div > div  {
            grid-gap: 16px;
          }
          .Rw_Layouts_Grid > div > div,
          .Rw_Layouts_Grid > div > div > div > div {
            border: 1px solid #ced4dd;
            padding: 10px;
            text-align: center;
            background: #eef1f5
          }
        </style>
      `],
    },
  },
};
