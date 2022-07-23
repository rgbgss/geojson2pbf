/**
 * 功能：转换 geojson为 pbf 脚本
 */

var fs = require('fs');
var turf = require('@turf/polygon-to-line');

// ps:确保输入输出路径已存在，否则会报错：no such file or directory

var inputPath = "./inputJson/polygon";//输入路径
var outputPath = "./outputLine";//输出路径

function readDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        var files = fs.readdirSync(dirPath);

        files.forEach(function (file) {
            var filePath = dirPath + "/" + file;
            var buff = fs.readFileSync(filePath);
            var json = JSON.parse(buff);
            var features = [];
            json.features.forEach(f => {
                var geometryType = f.geometry.type;
                var lineFeature = {};
                if (geometryType === 'MultiPolygon') {
                    var fc = turf.multiPolygonToLine(f);
                    // 如果是多面，转换为多线
                    const coordinates = fc.features.map(lf => lf.geometry.coordinates);
                    lineFeature = {
                        ...fc.features[0],
                        geometry: {
                            "type": "MultiLineString",
                            "coordinates": coordinates
                        }
                    }
                } else if (geometryType === 'Polygon') {
                    // 如果是面，转换为线
                    lineFeature = turf.polygonToLine(f);
                }
                features.push(lineFeature);
            });
            var content = JSON.stringify({
                "type": "FeatureCollection",
                features: features
            });
            var outputName = outputPath + '/' + file;
            fs.writeFileSync(outputName, content);
            console.log('输出文件：', outputName);
        });
    } else {
        console.log('Not Found Path : ', dirPath);
    }
}

readDirectory(inputPath);