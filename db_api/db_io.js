const express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const Games = require("./models/games.model");
const User = require("./models/user.model");
const Comments = require("./models/comments.model").Comments;
const BDPointSchema = require("./models/bettingDataPoint.model").dbDataPoint;
const crypto = require("crypto");

const Lines = require("./models/moneyline.model");
const Spreads = require("./models/spreads.model");
const Totals = require("./models/totals.model");
const nflGames = require("./models/nflgames.model");

const DATABASE_NAME = "Prod-DB";

const CONNECTION_URL =
  "mongodb+srv://atlas-admin:bBcJ97l0uos6tu1Q@linedrivebetting-tfkik.gcp.mongodb.net/" +
  DATABASE_NAME +
  "?retryWrites=true&w=majority";
const TESTINGCONNECTION_URL =
  "mongodb+srv://atlas-admin:bBcJ97l0uos6tu1Q@linedrivebetting-tfkik.gcp.mongodb.net/" +
  "Testing" +
  "?retryWrites=true&w=majority";
var database, collection;

exports.linesAddEntry = function(request, response) {
  var teamsTag = request.body["teams"]
    .sort()
    .join("")
    .toLowerCase();

  var new0 = request.body.odds0;
  var new1 = request.body.odds1;
  Lines.findOneAndUpdate(
    { teamsTag: teamsTag, site: request.body.site },
    { $push: { odds0: new0, odds1: new1 } },
    { upsert: true }
  )
    .exec()
    .then(() => {
      console.log("Added a moneyline data point");
      response.status(200).send("your input was added\n");
    })
    .catch(() => {
      console.log("error adding a moneyline data point");
      response.status(500).send("your input was probably was malformed\n");
    });
};

exports.linesGetData = function(request, response) {
  var querry = {
    teamsTag: {
      $eq: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    }
  };
  Lines.find(querry)
    .exec()
    .then(res => {
      console.log("returned " + res.length + " items");
      response.status(200).json({
        res
      });
    })
    .catch(err => {
      console.log(err);
      response.status(500).send(err);
    });
};

exports.linesDropData = function(request, response) {
  Lines.deleteMany({}).catch(err => response.status(500).json("Error: " + err));
};

exports.spreadsAddEntry = function(request, response) {
  var teamsTag = request.body["teams"]
    .sort()
    .join("")
    .toLowerCase();

  var new0 = request.body.odds0;
  var new1 = request.body.odds1;
  var newpt0 = request.body.points0;
  var newpt1 = request.body.points1;
  Spreads.findOneAndUpdate(
    {
      teamsTag: teamsTag,
      site: request.body.site
    },
    { $push: { odds0: new0, odds1: new1, points0: newpt0, points1: newpt1 } },
    { upsert: true }
  )
    .exec()
    .then(() => {
      console.log("Added a spreads data point");
      response.status(200).send("your input was added\n");
    })
    .catch(() => {
      console.log("error adding a spreads data point");
      response.status(500).send("your input was probably was malformed\n");
    });
};

exports.spreadsGetData = function(request, response) {
  var querry = {
    teamsTag: {
      $eq: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    }
  };
  Spreads.find(querry)
    .exec()
    .then(res => {
      console.log("returned " + res.length + " items");
      response.status(200).json({
        res
      });
    })
    .catch(err => {
      console.log(err);
      response.status(500).send(err);
    });
};

exports.spreadsDropData = function(request, response) {
  Spreads.deleteMany({}).catch(err =>
    response.status(500).json("Error: " + err)
  );
};

exports.totalsAddEntry = function(request, response) {
  var teamsTag = request.body["teams"]
    .sort()
    .join("")
    .toLowerCase();

  var newOver = request.body.oddsOver;
  var newUnder = request.body.oddsUnder;
  var newpt = request.body.points;
  Totals.findOneAndUpdate(
    {
      teamsTag: teamsTag,
      site: request.body.site
    },
    { $push: { oddsOver: newOver, oddsUnder: newUnder, points: newpt } },
    { upsert: true }
  )
    .exec()
    .then(() => {
      console.log("Added a totals data point");
      response.status(200).send("your input was added\n");
    })
    .catch(() => {
      console.log("error adding a totals data point");
      response.status(500).send("your input was probably was malformed\n");
    });
};

