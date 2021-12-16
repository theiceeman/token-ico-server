
const sql_conn = require('./mysql');
const sql = {
    
    selectQuery: (query, option, values) => {
        if (option == 'with_params') {
            return new Promise((resolve, reject) => {

                mySqlQuery.query(query, values, (err, result, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })

            })
        } else if (option == 'all_rows') {
            return new Promise((resolve, reject) => {
                mySqlQuery.query(query, (err, result, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })

            })

        }

    }
}
module.exports = sql;