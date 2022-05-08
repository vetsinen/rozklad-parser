const db = require('./db');

( async ()=>{
    try {
        await db.sequelize.sync({force: true})
        await db.RouteGroup.truncate(); await db.RouteLink.truncate();
        let r1 = await db.RouteGroup.create({title: "підлужжя-космос"});
        await r1.createRouteLink({num: '45abus', href: 'https://if.rozklad.in.ua/home/schedule/38/5725'});
        await r1.createRouteLink({num:'51abus', href:'https://if.rozklad.in.ua/home/schedule/73'});
        await r1.createRouteLink({num:'52abus', href:'https://if.rozklad.in.ua/home/schedule/75'})
        console.log(r1.title);
    }
    catch (e) {
        console.log(e)
    }
    let g = await db.RouteGroup.findAll();
    console.log(JSON.stringify(g))
})();