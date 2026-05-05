import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token)
  // console.log('clicked')
  if (!token) {
    return res.json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(`token decode: ${tokenDecode}`)

    if (!req.body) {
      req.body = {};
    }

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    }
    else {
      // console.log('error from here')
      return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }


    next();

  } catch (error) {
    // console.log('error from here')
    return res.json({ success: false, message: error.message })
  }
}

export default userAuth;