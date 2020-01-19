const sql = require('mssql')



function testConnection(options){
    const {host, port, user, password, database} = options;

    const config = {
        user: user,
        password: password,
        server: host, // You can use 'localhost\\instance' to connect to named instance
        database: database,
    };

    return sql.connect(config);
}

function getTableNames(options) {

    const {host, port, user, password, database} = options;

    const config = {
        user: user,
        password: password,
        server: host, // You can use 'localhost\\instance' to connect to named instance
        database: database,
    };

    // const tableInfoSql = `select table_name from information_schema.tables where table_schema='${database}' and table_type='base table'`;
    const tableInfoSql = `select table_name from information_schema.tables WHERE TABLE_CATALOG='${database}' AND TABLE_TYPE='base table'` ;

    return sql.connect(config).then(pool => {
        // Query
        return pool.request().query(tableInfoSql)
    })


}

function getTableColumns(options) {
    const {host, port, user, password, database,table} = options;

    const config = {
        user: user,
        password: password,
        server: host, // You can use 'localhost\\instance' to connect to named instance
        database: database,
    };
    const tableInfoSql = `select * from information_schema.columns where TABLE_CATALOG = "${database}" and TABLE_NAME = "${table}"`;

    return sql.connect(config).then(pool => {
        // Query
        return pool.request().query(tableInfoSql)
    }).then(result=>{
        const data = result.map(item => {
            const name = item.COLUMN_NAME;
            const camelCaseName = name.replace(/_(\w)/g, (a, b) => b.toUpperCase());
            const comment = item.COLUMN_COMMENT;
            const commentInfo = getInfoByComment(comment);
            const {chinese} = commentInfo;

            return {
                camelCaseName,
                name,
                type: item.DATA_TYPE, // COLUMN_TYPE
                isNullable: item.IS_NULLABLE === 'YES',
                comment,
                chinese,
                length: item.CHARACTER_MAXIMUM_LENGTH, // CHARACTER_OCTET_LENGTH
            };
        });
    })
}

function getInfoByComment(comment = '') {
    const cs = comment.split(' ');
    let chinese = '';
    if (cs && cs.length) {
        chinese = cs[0];
    }

    return {
        chinese,
    };
}

module.exports = {
    testConnection,
    getTableColumns,
    getTableNames,
};
