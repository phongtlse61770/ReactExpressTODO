const sql = require('mssql');

const config = {
    user: "todoapp4",
    password: "11-22-33",
    server: "den1.mssql5.gear.host",
    database: "todoapp4"
};

/**
 * Query db
 * @param query|String: a query string
 * @param inputs| array<name,value>: params for query string
 */
async function query(query, inputs) {
    sql.connect(config).then(pool => {
        let request = pool.request();
        if (inputs) {
            for (let input of inputs) {
                request.input(input.name, input.value);
            }
        }
        return request.query(query);
    });
}


module.exports = {
    query
};


