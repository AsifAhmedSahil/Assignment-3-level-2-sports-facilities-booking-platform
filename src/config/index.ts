import dotenv from 'dotenv'
dotenv.config()

export default {
    node_env:process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    salt_round:process.env.BCRYPT_SALT_ROUND,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN,
    jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES_IN,
    store_id:process.env.STORE_ID,
    signature_key:process.env.SIGNATURE_KEY,
    payment_url:process.env.PAYMENT_URL,
    payment_verify_url:process.env.PAYMENT_VERIFY_URL

}