exports.totalsGetData = function(request, response) {
  var querry = {
    teamsTag: {
      $eq: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    }
  };
  Totals.find(querry)
    .exec()
    .then(res => {
      console.log("returned " + res.length + " items");
      response.status(200).json({
        res
      });
    })
    .catch(err => {
      console.log(err);
      response.status(500).send(err);
    });
};

exports.totalsDropData = function(request, response) {
  Totals.deleteMany({}).catch(err =>
    response.status(500).json("Error: " + err)
  );
};

exports.nflgamesAddEntry = function(request, response) {
  new nflGames({
    teams: request.body.teams,
    gameTime: request.body.gameTime
  })
    .save()
    .then(() => {
      console.log("Added a nfl game data point");
      response.status(200).send("your input was added\n");
    })
    .catch(() => {
      console.log("error adding a nfl game data point");
      response.status(500).send("your input was probably was malformed\n");
    });
};

exports.nflgamesGetData = function(request, response) {
  nflGames
    .find({})
    .then(games => response.json(games))
    .catch(err => response.status(500).json("Error: " + err));
};

exports.dropNFLGamesData = function(request, response) {
  nflGames
    .deleteMany({})
    .catch(err => response.status(500).json("Error: " + err));
};

exports.dbDropAll = async function() {
  await Promise.all([
    nflGames.deleteMany({}).catch(err => console.log(err)),

    Games.deleteMany({}).catch(err => console.log(err)),

    User.deleteMany({}).catch(err => console.log(err)),

    Comments.deleteMany({}).catch(err => console.log(err)),

    BDPointSchema.deleteMany({}).catch(err => console.log(err)),

    Lines.deleteMany({}).catch(err => console.log(err)),

    Spreads.deleteMany({}).catch(err => console.log(err)),

    Totals.deleteMany({}).catch(err => console.log(err))
  ]);
};

