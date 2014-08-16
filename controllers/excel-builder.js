	// npm install msexcel-builder
	var excelbuilder = require('msexcel-builder');
	var commonFunctions = require('../app/common-functions');
	var configController = require('../controllers/config-api');
	var util = require('util');
	var moment = require("moment");

	var FONT_FAMILY = '3';
	var FONT_FAMILY_NAME = 'Arial';
	var FONT_SIZE = '13';
	var MAX_ROWS = 300;
	var MAX_COLS = 14;
	var ROW_HEIGHT = 23;
	var ALIGN_LEFT = 'left';
	var ALIGN_RIGHT = 'right';
	var ALIGN_CENTER = 'center';
	var BORDER_BOTTOM = 'bottom';
	var BORDER_STYLE = 'thin';

	//------- header table -------//
	var COL_HEADER_TEXT = 1;
	var COL_HEADER_VALUE = 4;
	var COL_HEADER_CUSTOMER_TEXT = 'Tên khách hàng : ';
	//------- data table -------//
	var COL_DATE = 1;
	var COL_TYPE = 2;
	var COL_FORMAT = 3;
	var COL_QUANTITY = 4;
	var COL_SALEPRICE = 5;
	var COL_AMOUNT = 6;
	//------- data columns text -------//
	var COL_DATE_TEXT = 'createdDate';
	var COL_ORDERS_TEXT = 'orders';
	var COL_CODE_TEXT = 'code';
	var COL_QUANTITY_TEXT = 'quantity';
	var COL_SALEPRICE_TEXT = 'salePrice';
	//------- footer table -------//
	var COL_FOOTER_TEXT = 1;
	var COL_FOOTER_VALUE = 6;
	
	var COL_FOOTER_DESCRIPTION_TEXT = 'text';
	var COL_FOOTER_VALUE_TEXT = 'value';

	var COL_FOOTER_TOTALAMOUNT_TEXT = 'Tổng tiền';
	var COL_FOOTER_DISCOUNT_TEXT = 'Triết khấu';
	var COL_FOOTER_TOTAL_TEXT = 'Tổng cộng';
	//---------------------------------//
	var HEADER_ROWNUMBER = 1;

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

    sheet1.font(2, 1, {name:'黑体',sz:'24',family:'3',scheme:'-',bold:'true',iter:'true'});
	sheet1.fill(3, 3, {type:'solid',fgColor:'8',bgColor:'64'});
	sheet1.border(1, 1, {left:'medium',top:'medium',right:'thin',bottom:'medium'});
	*/

