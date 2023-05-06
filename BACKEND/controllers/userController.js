const User = require("../models/User")
const auth = require("../auth");

module.exports.registerUser = (data) => {

    return User.findOne({username: data.username }).then(existUser => {
        if(existUser) {
            console.log(`User Exist: ${existUser}`)
            return false
        }
        else {
            let newUser = new User({
                username: data.username
            });
                console.log(`Username: ${data.username}`)
            return newUser
                .save()
                .then((user) => {
                    console.log(user);
                    return user;  })
                .catch((error) => {
                    console.log(error);
                    return error;
                });
            }
        })
};


module.exports.loginUser = (data) => {

    return User.findOne({username: data.username}).then(toLogin  =>{
        if (toLogin) {
            console.log(`Welcome: ${toLogin}`)
            return {access: auth.createAccessToken(toLogin)}
        } else if (!toLogin) {
            console.log(`UserName :${data.username} not found`)
            return false
        } else {
            console.log("Error");
            return false;
        }
    })
}

module.exports.updateAdminUser = (data) => {

    return User.findOneAndUpdate(
        { username: data.username },
        { isAdmin: true },
        { new: true } 
      ).then((updatedUser) => {
        if (updatedUser) {
          console.log("User updated:", updatedUser);
          return true;
        } else {
          console.log("User not found");
          return false;
        }
      }).catch((error) => {
        console.error("Error updating user:", error);
        return false;
      });
};


module.exports.deleteUserbyAdmin = (data) => {

    return User.findOneAndDelete(
    { username: data.username }).then((deleteUser) => {
        if (deleteUser) {
            console.log("User Deleted: ", deleteUser);
            return true
        } else {
            console.log("user not exist")
            return false
        }
    }).catch((error) => {
        console.error("Error updating user:", error);
        return false;
    });

}

module.exports.saveCalculationstring = (data) => {

    console.log(data)
    const username = data.username;
    console.log(username)
    const calculation = data.calcStrings
    console.log(calculation)

    return User.findOneAndUpdate(
      { username },
      { $push: { calcStrings: calculation } },
      { new: true } 
    ).then((updatedUser) => {
      if (updatedUser) {
        console.log("Calculation string saved:", updatedUser);
        return true;
      } else {
        console.log("User not found");
        return false;
      }
    }).catch((error) => {
      console.error("Error saving calculation string:", error);
      return false;
    });
  };

  module.exports.viewStrings = (data) => {
    const { username } = data;
  
    return User.findOne({ username })
      .then((user) => {
        if (user) {
          const calcString = user.calcStrings.reverse();
          return calcString;
        } else {
          console.log('User not found');
          return false;
        }
      })
      .catch((error) => {
        console.error('Error fetching calculation strings:', error);
        return false;
      });
  };
  
  
  module.exports.delHistory = (data) => {
    const { username } = data; 
    console.log(data)
    console.log(username)

    return User.findOneAndUpdate(
        { username },
        { $set: { calcStrings: [] } },
        { new: true } 
      ).then((updatedUser) => {
        if (updatedUser) {
          console.log("Calculation strings deleted for user:", updatedUser.username);
          return true;
        } else {
          console.log("User not found");
          return false;
        }
      }).catch((error) => {
        console.error("Error deleting calculation strings:", error);
        return false;
      });
};

  
module.exports.getUserDetails = (data) => {
  return User.findById(data.userId).then(result => {
    console.log(result)
    return result;
  });
};


module.exports.getProfile = (userData) => {
  return User.findById(userData.id).then(result => {
    if (result == null) {
      return false
    } else {
      // Returns the user information with the password as an empty string or asterisk.
      return result
    }
  })
};


module.exports.comments = (data) => {

  console.log(data)
  const username = data.username;
  console.log(username)
  const comments = data.comments
  console.log(comments)

  return User.findOneAndUpdate(
    { username },
    { $push: { comments: comments } },
    
    { new: true } 
  ).then((comments) => {
    if (comments) {
      console.log("Comments:", comments);
      return true;
    } else {
      console.log("User not found");
      return false;
    }
  }).catch((error) => {
    console.error("Error saving calculation string:", error);
    return false;
  });
};
