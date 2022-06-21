
const pg_connection = require('./pg-config');
async function getTable (user){
    const acc_query = {
        text: 'select role from users where username = $1',
        values: [user]
    }
    var query_data = await pg_connection.query(acc_query)
    var role = query_data.rows[0].role
    const products_query = {
        text: 'select * from products where shop = $1',
        values: [role]
    }
    query_data = await pg_connection.query(products_query)
    var dataTable = query_data.rows
    var stringTable = "<table><tr>"
    var headerData = Object.keys(dataTable[0])
    for(let headerIndex in headerData){
        var header = "<th>" + headerData[headerIndex] + "</th>"
        stringTable+=header
    }
    for(let rowIndex in dataTable){
        var bodyTable = "<tr>" 
        rowData = dataTable[rowIndex]
        for(let fieldIndex in rowData){
            var cell = "<td>" + rowData[fieldIndex] + "</td>"
            bodyTable+=cell
        }
        bodyTable+="</tr>"
        stringTable+= bodyTable
    }

    stringTable+= "</table>"
    console.log(stringTable)
    return stringTable;
}
module.exports = getTable