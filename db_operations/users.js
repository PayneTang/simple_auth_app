const createNewUser = (username, hashedpassword, callback) => {
  const queryBody = [username, hashedpassword];
  selectUser(username, result => {
    if (!result.length) {
      // If user does not exist in database
      connection.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        queryBody,
        (err, rows) => {
          if (err) callback({ success: false, message: "server error", err });
          else
            callback({ success: true, message: "user created", dbInfo: rows });
        }
      );
    } else {
      // Username already exists in database
      callback({ success: false, message: "username already used" });
    }
  });
};

const selectAllUsers = callback => {
  connection.query("SELECT * FROM users", (err, rows) => {
    if (err) callback({ success: false, message: "server error", err });
    else callback({ success: true, message: "user found", dbInfo: rows });
  });
};

const selectUser = (username, callback) => {
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, rows) => {
      if (err) callback(err);
      else callback(rows);
    }
  );
};

const userLogin = (username, callback) => {
  selectUser(username, result => {
    if (!result.length) {
      callback({
        success: false,
        message: "user not found"
      });
    } else {
      callback({
        success: true,
        message: "user found",
        data: {
          id: result[0].id,
          username: result[0].username,
          password: result[0].password
        }
      });
    }
  });
};

const deleteUser = (username, callback) => {
  connection.query(
    "DELETE FROM users WHERE username = ?",
    username,
    (err, rows) => {
      if (err) callback(err);
      else callback(rows);
    }
  );
};

module.exports = {
  createNewUser,
  selectAllUsers,
  userLogin,
  deleteUser
};
