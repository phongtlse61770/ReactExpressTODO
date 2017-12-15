const mssql = require('mssql');

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
function query(query, inputs) {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    const pool = new mssql.ConnectionPool(config,err => {
        if(err) reject(err);
        else{
            let request = new mssql.Request(pool);
            if (inputs) {
                for (const input of inputs) {
                    request.input(input.name, input.value);
                }
            }
            request.query(query, function (err, result) {
                if (err) {
                    console.error("Error while querying database :- " + err);
                    reject(err);
                    pool.close();
                }
                else {
                    console.log(result);
                    resolve(result);
                    pool.close();
                }
            })
        }
    });
    return promise;
}

function printError(err) {
    console.error(err);
}


module.exports = {
    query
};


