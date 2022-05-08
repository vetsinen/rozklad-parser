const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('database','user','password',  {
    dialect: 'sqlite',
    storage: './database.sqlite', // or ':memory:'
    dialectOptions: {
        // Your sqlite3 options here
    },
    logging: false,
});

const Pitstop = sequelize.define('Pitstop', {
    abr: {
        type: DataTypes.CHAR(3),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, { timestamps: false});

const Route = sequelize.define('Route',{
    time: {
        type: DataTypes.CHAR(5),
        allowNull: false,
    },
    num: {
        type: DataTypes.CHAR(7),
        allowNull: false,
    },
    isWorkday: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},{ timestamps: false});

const RouteGroup = sequelize.define('RouteGroup', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{timestamps: false})

const RouteLink = sequelize.define('RouteLinks',{
    num: {
        type: DataTypes.CHAR(7),
        allowNull: false,
    },
    href: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false});

RouteGroup.hasMany(RouteLink);
RouteGroup.hasMany(Route);

Route.belongsTo(RouteGroup);
RouteLink.belongsTo(RouteGroup);

(async () => {

})();

module.exports = {Route, RouteGroup, RouteLink, sequelize}