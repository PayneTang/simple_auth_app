import bcrypt from "bcryptjs";

const users = [
  {
    username: "Payne",
    password: "paynepwd"
  },
  {
    username: "Admin",
    password: "adminpwd"
  }
];

const Auth = {
  isAuthenticated: false,
  authenticate({ username, password }) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return err;
      bcrypt.hash(password, salt, (err, hash) => {
        console.log("hashed", hash);

        return hash;
      });
    });
    console.log(username, password);
    const userFound = users.find(
      user => user.password === password && user.username === username
    );
    console.log("userFound", userFound);
    this.isAuthenticated = true;
  },
  logout() {
    this.isAuthenticated = false;
  },
  getAuth() {
    return this.isAuthenticated;
  }
};

export default Auth;
