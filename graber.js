const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');

let startUrl;
startUrl = 'https://if.rozklad.in.ua/home/schedule/73/6328' //0
startUrl = 'https://if.rozklad.in.ua/home/schedule/38/5725' //45 from village

async function grab(){
    let routesWorkdays = new Set()
    let routesWeekends = new Set()

    function grabSchedule(selector, routes){
        $(selector+' tbody tr').each((i, el)=>{
            let row = $(el).find('td')
            let hour = parseFloat(row.html())
            let minutes =  parseFloat($(row).find('spam').html())
            let flagged = $(row).find('.note').text().toLowerCase()==='м'
            let key = ''+hour+':'+minutes
            if (!isNaN(hour) && !routes.has(key)){
                routes.add(key)
                console.log(key, flagged)
            }
        })
    }
    let html;
    html={}; html.data = fs.readFileSync('./a51.html',{encoding: 'utf8', flag: 'r'})
    // html = await axios(startUrl)
    let $ = cheerio.load(html.data)

    grabSchedule('.working-days', routesWorkdays)
    console.log('')
    grabSchedule('.weekend', routesWeekends)

}

grab()