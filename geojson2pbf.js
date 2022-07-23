/**
 * 功能：转换 geojson为 pbf 脚本
 */

var fs = require('fs');
var geobuf = require('geobuf');
var Pbf = require("pbf");
// ps:确保输入输出路径已存在，否则会报错：no such file or directory
// ps:一个输入路径对应一个输出路径
// var inputPath = "./inputJson/point";//输入路径
// var outputPath = "./outputPbf/point";//输出路径

var inputPath = "./inputJson/line";//输入路径
var outputPath = "./outputPbf/line";//输出路径

// var inputPath = "./inputJson/polygon";//输入路径 
// var outputPath = "./outputPbf/polygon";//输出路径


function readDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        var files = fs.readdirSync(dirPath);
        var errorFileNames = [];
        files.forEach(function (file) {
            var fileName = file.replace('json', 'pbf');
            var outputName = outputPath + '/' + fileName;
            try {
                var filePath = dirPath + "/" + file;
                var buff = fs.readFileSync(filePath);
                var json = JSON.parse(buff);
                var content = geobuf.encode(json, new Pbf());
                fs.writeFileSync(outputName, content);
                console.log('输出文件：', outputName);
            } catch (error) {
                errorFileNames.push(file);
                console.log('Error---------：', error);
            }
        });
        console.log('Error文件：', errorFileNames);

    } else {
        console.log('Not Found Path : ', dirPath);
    }
}

readDirectory(inputPath);