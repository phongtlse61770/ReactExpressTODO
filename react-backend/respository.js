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
    const pool = new mssql.ConnectionPool(config, err => {
        if (err) reject(err);
        else {
            let request = new mssql.Request(pool);
            if (inputs) {
                iterate(inputs, (key, value) => request.input(key, value), true);
            }
            request.query(query, function (err, result) {
                if (err) {
                    reject(err);
                    pool.close();
                }
                else {
                    resolve(result);
                    pool.close();
                }
            })
        }
    });
    return promise;
}

function select(table, projections, condition, inputs) {
    let fieldsString = '';
    if (projections) {
        iterate(projections, (key, value) => {
            if (fieldsString) fieldsString += ',';
            fieldsString += value;
        }, true)
    } else {
        throw "Missing projections";
    }
    let queryString = `select ${fieldsString} from ${table}`;
    if (condition) queryString += ` where ${condition}`;
    return query(queryString, inputs);
}

/**
 * Iterate object or array
 * @param {Object | Array} target
 * @param {function(int|string|,value)} callback
 * @param {boolean} skipEmptyValue
 */
function iterate(target, callback, skipEmptyValue) {
    if (target instanceof Object) {
        for (const property in target) {
            if (target.hasOwnProperty(property)) {
                if (skipEmptyValue && !target[property]) continue;
                callback(property, target[property])
            }
        }
    } else {
        let i = 0;
        for (const element of target) {
            if (skipEmptyValue && element) continue;
            callback(i++, element)
        }
    }
}


module.exports = {
    query,
    select
};


