	// npm install msexcel-builder
	var excelbuilder = require('msexcel-builder');
	var commonFunctions = require('../app/common-functions');
	var util = require('util');
	var moment = require("moment");

	var FONT_FAMILY = '3';
	var FONT_FAMILY_NAME = 'arial';
	var FONT_SIZE = '12';
	var MAX_ROWS = 100;
	var MAX_COLS = 12;
	var ROW_HEIGHT = 24;
	var ALIGN_LEFT = 'left';
	var ALIGN_RIGHT = 'right';
	var ALIGN_CENTER = 'center';
	
	//------- header table -------//
	var COL_HEADER_TEXT = 1;
	var COL_HEADER_VALUE = 4;
	//------- data table -------//
	var COL_DATE = 1;
	var COL_TYPE = 2;
	var COL_FORMAT = 3;
	var COL_QUANTITY = 4;
	var COL_SALEPRICE = 5;
	var COL_AMOUNT = 6;

	//------- data columns text -------//
	var COL_DATE_TEXT = 'createdDate';
	var COL_CODE_TEXT = 'code';
	var COL_QUANTITY_TEXT = 'quantity';
	var COL_SALEPRICE_TEXT = 'salePrice';
	//------- footer table -------//
	var COL_FOOTER_TEXT = 1;
	var COL_FOOTER_VALUE = 6;
	
	var COL_FOOTER_DESCRIPTION_TEXT = 'text';
	var COL_FOOTER_VALUE_TEXT = 'value';
	//---------------------------------//
	var HEADER_ROWNUMBER = 1;
	var currentRow = 2;

	var PRODUCT_TYPE_POSITION = 0;
	var PRODUCT_FORMAT_POSITION = 1;
	var PRODUCT_LENGTH_POSITION = 2;
	// Fill some data
	/*
	Sheet.align(col, row, align)
	Sheet.valign(col, row, valign)
	Sheet.wrap(col, row, wrap)
	Sheet.rotate(col, row, angle)

	Set cell text align style and wrap style

    align - (String) align style: 'center'/'left'/'right'
    valign - (String) vertical align style: 'center'/'top'/'bottom'
    wrap - (String) text wrap style:'true' / 'false'
    rotate - (String) Numeric angle for text rotation: '90'/'-90'

	*/
	
	//Sheet.set(col, row, str)
	/*
	Set the cell data.

    col - (Number) Cell column index(start with 1).
    row - (Number) Cell row index(start with 1).
    str - (String) Cell data.
	*/
	
	//Sheet.font(col, row, font_style)
	//Sheet.fill(col, row, fill_style)
	//Sheet.border(col, row, border_style)
	/*
	Set cell font style, fill style or border style

    font_style - (Object) font style options The options may contain:
        name - (String) font name
        sz - (String) font size
        scheme - (String) font scheme
        bold - (String) if bold: 'true'/'false'
        iter - (String) if italic: 'true'/'false'

    fill_style - (Object) fill style options The options may contain:
        type - (String) fill type: such as 'solid'
        fgColor - (String) front color
        bgColor - (String) background color

    border_style - (Object) border style options The options may contain:
        left - (String) style: 'thin'/'medium'/'thick'/'double'
        top - (String) style: 'thin'/'medium'/'thick'/'double'
        right - (String) style: 'thin'/'medium'/'thick'/'double'
        bottom - (String) style: 'thin'/'medium'/'thick'/'double'
	*/

		var customerName = "";
		// Create a new workbook file in current working-path
		var filename = util.format('%s%s.xlsx', customerName, moment(new Date()).format("DMMYYYYHHmmss"));
		// var workbook = excelbuilder.createWorkbook('../export/', filename);
		console.log("=== file name=== %s", filename);
		var workbook = excelbuilder.createWorkbook('./export/', 'sample11.xlsx');
		// Create a new worksheet with xx columns and yy rows
		var sheet1 = workbook.createSheet('sheet1', MAX_ROWS, MAX_COLS);
		
		// var jsonData = {header: "abc", data:{orders:{createdDate: '2014-08-08', code: 'X610'}}};
		// console.log("========= begin export file name: %s========", filename);
		// // console.log(jsonData);

		// for (var attr in jsonData)
		// {
		// 	// console.log('currentRow=' + currentRow + ' attr=' + attr);
		// 	switch(attr)
		// 	{
		// 		/*header
		// 		//	1		2	3		4		5		6
		// 		// 		customer's name					
		// 		*/
		// 		case 'header':
		// 			setSheetHeaderStyle(sheet1, HEADER_ROWNUMBER);
		// 			sheet1.set(COL_HEADER_TEXT, HEADER_ROWNUMBER, 'customer\'s name: ');
		// 			sheet1.set(COL_HEADER_VALUE, HEADER_ROWNUMBER, jsonData[attr]);
		// 			console.log('name=' + jsonData[attr]);
		// 			break;
		// 		/*data header
		// 		//	1		2	3		4		5		6
		// 		// date		format	quantity	price	amount
		// 		*/
		// 		case 'data':
		// 			console.log("===BEGIN setting data===");
		// 			setSheetItemStyle(sheet1, MAX_ROWS, MAX_COLS);
		// 			setSheetItemTitleStyle(sheet1, currentRow);
		// 			currentRow++;
					
		// 			/*data list
		// 			//	1	2		3		4			5		6
		// 			// date	type	format	quantity	price	amount
		// 			// 01/12 LD 	6 x 10 	10,000 		88		880,000
		// 			*/
		// 			var data = jsonData[attr].orders;
		// 			var logItem = '';
		// 			for(var item in data) {
		// 				var date = data[item][COL_DATE_TEXT];
		// 				var code = data[item][COL_CODE_TEXT];
		// 				var type = commonFunctions.extractProductCode(code, PRODUCT_TYPE_POSITION);
		// 				var format = commonFunctions.extractProductCode(code, PRODUCT_FORMAT_POSITION);
		// 				var length = commonFunctions.extractProductCode(code, PRODUCT_LENGTH_POSITION);
		// 				var quantity = data[item][COL_QUANTITY_TEXT];
		// 				var saleprice = data[item][COL_SALEPRICE_TEXT];
		// 				var amount = quantity * saleprice;
						
		// 				if(date !== null) {
		// 					// logItem = logItem + ' date=' + date;
		// 					sheet1.set(COL_DATE, currentRow, date);
		// 				}
		// 				if(type !== null) {
		// 					// logItem = logItem + ' type=' + type;
		// 					sheet1.set(COL_TYPE, currentRow, type);
		// 				}
		// 				// logItem = logItem + ' format=' + format;
		// 				// logItem = logItem + ' quantity=' + quantity;
		// 				// logItem = logItem + ' saleprice=' + saleprice;
		// 				// logItem = logItem + ' amount=' + amount;
		// 				// console.log(currentRow+ ' ' + logItem);
		// 				// logItem = '';

		// 				format = commonFunctions.getNameFromValueInJson(format, productFormatJsonConfig);
		// 				format = commonFunctions.getNameFromValueInJson(length, productLengthJsonConfig);
		// 				sheet1.set(COL_FORMAT, currentRow, util.format('%s x %s', format, length));
		// 				sheet1.set(COL_QUANTITY, currentRow, commonFunctions.formatNumber(quantity));
		// 				sheet1.set(COL_SALEPRICE, currentRow, commonFunctions.formatNumber(saleprice));
		// 				sheet1.set(COL_AMOUNT, currentRow, commonFunctions.formatNumber(amount));
						
		// 				currentRow++;
		// 			}
		// 			console.log("===END setting data===");
		// 			break;
		// 		/*footer
		// 		//	1		2	3		4		5		6
		// 		// 		total amount				12,131,321
		// 		// 		discount					   131,321
		// 		// 		total 						12,000,000
		// 		*/
		// 		case 'footer':
		// 			console.log("===BEGIN setting footer===");
		// 			var footer = jsonData[attr];
		// 			var footerIndexRow = 1;
		// 			for(var item in footer) {
		// 				console.log(' text=' + footer[item][COL_FOOTER_DESCRIPTION_TEXT]);
		// 				console.log(' value=' + footer[item][COL_FOOTER_VALUE_TEXT]);

		// 				sheet1.merge({col:COL_FOOTER_TEXT, row:currentRow}, {col: COL_FOOTER_VALUE - 1, row:currentRow});
		// 				sheet1.font(COL_FOOTER_TEXT, currentRow, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY, bold:'true'});
		// 				sheet1.font(COL_FOOTER_VALUE, currentRow, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY, bold:'true'});

		// 				sheet1.align(COL_FOOTER_TEXT, currentRow, ALIGN_RIGHT);
		// 				sheet1.align(COL_FOOTER_VALUE, currentRow, ALIGN_RIGHT);
						
		// 				sheet1.valign(COL_FOOTER_TEXT, currentRow, ALIGN_CENTER);
		// 				sheet1.valign(COL_FOOTER_VALUE, currentRow, ALIGN_CENTER);

		// 				// if(footer.length > 1 && footer.length - footerIndexRow > 0) {
		// 				// 	sheet1.border(COL_FOOTER_TEXT, currentRow, {bottom:'thin'});
		// 				// 	sheet1.border(COL_FOOTER_VALUE, currentRow, {bottom:'thin'});
		// 				// 	console.log('--------------------------');
		// 				// }

		// 				sheet1.set(COL_FOOTER_TEXT, currentRow, footer[item][COL_FOOTER_DESCRIPTION_TEXT]);
		// 				sheet1.set(COL_FOOTER_VALUE, currentRow, commonFunctions.formatNumber(footer[item][COL_FOOTER_VALUE_TEXT]));
		// 				currentRow++;
		// 				footerIndexRow++;
		// 			}
		// 			console.log("===END setting data===");
		// 			break;
		// 	}
		// }
		
		console.log("===BEGIN save workbook===");
		// console.log(workbook);
		workbook.save(function(err) {
			if (err){
				console.log("===save workbook ERROR===");
				console.log(err);
				workbook.cancel();
			}
			else {
				console.log('congratulations, your workbook created');
			}
		});

