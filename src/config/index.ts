import dotenv from 'dotenv'
dotenv.config()

export default {
    node_env:process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    salt_round:process.env.BCRYPT_SALT_ROUND,
    jwt_access_secret:process.env.JWT_ACCESS_SECRET,
    jwt_access_expires:process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires:process.env.JWT_REFRESH_EXPIRES_IN
}