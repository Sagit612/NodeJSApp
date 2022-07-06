var pg_conn = require('./pg-config');
async function EditFunction(id, body)
{
    console.log(body)
    var get_query = 'SELECT * FROM products'

    var get_query_data = await pg_conn.query(get_query);

    var headerData = Object.keys(get_query_data.rows[0])

    var edit_query =  'UPDATE products SET '

    for(let headerIndex in headerData){
        var nameOfValue = headerData[headerIndex] // name of header
        // body[nameOfValue] is data entered
        if(isNaN(body[nameOfValue])){
            var fieldName = nameOfValue + " = '" + body[nameOfValue] + "'"
        }else{
            fieldName = nameOfValue + "=" +body[nameOfValue]
        }
        edit_query += `${fieldName},`
    }
    edit_query = edit_query.slice(0,-1) + ` WHERE id = ${id}`
    console.log(edit_query)
    var query_data = await pg_conn.query(edit_query);
}
module.exports = EditFunction