function setSheetItemTitleStyle(sheet, titleRow)	{
	sheet.set(COL_DATE, titleRow, 'date');
	sheet.set(COL_TYPE, titleRow, 'format');
	sheet.set(COL_QUANTITY, titleRow, 'quantity');
	sheet.set(COL_SALEPRICE, titleRow, 'price');
	sheet.set(COL_AMOUNT, titleRow, 'amount');
	sheet.merge({col:COL_TYPE, row:titleRow}, {col:COL_FORMAT, row:titleRow});
	
	sheet.align(COL_QUANTITY, titleRow, ALIGN_CENTER);
	sheet.align(COL_SALEPRICE, titleRow, ALIGN_CENTER);
	sheet.align(COL_AMOUNT, titleRow, ALIGN_CENTER);
	sheet.valign(COL_QUANTITY, titleRow, ALIGN_CENTER);
	sheet.valign(COL_SALEPRICE, titleRow, ALIGN_CENTER);
	sheet.valign(COL_AMOUNT, titleRow, ALIGN_CENTER);
}

function setSheetHeaderStyle(sheet, firstRow)	{
	sheet.align(COL_HEADER_TEXT, firstRow, ALIGN_CENTER);
	sheet.align(COL_HEADER_VALUE, firstRow, ALIGN_LEFT);
	sheet.valign(COL_HEADER_TEXT, firstRow, ALIGN_CENTER);
	sheet.valign(COL_HEADER_VALUE, firstRow, ALIGN_CENTER);
	sheet.merge({col:COL_HEADER_TEXT, row:firstRow}, {col:COL_HEADER_VALUE - 1, row:firstRow});
	sheet.merge({col:COL_HEADER_VALUE, row:firstRow}, {col:COL_HEADER_VALUE + 1, row:firstRow});
	sheet.height(firstRow, ROW_HEIGHT);
	sheet.font(COL_HEADER_TEXT, firstRow, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY});
	sheet.font(COL_HEADER_VALUE, firstRow, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY, bold: 'true'});
}

