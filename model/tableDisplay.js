
const pg_connection = require('./pg-config');
async function getTable (user){
    const acc_query = {
        text: 'select role from users where username = $1',
        values: [user]
    }
    var query_data = await pg_connection.query(acc_query)
    var role = query_data.rows[0].role
    let table_query = {}
    if(role == 'boss'){
        table_query = {
            text: 'select * from products'
        }
    }else{
        table_query = {
            text: 'select * from products where shop = $1',
            values: [role]
        }
    }
    query_data = await pg_connection.query(table_query)
    var dataTable = query_data.rows
    var stringTable = "<table><tr>"
    var headerData = Object.keys(dataTable[0])
    for(let headerIndex in headerData){
        var header = "<th>" + headerData[headerIndex] + "</th>"
        stringTable+=header
    }
    stringTable = stringTable + "<th>" + "CRUD" + "</th>"
    for(let rowIndex in dataTable){
        var bodyTable = "<tr>" 
        rowData = dataTable[rowIndex]
        for(let fieldIndex in rowData){
            var cell = "<td>" + rowData[fieldIndex] + "</td>" 
            bodyTable+=cell 
        }
        bodyTable = bodyTable + "<td>" + "<a href='/edit'>Edit</a> / <a href='/delete'>Delete</a>" + "</td>" 
        bodyTable+="</tr>"
        stringTable+= bodyTable
    }
    stringTable += "<tr>"
    for(let headerIndex in headerData){
        stringTable += "<td> </td>"
    }
    stringTable += "<td> <a href='add.ejs'>Add</a> </td> </tr>"
    stringTable+= "</table>"
    console.log(stringTable)
    return stringTable;
}
module.exports = getTable