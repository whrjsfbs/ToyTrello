const { 
    USER_EXIST, 
    USER_NOT_EXIST, 
    USER_AUTHENTICATED_FAIL
} = require('../mongodb/ERROR_STRING');
const bcrypt =  require('bcrypt');
const saltRounds = 10;

module.exports = {
    insertUser: (db, data) => {
        return new Promise(async (resolve, reject) => {
            const dbc = db.db("myDB").collection("users");
            try{
                if(data.password)
                    data.password = await bcrypt.hash(data.password, saltRounds);

                const result = await dbc.findOne( { id: data.id } )
                if(!result) {
                    dbc.insertOne(
                        data, 
                        (err, res) => {
                            if(err)
                                reject({ 
                                    status: 500,
                                    error: err
                                });
                            else
                                resolve({ status: "success" });
                        }
                    )
                } else {
                    reject({ 
                        status: 406,
                        error: USER_EXIST
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
        })
    },
    isLogined: (db, id) => {
        return new Promise(async (resolve) => {
            const dbc = db.db("myDB").collection("sessions");
            //해당 유저가 이미 로그인했는지 확인하고 기존 것을 삭제
            try{
                if(await dbc.findOne({session: { $regex: "\"value\":\""+id+"\"", $options: "i"}}))
                    await dbc.deleteOne({session: {$regex: "\"value\":\""+id+"\"", $options: "i"}})
                resolve({ status: "success" });
            }
            catch (err) {
                console.log(err);
            }
        })
    },
    loginUser: (db, id, pw) => {
        return new Promise(async (resolve, reject) => {
            const dbc = db.db("myDB").collection("users");
            //해당 유저가 존재하는지 확인
            try{
                const user_info = await dbc.findOne({ id: id })
                if(!user_info) {
                    reject({
                        status: 404,
                        error: USER_NOT_EXIST
                    });
                }
                //해당 유저의 비밀번호가 맞는지 확인
                const authenticated = await bcrypt.compare(pw, user_info.password);
                if(authenticated) {
                    resolve ({
                        status: "success",
                        user: {
                            value: user_info.id
                        }
                    });
                }
                reject ({
                    status: 401,
                    error: USER_AUTHENTICATED_FAIL
                });
            }
            catch (err) {
                console.log(err);
            }             
        })
    }
}