# image-thumb-cli

>image-thumb-cli是一个压缩图片命令行工具，直接运行命定对目标图片进行压缩（Image-thumb-cli is a command-line tool for compressing images, which directly runs the destiny to compress the target images)。

|参数|描述|
|-|-|
|-V, --version| 输出版本号
|-V, --version| output the version number
|-s, --src <src> |图片文件或者目录的原路径
|-s, --src <src> |source of image path file or dir
|-d, --dist <dist>  |输入图像的地址 默认是 './dist'
|-d, --dist <dist>  |ouptput image directory default value is './dist'
|-q, --quality <quality>|压缩图片的质量，取值范围1-100
|-q, --quality <quality>|output image quality(from 1 to 100), |default value is 70
|-r, --recursive | 当src是一个目录时，是否递归处理图像
|-r, --recursive |recursive handle images of src directory and sub-directory，it works when src is a directory
|-e, --extname <extname> | 限制图像扩展名
|-e, --extname <extname> | limit extension name of image
|-h, --help |输出帮助信息
|-h, --help |output usage information

>usage

安装（install）

```
npm install image-thumb-cli -g
```

使用（usge）

```
cd path

image-thumb -s ./ -d dist -q 70
```

>example

加入我们有这么一个目录/path/，目录结构如下，接下来的所有例子默认在/path/下执行。

```
path
  a.png
  b.jpg
  c.jpeg
  dir
    e.png
    f.jpg
```

cmd
```
image-thumb -s .
```
optput

```
path
  a.png
  b.jpg
  c.jpeg
  dist +
    a.png +
    b.jpg +
    c.jpeg +
      dir +
      e.png +
      f.jpg +
  dir
    e.png
    f.jpg
```