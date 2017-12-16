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

function GetUser(username, password) {
    //prepare
    let resolve, reject;
    let promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej
    });

    respo.select(table,
        [field.Id, field.Username, field.Name, field.Picture, field.IsDeleted],
        `${field.Username} = @username AND ${field.Password} = @password`,
        {username, password})
        .then(result => {
            resolve(result.recordset);
        })
        .catch(error => {
            reject(error);
        });
    return promise;
}

module.exports = {
    GetUser
};