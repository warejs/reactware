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
  themeConfig: {
    
    showPlaygroundEditor: true,
  },
  htmlContext: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: '.docz/public/index.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://codemirror.net/theme/eclipse.css'
        }
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

          .Rw_Layouts_Grid_Alignments > div > div {
            height: 75px;
          }

          .Rw_Layouts_Grid_Alignments > div > div > div {
            border: 1px dotted silver;
          }
          .Rw_Layouts_Absolute {
            height: 150px;
          }

          .Rw_Layouts_Absolute > div {
            border: 1px solid #ced4dd;
            padding: 10px;
            background: #eef1f5
          }

          .Rw_Layouts_Absolute > div > div {
            border: 1px solid #ced4dd;
            padding: 10px;
            background: #d7d9de;
          }

          .Rw_Layouts_Fixed {
            height: 215px;
          }

          .Rw_Layouts_Fixed iframe {
            width: 100%;
            border: none;
            top: 0;
            left: 0px;
            position: absolute;
            height: 215px;
          }

          .Rw_Utils_Frame iframe {
            border: 1px dotted #ced4dd; 
          }

          .Rw_UI_Tooltip {
            padding: 25px;
            text-align: center;
          }

          .Rw_UI_Tooltip > span > div {
            display: block;
            position: relative;
            height: 73px;
            width: 96px;
            border: 1px dotted gray;
            border-radius: 3px;
          }

          .Rw_UI_Tooltip > span > div:after {
            content: "Hover Me";
            top: 0;
            left: 0;
            right: 0;
            bottom: 0px;
            padding-top: 35%;
            display: block;
            position: absolute;
            color: gray;
          }

          .Rw_UI_Tooltip_long {
            padding-top: 5em !important;
          }

          .dark_theme {
            background: #535353
          }

        </style>
      `],
    },
  },
};
