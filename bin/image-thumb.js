#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const ImageThumb = require('../lib/ImageThumb')

program
  .version(require('../package').version)
  .usage('[options]')
  .option('-s, --src <src>', 'source image path, regexp')
  .option('-d, --dist <dist>', 'ouptput path')
  .option('-q, --quality <quality>', 'output image quality(from 1 to 100), default value is 70')
  .option('-r, --recursive', 'recursive handle images of src directory and sub-directory')
  .option('-e, --extname <extname>', 'extension name of image')

program.parse(process.argv)
const args = program.opts()
const src = args.src || '.'
const dist = args.dist || './dist'
const quality = parseInt(args.quality) || 70
const recursive = args.recursive
let extnames = args.extname ? args.extname.split(',') : []

extnames = extnames.map(n => n.toLowerCase())

if(!args.src) {
    console.log(chalk.yellow('WARNING: uncatch option src, using default value \'.\''))
}

const thumber = new ImageThumb()
thumber.start(src, dist, quality, recursive, extnames)
console.log(chalk.green('success'))
