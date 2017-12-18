const respo = require("../respository");

const table = "Account";
const field = {
    Id: "Id",
    Username: "Username",
    Password: "Password",
    Name: "Name",
    Picture: "Picture",
    IsDeleted: "IsDeleted"
};

module.exports = {
    /**
     *
     * @return {Promise<data,error>}
     * @constructor
     */
    GetAllUser() {
        return new Promise((resolve, reject) => {
            respo.select(table, field, null, null)
                .then(result => {
                    resolve(result.recordset)
                })
                .catch(reject)
        })
    },

    /**
     *
     * @param username
     * @param password
     * @return {Promise<data,error>}
     * @constructor
     */
    GetUser(username, password) {
        return new Promise((resolve, reject) => {
            respo.select(table,
                [field.Id, field.Username, field.Name, field.Picture, field.IsDeleted],
                `${field.Username} = @username AND ${field.Password} = @password`,
                {username, password})
                .then(result => {
                    resolve(result.recordset);
                })
                .catch(reject);
        });
    },
};