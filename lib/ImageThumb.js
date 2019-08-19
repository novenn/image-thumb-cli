 const fs = require('fs')
 const path = require('path')
 const chalk = require('chalk')
 const imageinfo = require('imageinfo')
 const images = require('images')
 
 function ImageThumb() {
    if(ImageThumb.instance) {
        return ImageThumb.instance
    }else {
        ImageThumb.instance = this
    }
}

ImageThumb.prototype.start = function start(src, dist, quality, recursive ,extnames = []) {
  let srcDir = ''
  const srcPath = path.resolve(src)
  if(!fs.existsSync(srcPath)) {
    console.log(chalk.red(`ERROR: ${src} is not a file or directory`))
    return 
  }

  if(fs.statSync(srcPath).isFile()) {
    srcDir = path.dirname(srcPath)
  } else {
    srcDir = srcPath
  }
  const imgs = this.parseSrc(srcDir, src, dist, recursive, [], extnames)
  this.walk(imgs, quality)
} 

ImageThumb.prototype.parseSrc = function parseSrc(srcDir, src, dist, recursive, srcImages = [], extnames = []) {
    const srcPath = path.resolve(src)
    if(fs.statSync(srcPath).isFile()) {
        if(!this.isImage(srcPath)) {
            console.log(chalk.red(`ERROR: ${src} is not an image file`))
            return []
        }
        srcImages.push({
          src: srcPath,
          dist: this.getDistPath(srcDir, srcPath, dist)
        })
    } else {
        const files = fs.readdirSync(srcPath)
        for(let i=0, length = files.length; i <length; i++ ) {
            let p = path.resolve(src, files[i])
            if(fs.statSync(p).isFile()) {
                if(this.isImage(p) && this.isTargetFile(p, extnames)) {
                    srcImages.push({
                      src: p,
                      dist: this.getDistPath(srcDir, p, dist)
                    })
                }
            } else if(recursive) {
              this.parseSrc(srcDir, path.join(src, files[i]), dist, recursive, srcImages, extnames)
            }
         }
    }
    
    return srcImages
}

ImageThumb.prototype.getDistPath = function (srcDir, srcPath, dist) {
  const fileName = srcPath.slice(srcDir.length + 1)
  return path.resolve(dist, fileName)
}

ImageThumb.prototype.walk = function walk(imgs, quality) {
    for(let i = 0, length = imgs.length; i < length; i++) {
        const img = imgs[i]
        const dirName = path.dirname(img.dist)

        if(!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName, '777')
        }

        images(img.src).save(img.dist, {
            quality
        })
    }
}

ImageThumb.prototype.isImage = function isImage(src) {
    const file = fs.readFileSync(src)
    if(!file) {
        return false
    }
    return imageinfo(file)
}

ImageThumb.prototype.isTargetFile = function isTargetFile(fileName, extnames) {
  if(!extnames.length) {
    return true
  }
  const extname = path.extname(fileName).slice(1)
  return extnames.includes(extname.toLowerCase())
}

module.exports = ImageThumb