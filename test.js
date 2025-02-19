const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// 自然排序函数
function naturalSortKey(a, b) {
    const reA = /[^0-9]+/;
    const reN = /[0-9]+/;
    const aKeys = a.match(reA);
    const bKeys = b.match(reA);
    let aNumb = parseInt(a.match(reN), 10);
    let bNumb = parseInt(b.match(reN), 10);

    if (aNumb && bNumb) {
        return aNumb === bNumb ? naturalSortKey(a.replace(reN, ''), b.replace(reN, '')) : aNumb - bNumb;
    } else if (aKeys[0].toLowerCase() === bKeys[0].toLowerCase()) {
        return naturalSortKey(a.replace(reA, ''), b.replace(reA, ''));
    } else {
        return aKeys[0].toLowerCase() > bKeys[0].toLowerCase() ? 1 : -1;
    }
}

function listFilesInDirectory(directoryPath) {
    return fs.readdirSync(directoryPath).filter(file => fs.lstatSync(path.join(directoryPath, file)).isFile());
}

function writeToFile(files, outputFile) {
    const ws = XLSX.utils.json_to_sheet(files.map(name => ({'File Name': name})));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, outputFile);
}

// 指定要读取的目录路径
const directoryPath = 'D:\\PM_Mainland_Trunk_20230321_r552586\\PMGameClient\\Tables\\ResXlsx';

// 获取该目录下所有文件的文件名，并进行自然排序
let files = listFilesInDirectory(directoryPath);
files.sort(naturalSortKey);

// 指定输出的Excel文件路径
const outputFile = 'output_natural_sorted_js.xlsx';  // 改为新的文件名以避免覆盖原文件

// 将文件名写入Excel文件
writeToFile(files, outputFile);

console.log(`成功生成包含已自然排序文件名的Excel文件: ${outputFile}`);