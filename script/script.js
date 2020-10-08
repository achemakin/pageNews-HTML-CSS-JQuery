$(document).ready(function(){
    $('.no-js').removeClass('no-js');
    
    const usdEl = $('.js-usdRub'),
          eurEl = $('.js-eurRub'),
          headerEl = $('.js-header'),
          blackBarTimeEl = $('.js-black-bar-time'),
          headerTimeEl = $('.js-header-time'),
          headerDateEl = $('.js-header-date'),
          headerClock = $('.js-header-clock'),
          headerBtnMenuEl = $('.js-btnMenu'),          
          mql = window.matchMedia('(max-width: 767px)');
    
    let flagTimeSize = 1;
          
    // курсы валют
    $.get(
        'http://data.fixer.io/api/latest',
        {'access_key' : '735509b8495da4566e54ad5aef8b1afb'},
        function(response){
            const exchangeRateUSD = (response.rates.RUB / response.rates.USD).toFixed(2),
                exchangeRateEUR = response.rates.RUB.toFixed(2);
            
            $(usdEl).text('USD/RUB: ' + exchangeRateUSD);
            
            $(eurEl).text('EUR/RUB: ' + exchangeRateEUR);
            }        
    );

    // кнопка открывания меню
    headerBtnMenuEl.on('click', function(){ 
       if ($(this).attr('aria-expanded') == 'true') {            
            $(this).attr({
                'aria-expanded': 'false',
                'aria-label': 'Открыть меню'
            });                                   
        } else { 
            $(this).attr({
                'aria-expanded':'true',
                'aria-label': 'Закрыть меню'
            });
        }; 
        
        headerEl.toggleClass('menu-open');
    });

    
    // замена flagTimeSize в зависимости о размера экрана, а также при увеличении окна браузера более 767px скрывает меню если оно открыто
    function screenTest(e) {
        if (e.matches) flagTimeSize = 0
            else flagTimeSize = 1;
       
        headerEl.removeClass('menu-open');
    };
    
    //меняет надпись "вторник" на "Вт" при загрузке странице размером 320px 
    if (window.matchMedia('(max-width: 767px)').matches) flagTimeSize = 0;    

    // часы и дата
    function clock() {
        let d = new Date(),
            week,
            day = d.getDate(),
            hrs = d.getHours(),
            min = d.getMinutes(),
            month = d.getMonth(),
            year = d.getFullYear(),
            weekDay = d.getDay(),
            fullDate = year + '-' + month+1 + '-' + day + 'T' + hrs + ':' + min,
            mnt = new Array('января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря');
            
            if (flagTimeSize == 1) week = new Array('воскресенье','понедельник','вторник','среда','четверг','пятница','суббота')
                else week = new Array('Вс','Пн','Вт','Ср','Чт','Пт','Сб');

            if (day <= 9) day = '0' + day;
            if (hrs <= 9) hrs = '0' + hrs;
            if (min <= 9) min = '0' + min;

            headerDateEl.text(day + ' ' + mnt[month] + ', ' + week[weekDay]);

            headerClock.text(hrs + ':' + min);

            blackBarTimeEl
                .text(hrs + ':' + min + ' ' + day + '.' + month+1 + '.' + year)
                .attr({'datetime' : fullDate});

            headerTimeEl.attr({'datetime' : fullDate});
    }

    mql.addListener(screenTest);

    setInterval(clock, 100);
});