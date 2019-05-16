# Contributing

Ware is an open source project thats helps others build dekstop progressive web apps (DPWA), utilizing our framework to speed up development. Hopefully this document makes the process for contributing clear and answers some questions that you may have!

## Semantic Versioning

Ware follows [semantic versioning](https://semver.org/). We release patch versions for bugfixes, minor versions for new features, and major versions for any breaking changes. 

## How to Contribute

You can contribute with a suggestion(s) by [creating an issues](https://github.com/warejs/reactware/issues) or by adding new features with a [pull request](https://github.com/warejs/reactware/pulls). Bellow are the steps required to create a pull request.

1. Fork the repository and create your branch from `master` with  `git branch -b feature/_name_`.
2. Run `npm i` in the repository root to install all the project dependencies.
3. Run `npm run docz` to start the development enviroment. [More on Docz](https://www.docz.site/docs/getting-started#using).
4. Create new components, update old ones, and play around in the documentation playground.
4. Build some test and ensure the test suite passes (`npm run test`).s
5. Bump the version acording to Semantic Versioning ([`npm version [major | minor | patch]`](https://docs.npmjs.com/cli/version))
6. Build the docz docs `npm run build`.
7. Commit all changes (`git add .` & `git commit -m 'my message'`) and `npm publish` your feature branch.
8. In GitHub go and create an Pull request by setting `base:master` and `compare: your-branch-name`. 
