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
    this.srcImages = []
}

ImageThumb.prototype.start = function start(src, dist) {
    const images = this.parseSrc(src)
    this.walk(images)
} 

ImageThumb.prototype.parseSrc = function parseSrc(src) {
    
    const srcPath = path.resolve(src)
    const srcImages = []

    if(!fs.existsSync(srcPath)) {
        console.log(chalk.red(`ERROR: ${src} is not a file or directory`))
        return 
    }

    if(fs.statSync(srcPath).isFile()) {
        if(!this.isImage(srcPath)) {
            console.log(chalk.red(`ERROR: ${src} is not an image file`))
            return 
        }
        srcImages.push(srcPath)
    } else {
        const files = fs.readdirSync(srcPath)
       
        for(let i=0, length = files.length; i <length; i++ ) {
            let p = path.resolve(src, files[i])
            if(fs.statSync(p).isFile()) {
                if(this.isImage(p)) {
                    srcImages.push(p)
                }
            }
         }
    }
    
    return srcImages
}

ImageThumb.prototype.walk = function walk(imagePaths) {
    for(let i = 0, length = imagePaths.length; i < length; i++) {
        const names = path.normalize(path.resolve(imagePaths[i])).split(path.sep)
        const dirName = names.slice(0, -1).join(path.sep)
        const fileName = names.slice(-1).join(path.sep)
        const outputName = path.resolve(dirName, 'dist', fileName)
        images(imagePaths[i]).save(outputName, {
            quality: 50
        })
    }
}

ImageThumb.prototype.isImage = function isImage(src) {
    
    const file = fs.readFileSync(src)
    if(!file) {
        return false
    }
    const image = imageinfo(file)
    const imageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif'
    ]

    return imageTypes.includes(image.mimeType)
}

module.exports = ImageThumb