import pkg from './package.json';

export default {
  dest: `./docs/v${pkg.version}`,
  src: './src',
  base: `/v${pkg.version}/`,
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
          .warelayoutflex > div > div {
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