function setSheetItemStyle(sheet, rowSize, colSize)	{
	//------- data columns width -------//
	var COL_DATE_WIDTH = 8;
	var COL_TYPE_WIDTH = 10;
	var COL_FORMAT_WIDTH = 16;
	var COL_QUANTITY_WIDTH = 16;
	var COL_SALEPRICE_WIDTH = 12;
	var COL_AMOUNT_WIDTH = 18;
	for(var i=2; i <= rowSize; i++) {
		sheet.font(COL_DATE, i, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY});
		sheet.font(COL_TYPE, i, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY});
		sheet.font(COL_FORMAT, i, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY});
		sheet.font(COL_QUANTITY, i, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY});
		sheet.font(COL_SALEPRICE, i, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY});
		sheet.font(COL_AMOUNT, i, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY});

		sheet.align(COL_FORMAT, i, ALIGN_CENTER);
		sheet.align(COL_QUANTITY, i, ALIGN_RIGHT);
		sheet.align(COL_SALEPRICE, i, ALIGN_RIGHT);
		sheet.align(COL_AMOUNT, i, ALIGN_RIGHT);
		sheet.align(COL_DATE, i, ALIGN_CENTER);
		sheet.align(COL_TYPE, i, ALIGN_CENTER);
		
		sheet.valign(COL_DATE, i, ALIGN_CENTER);
		sheet.valign(COL_TYPE, i, ALIGN_CENTER);
		sheet.valign(COL_FORMAT, i, ALIGN_CENTER);
		sheet.valign(COL_QUANTITY, i, ALIGN_CENTER);
		sheet.valign(COL_SALEPRICE, i, ALIGN_CENTER);
		sheet.valign(COL_AMOUNT, i, ALIGN_CENTER);

		sheet.width(COL_DATE, COL_DATE_WIDTH);
		sheet.width(COL_TYPE, COL_TYPE_WIDTH);
		sheet.width(COL_FORMAT, COL_FORMAT_WIDTH);
		sheet.width(COL_QUANTITY, COL_QUANTITY_WIDTH);
		sheet.width(COL_SALEPRICE, COL_SALEPRICE_WIDTH);
		sheet.width(COL_AMOUNT, COL_AMOUNT_WIDTH);
		sheet.height(i, ROW_HEIGHT);
	}
}