exports.reportInvoices = function(exportData, customerName, callback) {
	try{
		var currentRow = 2;
		// Create a new workbook file in current working-path
		var filename = util.format('%s-%s.xlsx', customerName, moment(new Date()).format("DDMMYYYYHHmmss"));
		var workbook = excelbuilder.createWorkbook('./export/', filename);
		// Create a new worksheet with xx columns and yy rows
		var sheet1 = workbook.createSheet('sheet1', MAX_COLS, MAX_ROWS);
		
		var jsonData = exportData;
		console.log("========= begin export file name: %s========", filename);
		// console.log(jsonData);
		var productTypeJsonConfig = {};
		var productLengthJsonConfig = {};
		var productFormatJsonConfig = {};
		var invoiceTotal = 0;
		productFormatJsonConfig = [{name: "6.3", value:63}, {name: "6", value:6}, {name: "5", value:5}];
		productLengthJsonConfig = [{name: "0.8", value:8}, {name: "10", value:10}, {name: "1.1", value:11}
								, {name: "15", value:15}, {name: "20", value:20}, {name: "22", value:22}
								, {name: "25", value:25}, {name: "30", value:30}, {name: "35", value:35}
								, {name: "40", value:40}, {name: "50", value:50}, {name: "60", value:60}
								];
		productTypeJsonConfig = [{name: "Xi", value:"X"}, {name: "Đầu Bông", value:"B"}, {name: "Đen", value:"D"}
								, {name: "Mỏng", value:"M"}, {name: "Mỏng Xi", value:"Z"}];

		for (var attr in jsonData)
		{
			switch(attr)
			{
				/*header
				//	1		2	3		4		5		6
				// 		customer's name					
				*/
				case 'header':
					setSheetHeaderStyle(sheet1, HEADER_ROWNUMBER);
					sheet1.set(COL_HEADER_TEXT, HEADER_ROWNUMBER, COL_HEADER_CUSTOMER_TEXT);
					sheet1.set(COL_HEADER_VALUE, HEADER_ROWNUMBER, jsonData[attr]);
					console.log('name=' + jsonData[attr]);
					break;
				/*data header
				//	1		2	3		4		5		6
				// date		format	quantity	price	amount
				*/
				case 'data':
					console.log("===BEGIN setting data===");
					setSheetItemStyle(sheet1, MAX_ROWS);
					setSheetItemTitleStyle(sheet1, currentRow);
					currentRow++;
					/*data list
					//	1	2		3		4			5		6
					// date	type	format	quantity	price	amount
					// 01/12 LD 	6 x 10 	10,000 		88		880,000
					*/
					var data = jsonData[attr];
					var logItem = '';
					for(var item in data) {
						console.log(item);
						var date = moment(new Date(data[item][COL_DATE_TEXT])).format("DD-MM");
						if(date !== null) {
							console.log(' date=' + date);
							sheet1.set(COL_DATE, currentRow, date);
						}
						var orders = data[item][COL_ORDERS_TEXT];
						console.log("order.length", orders.length);
						for(var i=0; i< orders.length; i++) {
							var code = orders[i][COL_CODE_TEXT];
							// console.log("code=", code);
							var type = commonFunctions.extractProductCode(code, PRODUCT_TYPE_POSITION);
							var format = commonFunctions.extractProductCode(code, PRODUCT_FORMAT_POSITION);
							var length = commonFunctions.extractProductCode(code, PRODUCT_LENGTH_POSITION);
							var quantity = parseInt(orders[i][COL_QUANTITY_TEXT]);
							var saleprice = parseInt(orders[i][COL_SALEPRICE_TEXT]);
							var amount = quantity * saleprice;
							invoiceTotal += amount;

							if(type !== null && type !== undefined && type != "X") {
								type = commonFunctions.getNameFromValueInJson(type, productTypeJsonConfig);
								// logItem = logItem + ' type=' + type;
								sheet1.set(COL_TYPE, currentRow, type);
							}
							format = commonFunctions.getNameFromValueInJson(format, productFormatJsonConfig);
							length = commonFunctions.getNameFromValueInJson(length, productLengthJsonConfig);
							// logItem = logItem + ' format=' + format;
							// logItem = logItem + ' x ' + length;
							// logItem = logItem + ' quantity=' + quantity;
							// logItem = logItem + ' saleprice=' + saleprice;
							// logItem = logItem + ' amount=' + amount;
							// console.log(currentRow+ ' ' + logItem);
							// logItem = '';
							format = util.format('%s x %s', format, length);
							sheet1.set(COL_FORMAT, currentRow, format);
							sheet1.set(COL_QUANTITY, currentRow, commonFunctions.formatNumber(quantity));
							sheet1.set(COL_SALEPRICE, currentRow, commonFunctions.formatNumber(saleprice));
							sheet1.set(COL_AMOUNT, currentRow, commonFunctions.formatNumber(amount));
							console.log("END row number=" + currentRow);
							currentRow++;

						}
					}
					console.log("===END setting data===");
					break;
				/*footer
				//	1		2	3		4		5		6
				// 		total amount				12,131,321
				// 		discount					   131,321
				// 		total 						12,000,000
				*/
				case 'footer':
					console.log("===BEGIN setting footer===");
					var footer = jsonData[attr];
					// set total row 
					setFooterItemStyle(sheet1, currentRow);
					// setFooterItemBorderStyle(sheet1, currentRow);
					sheet1.set(COL_FOOTER_TEXT, currentRow, COL_FOOTER_TOTALAMOUNT_TEXT);
					sheet1.set(COL_FOOTER_VALUE, currentRow, commonFunctions.formatNumber(invoiceTotal));

					if(footer['discount'] || footer['discount'] > 0){
						var discountRowNumber = currentRow + 1;
						var sumTotalRowNumber = currentRow + 2;
						var discountAmount = invoiceTotal * footer['discount'] / 100;
						var sumTotal = invoiceTotal - discountAmount;

						setFooterItemStyle(sheet1, discountRowNumber);
						// setFooterItemBorderStyle(sheet1, discountRowNumber);
						sheet1.set(COL_FOOTER_TEXT, discountRowNumber, COL_FOOTER_DISCOUNT_TEXT);
						sheet1.set(COL_FOOTER_VALUE, discountRowNumber, commonFunctions.formatNumber(discountAmount));
						setFooterItemStyle(sheet1, sumTotalRowNumber);
						sheet1.set(COL_FOOTER_TEXT, sumTotalRowNumber, COL_FOOTER_TOTAL_TEXT);
						sheet1.set(COL_FOOTER_VALUE, sumTotalRowNumber, commonFunctions.formatNumber(sumTotal));
					}
					console.log("===END setting footer===");
					break;
			}
		}
		
		console.log("===BEGIN save workbook===");
		workbook.save(function(err) {
			if (err){
				console.log("===save workbook ERROR===");
				console.log(err);
				workbook.cancel();
				callback(err);
			}
			else {
				callback("", workbook);
				console.log('congratulations, your workbook created');
			}
		});
	}
	catch(err) {
		console.log("export error="+ err);
		callback(err);
	}
};