exports.dbInit = function(isTesting = false) {
  Mongoose.connect(isTesting ? TESTINGCONNECTION_URL : CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  database = Mongoose.connection;
  database.once("open", () => {
    console.log("Database is connected");
  });
  database.on("error", () => {
    console.log("Error connecting to Database");
  });
};

exports.dbClose = function() {
  database.close();
};

exports.gamesAddEntry = function(request, response) {
  new Games({
    Teams: request.body["Teams"],
    EventStartTime: request.body["EventStartTime"]
  })
    .save()
    .then(() => {
      console.log("Added a data point");
      response.status(200).send("your input was added\n");
    })
    .catch(() => {
      console.log("error adding a data point");
      response.status(500).send("your input was probably was malformed\n");
    });
};

exports.gamesGetData = function(request, response) {
  Games.find({})
    .then(games => response.json(games))
    .catch(err => response.status(500).json("Error: " + err));
};

exports.dropGamesData = function(request, response) {
  Games.deleteMany({}).catch(err => response.status(500).json("Error: " + err));
};

exports.userSignup = function(request, response) {
  console.log("useradding");
  new User({
    userName: request.query.userName,
    saltedPass: request.query.saltedPass,
    salt: request.query.salt
  })
    .save()
    .then(() => {
      console.log("Added a user");
      response.status(200).send("your input was added\n");
    })
    .catch(err => {
      console.log("error adding a user");
      console.log(err);
      response.status(500).send("username was taken.\n");
    });
};

exports.userLogin = function(request, response) {
  User.find({
    userName: { $eq: request.query.userName }
  })
    .then(res => {
      if (res.length === 0) {
        console.log("no user found");
        response.status(204).send("Username not found.");
      } else {
        var token = res[0]["_id"];
        var salt = res[0]["salt"];
        var pw = request.query.password;
        var hashedpw = crypto
          .createHash("md5")
          .update(pw + salt)
          .digest("hex");

        if (hashedpw === res[0]["saltedPass"]) {
          console.log("found user properly");
          response.status(200).json({ token: token });
        } else {
          console.log("found user with incorrect password");
          response.status(204).send("incorrect password.");
        }
      }
    })
    .catch(err => {
      console.log("error finding a user");
      console.log(err);
      response.status(500).json(err);
    });
};

exports.getUserNameByToken = function(request, response) {
  User.find({
    _id: { $eq: request.query.token }
  })
    .then(res => {
      if (res.length === 0) {
        console.log("no user found");
        response.status(204).send("invalid token");
      } else {
        var ur = res[0]["userName"];
        response.status(200).json({ userName: ur });
      }
    })
    .catch(err => {
      console.log("error getting a user by token");
      console.log(err);
      response.status(500).json(err);
    });
};

exports.dbClose = function() {
  console.log(typeof database);
  database.close();
};

exports.commentsPut = function(request, response) {
  console.log(request.body);
  var teamsTag = request.body["Teams"]
    .sort()
    .join("")
    .toLowerCase();

  var querry = {
    Teams: { $eq: teamsTag }
  };

  var update = {
    $push: {}
  };

  update["$push"]["Comments"] = {
    $each: [request.body["Comment"]]
  };

  Comments.findOneAndUpdate(querry, update, { upsert: true })
    .exec()
    .then(res => {
      console.log("updated a comment");
      response.status(200).send("your comment was added\n");
    })
    .catch(err => {
      console.log("error updating a comment");
      console.log(request.body);
      console.log(err);
      response.status(500).send("your input was probably was malformed\n");
    });
};

exports.commentsGet = function(request, response) {
  var querry = {
    Teams: {
      $eq: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    }
  };
  Comments.find(querry)
    .exec()
    .then(res => {
      console.log("returned " + res.length + " items");
      response
        .status(200)
        .json({
          res
        })
        .end();
    })
    .catch(err => {
      console.log(err);
      response
        .status(500)
        .send(err)
        .end();
    });
};

exports.dbAddEntry = function(request, response) {
  var teamsTag = request.body["Teams"]
    .sort()
    .join("")
    .toLowerCase();

  var querry = {
    Teams: { $eq: teamsTag },
    EventStartTime: { $eq: request.body["EventStartTime"] },
    BettingFormat: { $eq: request.body["DataType"] }
  };

  var exists = true;
  var update = {
    $push: {}
  };

  update["$push"]["Value." + request.body["Site"]] = {
    $each: [request.body["Value"]]
  };

  BDPointSchema.findOneAndUpdate(querry, update, { upsert: true })
    .exec()
    .then(res => {
      console.log("updated a datapoint");
      response.status(200).send("your input was added\n");
    })
    .catch(err => {
      console.log("error updating a data point");
      console.log(request.body);
      console.log(err);
      response.status(500).send("your input was probably was malformed\n");
    });
};

exports.dbGetData = function(request, response) {
  var querry = {
    Teams: {
      $eq: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    },
    BettingFormat: { $eq: request.query.datatype }
  };
  BDPointSchema.find(querry)
    .exec()
    .then(res => {
      console.log("returned " + res.length + " items");
      response.status(200).json({
        res
      });
    })
    .catch(err => {
      console.log(err);
      response.status(500).send(err);
    });
};

exports.dbGetDataSite = function(request, response) {
  var querry = {
    Teams: {
      $all: [request.query.teama, request.query.teamb]
        .sort()
        .join("")
        .toLowerCase()
    },
    BettingFormat: { $eq: request.query.datatype }
  };
  BDPointSchema.find(querry)
    .exec()
    .then(res => {
      console.log("returned " + res.length + " items");
      response.status(200).json({
        res
      });
    })
    .catch(err => {
      console.log(err);
      response.status(400).send(err);
    });
};
