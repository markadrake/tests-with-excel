// import fs from "fs";
// import path from "path";
const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");

var workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile("./src/test-spreadsheet.xlsx").then(function () {
	workbook.eachSheet(function (worksheet, sheetId) {
		// console.log(worksheet.name);
		let model = {};
		let properties = [];
		let data = [];

		let modelName = worksheet.name;
		model = JSON.parse(fs.readFileSync(`./src/model.${modelName}.json`));
		// console.log(JSON.stringify(model, null, 4));

		worksheet.eachRow(function (row, rowNumber) {
			if (rowNumber === 1) {
				// our properties
				row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
					properties.push(cell.value);
				});
			} else {
				// working with data
				let rowData = [];
				row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
					rowData.push(cell.value);
				});
				data.push(rowData);
			}
		});
		// console.log(JSON.stringify(properties, null, 4));
		// console.log(JSON.stringify(data, null, 4));
		// buildJSONObject(properties, data[0]);
		transformData(properties, data);
	});
});

const transformData = function (properties, data) {
	if (!properties || !data) return;

	let obj = [];

	data.forEach(dataset => {
		obj.push(buildJSONObject(properties, dataset));
	});

	console.log(JSON.stringify(obj, null, 4));
	return obj;
}

const buildJSONObject = function (properties, data) {
	if (!properties || !data) return;

	let obj = {};

	data.forEach((col, i) => {
		obj = setObjValue(obj, properties[i], data[i]);
	});

	return obj;
}

const setObjValue = function (obj, path, value) {
	if (!obj || !path || !value) return;

	const segments = path.split(".");
	let tree = obj;

	segments.forEach((segment, index, arr) => {
		if (Object.is(segments.length - 1, index)) {
			tree[segment] = value;
		} else {
			if (!tree[segment]) tree[segment] = {};
			tree = tree[segment];
		}
	});

	return obj;
}