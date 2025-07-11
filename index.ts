import { Request, Response } from "express";
var ems = require("express-mongo-sanitize");
var mongoSanitize = require("mongo-sanitize");
var user = require("User").ObjectId;
const Solution = require("./../src/models/solution");
const test = require("./test");

function authenticate(req, res) {
  mongo.connect("mongodb://me:96/users", function (err, db) {
    Solution.findOne(
      { username: req.body.user, password: req.body.pass, isActive: true },
      function (err, result) {}
    );
    Solution.findOne(
      {
        username: mongo.ObjectId(req.body.user),
        password: mongo.ObjectId(req.body.pass),
        isActive: true,
      },
      function (err, result) {
        // ok: AIK_ts_node_nosqli_injection
        Solution.findOne(
          {
            username: String(req.body.user),
            password: String(req.body.pass),
            isActive: true,
          },
          function (err, result) {}
        );
        // ok: AIK_ts_node_nosqli_injection
        Solution.findOne(
          {
            username: req.body.user.toString(),
            password: req.body.pass.toString(),
            isActive: true,
          },
          function (err, result) {}
        );
      }
    );
  });
}

const apiBio = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const token =
        req.cookies["access-token"] || req.headers.authorization?.substring(7);
      const { _id } = (await verifyToken(token as string)) as unknown as IUser;
      await connectMongo();

      const user = await UserModel.findOne({
        _id,
      })
        .lean()
        .select("bio");

      return res.status(200).json({
        bio: user?.bio,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem fetching your bio",
      });
    }
  } else if (req.method === "PATCH") {
    try {
      const token =
        req.cookies["access-token"] || req.headers.authorization?.substring(7);

      const { _id } = (await verifyToken(token as string)) as unknown as IUser;
      await connectMongo();

      const { bio } = req.body.bio;
      const updatedUser = await UserModel.findOneAndUpdate(
        {
          _id,
        },
        {
          bio,
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        message: "Bio updated!",
        bio: updatedUser?.bio,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem updating your bio",
      });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

const apiDeleteInventory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "DELETE") {
    try {
      const token = req.headers.authorization?.substring(7);
      const { _id } = (await verifyToken(token as string)) as unknown as IUser;

      await connectMongo();

      const deletedItem = await InventoryItemModel.findOneAndDelete({
        _id: req.query.id,
        user: _id,
      });
      res.status(201).json({
        message: "Inventory item deleted!",
        deletedItem,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem deleting the item.",
      });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

async function authenticate2(req, res) {
  const query = {
    $where: `this.username.match(/${req.params.id}/)`,
  };
  const query2 = {
    $eq: `this.username.match(/${req.params.id}/)`,
  };

  try {
    let users = await User.find(query);
    users = await User.find({
      $and: [
        { orderDate: { $gte: new Date("2024-01-01") } },
        { status: "completed" },
        { $where: `this.username.match(/${req.params.id}/)` },
      ],
    });
    users = await User.find({
      $where: `this.username.match(/${req.params.id}/)`,
    });
    users = await User.find(req.params.id);
    users = await User.find(query2);
  } catch (err) {
    console.log(err);
  }
}

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, firstName, lastName } = req.body;

      const hashedPassword = await hashPassword(req.body.password);

      const userData = {
        email: email.toLowerCase(),
        firstName,
        lastName,
        password: hashedPassword,
        role: "admin",
      };

      await connectMongo();

      // ruleid: AIK_ts_node_nosqli_injection
      const existingEmail = await UserModel.findOne({
        email: userData.email,
      }).lean();

      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = new UserModel(userData);
      const savedUser = await newUser.save();

      if (savedUser) {
        const { firstName, lastName, email, role } = savedUser;

        const userInfo = {
          firstName,
          lastName,
          email,
          role,
        };

        return createTokens(res, userInfo).then(({ res, expiresAt, token }) =>
          res.status(200).json({
            message: "User created!",
            token,
            userInfo,
            expiresAt,
          })
        );
      } else {
        return res.status(400).json({
          message: "There was a problem creating your account",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem creating your account",
      });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};
// End of bug-collection test cases
