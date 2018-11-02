1. Flatten a JS Object's Properties (or JSON)

2. Flatten a JS Object's Data (or JSON)

3. Read an Excel Spreadsheet (Excel, CSV) into a JS Object (or JSON)
	a. Async or as a stream - could be handling large sets of data
	b. Worksheet title = data model
	c. (?) Columns that don't exist in the model are dropped

4. Write a JS Object (or JSON) into an Excel Spreadsheet (Excel, CSV)
	a. Async or as a stream - could be handling large sets of data
	b. Worksheet title = data model
	c. Columns use flat path of property eg: `author.name`

5. Write tests