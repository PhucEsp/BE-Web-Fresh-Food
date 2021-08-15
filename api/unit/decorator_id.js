
const db = require("../db");

const check_primary_key = (TABLE,column_name, pk) => {

    sql = `select * from ${TABLE} where ${column_name} = ?`
    var check = false;
    db.query(sql,[pk], (err, response) => {
        if(err) return err

        if(response.length) return true
        else return false
            
    })
    return check
}


module.exports = check_primary_key