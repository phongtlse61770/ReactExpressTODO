const respo = require("../respository");
const table = "TODO";
const field = {
    Id: "Id",
    Title: "Title",
    Body: "Body",
    TimeCreate: "TimeCreate",
    Deadline: "Deadline",
    Status: "Status",
    TeamId: "TeamId",
    IsArchived: "IsArchived",
    IsDeleted: "IsDeleted",
};

module.exports = {
    /**
     *
     * @return {Promise<data,err>}
     */
    getAllTodo() {
        return new Promise((resolve, reject) => {
            respo.select(table, field, null, null)
                .then(result => {
                    resolve(result.recordset);
                })
                .catch(err => {
                    reject(err)
                });
        });
    },

    /**
     *
     * @param userId
     * @return {Promise<data,err>}
     */
    getTodo(userId) {
        return new Promise((resolve, reject) => {
            respo.select(table, field, `${field.Id} = @userId`, {userId})
                .then(result => {
                    resolve(result.recordset);
                })
                .catch(err => {
                    reject(err)
                });
        });
    }
};