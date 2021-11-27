const en = (function () {
  var json = null;
  $.ajax({
    async: false,
    global: false,
    url: '/locales/en/translation.json',
    dataType: 'json',
    success: function (data) {
      json = data;
    },
  });
  return json;
})();

const es = (function () {
  var json = null;
  $.ajax({
    async: false,
    global: false,
    url: '/locales/es/translation.json',
    dataType: 'json',
    success: function (data) {
      json = data;
    },
  });
  return json;
})();

i18next.init(
  {
    lng: 'en', // evtl. use language-detector https://github.com/i18next/i18next-browser-languageDetector
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
  },
  function (err, t) {
    // for options see
    // https://github.com/i18next/jquery-i18next#initialize-the-plugin
    jqueryI18next.init(i18next, $);

    // start localizing, details:
    // https://github.com/i18next/jquery-i18next#usage-of-selector-function
    $('body').localize();
  }
);

const flags = {
    en : {
        img : 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/220px-Flag_of_the_United_States.svg.png' ,
        text : 'Language'
    } ,
    es : {
        img :  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/750px-Bandera_de_Espa%C3%B1a.svg.png' ,
        text : 'Idioma'
    }
}

const changeLanguage = (lang) => {
  i18next.changeLanguage(lang, function () {
    $('body').localize();
  });
  $('#nav__lang-list').addClass('nav__lang-list--close');
  gsap.to('#nav__lang-list', { height: 0, duration: 0.5 });
  setTimeout(
    () => $('#nav__lang--selected').removeClass('nav__lang--selected--close'),
    500
  );
  $('#nav__lang--img').prop('src' , flags[lang].img)
  $('#nav__lang--text').html(flags[lang].text)
};

const openLangList = () => {
  $('#nav__lang-list').removeClass('nav__lang-list--close');
  gsap.to('#nav__lang-list', { height: 110, duration: 0.5 });
  setTimeout(
    () => $('#nav__lang--selected').addClass('nav__lang--selected--close'),
    1100
  );
};


const sctrollTo = (id) => {
    
        $([document.documentElement, document.body]).animate({
            scrollTop: $(id).offset().top + 100
        }, 500);
    
}