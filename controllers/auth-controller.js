const sql = require("../lib/sql-query");

const Auth = {
  register: async (req, res) => {
    try {
      const { email, password, confirm_password } = req.body;
      if (!email || !password || !confirm_password) {
        throw "Error! fill all details";
      }

      const params = [email];
      let is_exists = await sql.selectQuery(
        "SELECT * from user_tb where email = ?",
        "with_params",
        params
      );
      res.end(JSON.stringify({ is_exists }));
    } catch (error) {
      res.end(JSON.stringify({ error: true, message: error }));
    }
  },
};
module.exports = Auth;
