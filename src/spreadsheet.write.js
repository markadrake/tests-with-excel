const data = [
	{
		"type": "articles",
		"id": "1",
		"attributes": {
			"title": "JSON API paints my bikeshed!"
		},
		"relationships": {
			"author": {
				"links": {
					"self": "http://example.com/articles/1/relationships/author",
					"related": "http://example.com/articles/1/author"
				},
				"data": { "type": "people", "id": "9" }
			},
			"comments": {
				"links": {
					"self": "http://example.com/articles/1/relationships/comments",
					"related": "http://example.com/articles/1/comments"
				},
				"data": [
					{ "type": "comments", "id": "5" },
					{ "type": "comments", "id": "12" }
				]
			}
		},
		"links": {
			"self": "http://example.com/articles/1"
		}
	}
];

// import fs from "fs";
// import path from "path";
const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");

const getProperties = function (data) {
	var properties = [];
	for (prop in data) {
		if (typeof data[prop] == typeof {}) {
			let currentProp = prop;
			var objectProps = getProperties(data[prop]);
			objectProps.forEach(childProp => {
				properties.push(`${currentProp}.${childProp}`)
			});
		} else {
			properties.push(prop);
		}
	}
	return properties;
}

const getData = function (data) {
	const array = [];
	for (let prop in data) {
		if (typeof data[prop] == typeof {}) {
			let childArray = getData(data[prop]);
			childArray.forEach(child => {
				array.push(child);
			});
		} else {
			array.push(data[prop]);
		}
	}
	return array;
}

var workbook = new ExcelJS.Workbook();
var sheet = workbook.addWorksheet("blog", {
	views: [
		{
			ySplit: 1
		}
	]
});

// Add header row
sheet.addRow(getProperties(data[0]));

// Add data rows
data.forEach((row) => {
	sheet.addRow(getData(row));
});

// Write excel file
workbook.xlsx.writeFile("./src/test-spreadsheet-write.xlsx").then(function () {
	// done
});