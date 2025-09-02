const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userService = require("../services/userService.cjs");

async function createUser(req, res) {
    try {
        const { firstname, lastname, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const userPayload = {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        fullname: `${firstname} ${lastname}`,
        };

        const user = await userService.createUser(userPayload);

        const { password: _, ...safeUser } = user.toJSON();
        res.json(safeUser);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function registerUser(req, res) {
    try {
        const { firstname, lastname, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const userPayload = {
            firstname,
            lastname,
            email,
            password: hashedPassword,
            fullname: `${firstname} ${lastname}`,
        };

        const user = await userService.createUser(userPayload);
        const token = jwt.sign(
            { id: user.id, fullname: user.fullname, email: user.email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: "1h" }
        );

        const { password: _, ...safeUser } = user.toJSON();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3600000,
        })
        .json(safeUser);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUserById(req, res) {
    try {
        const id = req.query.id;
        const user = await userService.getUserById(id);
        if(user){
            res.json(user);
        }
        else {
            res.json({"error": `User ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getCurrentUser(req, res) {
    try {
        const id = req.user.id;
        const user = await userService.getUserById(id);
        if(user){
            res.json(user);
        }
        else {
            res.json({"error": `User ${id} not found :(`});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllUsers(req, res) {
    try{
        const { offset, limit, firstname, lastname, email } = req.query;
        const users = await userService.getAllUsers({ offset, limit, firstname, lastname, email });
        res.json(users);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedUsers(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, firstname, lastname, email } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await userService.getLimitedUsers({ offset, limit, firstname, lastname, email }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += firstname ? `&firstname=${firstname}` : "";
        queryParams += lastname ? `&lastname=${lastname}` : "";
        queryParams += email ? `&email=${email}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.users, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function addBookToUser(req, res){
    try {
        const idUser = req.user.id;
        const idBook = req.query.idBook;
        const bookUser = await userService.addBookToUser(idBook,idUser);
        res.json({ BookUser: bookUser, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function removeBookFromUser(req, res) {
  try {
    const idUser = req.user.id;
    const idBook = req.query.idBook;
    const result = await userService.removeBookFromUser(idBook, idUser);
    
    if (result === null) {
      return res.status(400).json({ message: "Association not found" });
    }

    res.json({ message: "Book removed from user", result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function updateUser (req, res){
    try {
        const idUser = req.user.id;
        const { firstname, lastname, email } = req.body;

        const userPayload = {
            firstname,
            lastname,
            email,
            fullname: `${firstname} ${lastname}`,
        };

        const user = await userService.updateUser(idUser, userPayload);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteUser (req, res){
    try {
        const idUser = req.query.id;
        // const idUser = req.user.id;
        const user = await userService.deleteUser(idUser);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await userService.loginUser(email, password);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'mysecret',
      { expiresIn: '1h' },
      { algorithm: 'HS512' }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    })
    .json({ user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function logoutUser(req, res) {
    res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax', 
    secure: process.env.NODE_ENV === 'production',
  })
    .status(200).json({ message: 'Déconnexion réussie' })
}

module.exports = { createUser, getUserById, getAllUsers, getLimitedUsers, addBookToUser, updateUser, deleteUser, loginUser, registerUser, getCurrentUser, logoutUser, removeBookFromUser }