function setFooterItemStyle(sheet, rowNumber)	{
	sheet.merge({col:COL_FOOTER_TEXT, row:rowNumber}, {col: COL_FOOTER_VALUE - 1, row:rowNumber});
	sheet.font(COL_FOOTER_TEXT, rowNumber, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY, bold:'true'});
	sheet.font(COL_FOOTER_VALUE, rowNumber, {name: FONT_FAMILY_NAME, sz: FONT_SIZE, family: FONT_FAMILY, bold:'true'});

	sheet.align(COL_FOOTER_TEXT, rowNumber, ALIGN_RIGHT);
	sheet.align(COL_FOOTER_VALUE, rowNumber, ALIGN_RIGHT);
	
	sheet.valign(COL_FOOTER_TEXT, rowNumber, ALIGN_CENTER);
	sheet.valign(COL_FOOTER_VALUE, rowNumber, ALIGN_CENTER);
}

function setSheetItemTitleStyle(sheet, titleRow)	{
	sheet.set(COL_DATE, titleRow, 'Ngày');
	sheet.set(COL_TYPE, titleRow, 'Qui cách');
	sheet.set(COL_QUANTITY, titleRow, 'Số lượng');
	sheet.set(COL_SALEPRICE, titleRow, 'Đơn giá');
	sheet.set(COL_AMOUNT, titleRow, 'Thành tiền');
	sheet.merge({col:COL_TYPE, row:titleRow}, {col:COL_FORMAT, row:titleRow});
	
	sheet.align(COL_QUANTITY, titleRow, ALIGN_CENTER);
	sheet.align(COL_SALEPRICE, titleRow, ALIGN_CENTER);
	sheet.align(COL_AMOUNT, titleRow, ALIGN_CENTER);
	sheet.valign(COL_QUANTITY, titleRow, ALIGN_CENTER);
	sheet.valign(COL_SALEPRICE, titleRow, ALIGN_CENTER);
	sheet.valign(COL_AMOUNT, titleRow, ALIGN_CENTER);

	// sheet.border(COL_DATE, titleRow, {BORDER_BOTTOM: BORDER_STYLE});
	// sheet.border(COL_TYPE, titleRow, {BORDER_BOTTOM: BORDER_STYLE});
	// sheet.border(COL_FORMAT, titleRow, {BORDER_BOTTOM: BORDER_STYLE});
	// sheet.border(COL_QUANTITY, titleRow, {BORDER_BOTTOM: BORDER_STYLE});
	// sheet.border(COL_SALEPRICE, titleRow, {BORDER_BOTTOM: BORDER_STYLE});
	// sheet.border(COL_AMOUNT, titleRow, {BORDER_BOTTOM: BORDER_STYLE});
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

function setSheetItemStyle(sheet, rowSize)	{
	//------- data columns width -------//
	var COL_DATE_WIDTH = 8;
	var COL_TYPE_WIDTH = 10;
	var COL_FORMAT_WIDTH = 14;
	var COL_QUANTITY_WIDTH = 14;
	var COL_SALEPRICE_WIDTH = 12;
	var COL_AMOUNT_WIDTH = 16;
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

		// sheet.border(COL_DATE, i, {BORDER_BOTTOM: BORDER_STYLE});
		// sheet.border(COL_TYPE, i, {BORDER_BOTTOM: BORDER_STYLE});
		// sheet.border(COL_FORMAT, i, {BORDER_BOTTOM: BORDER_STYLE});
		// sheet.border(COL_QUANTITY, i, {BORDER_BOTTOM: BORDER_STYLE});
		// sheet.border(COL_SALEPRICE, i, {BORDER_BOTTOM: BORDER_STYLE});
		// sheet.border(COL_AMOUNT, i, {BORDER_BOTTOM: BORDER_STYLE});
	}
}

function setFooterItemBorderStyle(sheet, rowNumber){
	sheet.border(COL_FOOTER_TEXT, rowNumber, {bottom: 'dot'});
	sheet.border(COL_FOOTER_VALUE, rowNumber, {bottom: 'dot'});
}