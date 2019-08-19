#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const ImageThumb = require('../lib/ImageThumb')

program
  .version(require('../package').version)
  .usage('[options]')
  .option('-s, --src <s>', 'source image path, regexp')
  .option('-d, --dist <d>', 'ouptput path')

program.parse(process.argv)
const args = program.opts()
const src = args.src
const dist = args.dist

if(!src) {
    console.log(chalk.yellow('WARNING: uncatch option src, using default value \'.\''))
}

const thumber = new ImageThumb()
thumber.start(src || '.', dist)
console.log(chalk.green('success'))
