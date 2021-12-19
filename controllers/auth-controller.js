const lib = require("../lib/helpers");
const sqlConnection = require("../lib/mysql");
const sql = require("../lib/sql-query");

const Auth = {
  register: async (req, res) => {
    try {
      const { email, password, password_confirmation, firstname } = req.body;
      if (!email || !password || !password_confirmation || !firstname) {
        throw "Error! fill all details";
      }
      let referred_by = req.body?.referred_by ?  req.body.referred_by : null;

      const params = [email];
      let results = await sql.selectQuery(
        "SELECT * from user_tb where email = ?",
        "with_params",
        params
      );
      if (results.length > 0)
        throw "Error! Email already exists! Try another one.";

      let password_hash = await lib.encrypt(password);
      if (password_hash.error) throw password_hash.message;
      let user = {
        unique_id: lib.rand_no(),
        public_address: null,
        email,
        username: firstname,
        password: password_hash,
        referred_by,
        created_at: lib.date(),
        updated_at: lib.date(),
      };
      let result = sqlConnection.query("INSERT INTO user_tb SET ?", user);
      res.end(
        JSON.stringify({
          error: false,
          message: "Account created. Proceed to login!",
        })
      );
    } catch (error) {
      res.end(JSON.stringify({ error: true, message: error }));
    }
  },
  validate_referrer: async (req, res) => {
    try {
      const referrer_address = req.params.id;
      if (!referrer_address) {
        throw "Error! No address supplied";
      }

      const params = [referrer_address];
      let exists = await sql.selectQuery(
        "SELECT * from user_tb where unique_id = ?",
        "with_params",
        params
      );
      if (exists.length > 0) {
        res.end(JSON.stringify({ error: false, message: null }));
      } else {
        throw "Error! Address does not exist";
      }
    } catch (error) {
      res.end(JSON.stringify({ error: true, message: error }));
    }
  },
};
module.exports = Auth;
