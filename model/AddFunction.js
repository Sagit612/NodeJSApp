var pg_conn = require('./pg-config');
async function AddAction(body)
{
    console.log(body)
    var get_query = 'SELECT * FROM products'
    var get_query_data = await pg_conn.query(get_query);
    var headerData = Object.keys(get_query_data.rows[0])
    var add_query =  'INSERT INTO products VALUES ('
    for(let headerIndex in headerData){
        var nameOfValue = headerData[headerIndex]
        console.log(nameOfValue)
        if(isNaN(body[nameOfValue])){
            var fieldName = "'" + body[nameOfValue] + "'"
        }else{
            fieldName = body[nameOfValue]
        } 
        add_query += `${fieldName},`
    }
    add_query = add_query.slice(0,-1)+')'
    console.log(add_query)
    var query_data = await pg_conn.query(add_query);
}
module.exports = AddAction