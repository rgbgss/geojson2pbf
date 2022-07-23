
 基于https://github.com/mapbox/geobuf和https://github.com/mapbox/pbf实现的压缩geojson流程
 
 * 使用方法：【注意事项：确保需要转换的文件，和此文件在同一路径下（并列）！！！】
 * 
 * 功能1：转换 geojson为 pbf 
 * 作用：压缩geojson
 * 1。当前路径下创建node_modules文件，打开cmd.exe在窗口中执行如下命令
 * 2。当前路径下：cmd 窗口中执行命令 npm i (安装依赖：geobuf和pbf)
 * 4。当前路径下：cmd 窗口中执行命令 node geojson2pbf
 * 5。网页中pbf文件解析为json：使用open with live server，打开geobuf.html ，页面上选择文件后点decode按钮即可查看到结果

 * 功能2：转换 geojson polygon 为 line 
 * 作用：文件批量转换
 * 1。当前路径下创建node_modules文件，打开cmd.exe在窗口中执行如下命令
 * 2。当前路径下：cmd 窗口中执行命令 npm i (安装依赖：@turf/polygon-to-line)
 * 4。当前路径下：cmd 窗口中执行命令 node geojsonPolygon2Line
 * 5。网页中pbf文件解析为json：使用open with live server，打开geobuf.html ，页面上选择文件后点ecode按钮即可查看到结果
