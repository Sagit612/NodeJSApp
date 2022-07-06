
const { use } = require('passport');
const pg_connection = require('./pg-config');
async function getTable (user){
    const acc_query = {
        text: 'select role from users where username = $1',
        values: [user]
    }
    console.log(user)
    var query_data = await pg_connection.query(acc_query)
    var role = query_data.rows[0].role;
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
    stringTable += "<th> CRUD </th>"; 
    for(let rowIndex in dataTable){
        rowData = dataTable[rowIndex]

        id_product = rowData[Object.keys(rowData)[0]]
        var get_query = "?id=" + id_product + "&user="+ user 
        var bodyTable = `<tr>`
        for(let fieldIndex in rowData){
            var cell = `<td> ${rowData[fieldIndex]}</td>`
            bodyTable+=cell
        }
        bodyTable += `<td><a href='/users/delete${get_query}'> Delete </a> </td>`
        bodyTable+="</tr>"
        stringTable+=bodyTable
    }
    stringTable += `<tr> <form action='/users/add${get_query}' method='post'>`
    for(let headerIndex in headerData){
        stringTable += `<td><input type='text' name='${headerData[headerIndex]}'></td>`
    }
    stringTable += "<td> <button type='submit'>Add</button> </td> </form></tr>"
    stringTable += `<tr> <form action='/users/edit?user=${user}' method='post'>`
    for(let headerIndex in headerData){
        stringTable += `<td><input type='text' name='${headerData[headerIndex]}'></td>`
    }
    stringTable += "<td> <button type='submit'>Edit</button> </td> </form></tr>"
    stringTable+= "</table>"
    // console.log(stringTable)
    return stringTable;
}
module.exports = getTable