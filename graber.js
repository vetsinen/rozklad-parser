const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');
const db = require('./db');

let startUrl;
startUrl = 'https://if.rozklad.in.ua/home/schedule/73/6328' //0
startUrl = 'https://if.rozklad.in.ua/home/schedule/38/5725' //45 from village

async function grabGroup(id){
    const group = await db.RouteGroup.findByPk(id);
    const links = await group.getRouteLinks();
    db.Route.truncate();
    // console.log(JSON.stringify(links));
    for (let link of links){
        let times = (await grabHref(link.href))
        console.log(times[1])
        times[0].forEach(time=>{
            group.createRoute({num:link.num, time, isWorkday: true})
        });
        times[1].forEach(time=>{
            group.createRoute({num:link.num, time, isWorkday: false})
        })
    }
}

async function grabHref(startUrl){
    let routesWorkdays = new Set()
    let routesWeekends = new Set()

    function grabSchedule(selector, routes){
        $(selector+' tbody tr').each((i, el)=>{
            let row = $(el).find('td')
            let hour = parseFloat(row.html())
            let minutes =  ($(row).find('spam').html())
            if (minutes && minutes.length>1) minutes=minutes.slice(0,2);
            let flagged = $(row).find('.note').text().toLowerCase()==='м'
            let key = ''+hour+':'+minutes
            if (!isNaN(hour) && !routes.has(key)){
                routes.add(key)
                // console.log(key, flagged)
            }
        })
        return Array.from(routes)
    }

    let html;
    // html={}; html.data = fs.readFileSync('./a51.html',{encoding: 'utf8', flag: 'r'})
    html = await axios(startUrl)
    let $ = cheerio.load(html.data)

    return [grabSchedule('.working-days', routesWorkdays), grabSchedule('.weekend', routesWeekends)]

}

grabGroup(1);