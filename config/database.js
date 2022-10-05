module.exports = {
    url: process.env.DATABASE_URL,
    // username: process.env.DATABASE_USERNAME,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_NAME,
    // host: process.env.DATABASE_HOST,
    dialect: "postgres",
    type: "postgres",
    // port: process.env.DATABASE_PORT,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};
