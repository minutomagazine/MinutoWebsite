function switchLanguage() {
  const lang = document.getElementById("languageSwitcher").value;
  localStorage.setItem("selectedLanguage", lang);
  translatePage(lang);
}

function translatePage(lang) {
  const elements = document.querySelectorAll("[data-translate]");

  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    element.innerText = translations[lang][key];
  });
}

const translations = {
  en: {
    aboutus: "ABOUT US",
    map: "MAP",
    contact: "CONTACT",
    shop: "SHOP",
    title: "Minuto — The First Macedonian Magazine in English",
    english: "\u00A0\u00A0\u00A0 ENGLISH",
    macedonian: "MACEDONIAN",
    heading: "So you want to \n stay unique and \n live with style?",
    description: "You sure can, with the power of Minuto.",
    description2:
      "Minuto is a luxury magazine for young people that focuses on the trendiest topics worldwide and the implementation of the same in North Macedonia.",
    button: "Buy the newest Minuto!",
    sponsored: "SPONSORED BY",
    blog: "Featured in the current issue of Minuto is:",
    note: "*Currently, Minuto does not produce any content in Macedonian and it is not a supporter of any type of digital informational mediums. To read the whole stories, buy Minuto's physical issue online or in any of the physical marketplaces mentioned below.",
    map2: "A map of all the locations where you can buy a Minuto yourself:",
    note2:
      "*Not all of the above-mentioned marketplaces may include the newest issue of Minuto.",
    contact2: "Contact",
    ctatext: "Apply for your advertisment space in Minuto today!",
    name: "Full Name",
    email: "E-mail Address",
    source: "From where did you find about Minuto?",
    option: "Please choose only one option",
    friends: "Friends or Family",
    socialmedia: "Social media",
    kiosks: "Kisoks or Supermarkets",
    bus: "Advertisment on Buses or Bus-stops",
    others: "Others",
    adspace: "Preferred advertisement space?",
    cover: "Cover",
    backcover: "Back-Cover",
    insidepage: "An Inside-Page",
    register: "Register now.",
    contact3: "Contact Us",
    a1: "Street Sv. Kiril i Metodij No.24",
    a2: "Center, Skopje",
    a3: "1000 Skopje - North Macedonia",
  },
  mk: {
    aboutus: "ЗА НАС",
    map: "МАПА",
    contact: "КОНТАКТ",
    shop: "ПРОДАВНИЦА",
    title: "Минуто - Првото македонско списание на Англиски јазик",
    english: "АНГЛИСКИ",
    macedonian: "МАКЕДОНСКИ",
    heading: "Сакаш да останеш \n уникатен и да живееш \n со стил?",
    description: "Секако дека можеш, со моќта на Минуто.",
    description2:
      "Минуто е луксузно списание за млади кое се фокусира на најпознатите светски трендови и нивната имплементација во Северна Македонија.",
    button: "Купи го најновото Минуто!",
    sponsored: "СПОНЗОРИРАНО ОД",
    blog: "Споменато во тековното издание на Минуто е:",
    note: "*Во моментов Минуто не произведува никаква содржина на македонски јазик и не е поддржувач на  било каков тип дигитални информациони медиуми. За да ги прочитате приказните во целост, купете го физичкото издание на Минуто онлајн или на едно од физичките продажни места наведени подолу.",
    map2: "Мапа од сите локации во кои можете самите да купите Минуто:",
    note2:
      "*Не сите од горе-наведените продажни места може да го содржат најновото издание на Минуто.",
    contact2: "Контакт",
    ctatext: "Аплицирајте за Вашиот рекламен простор во минуто денес!",
    name: "Целосно Име",
    email: "Е-мејл Адреса",
    source: "Од каде дознавте за Минуто?",
    option: "Ве молиме одберете само една опција",
    friends: "Пријатели или Фамилија",
    socialmedia: "Социјални мрежи",
    kiosks: "Киоски или Супермаркети",
    bus: "Реклама на Автобуси или Автобуски станици",
    others: "Друго",
    adspace: "Префериран рекламен простор?",
    cover: "Предна Корица",
    backcover: "Задна Корица",
    insidepage: "Внатрешна Страна",
    register: "Регистрирај се сега.",
    contact3: "Контактирајте Не",
    a1: "Улица Св. Кирил и Методиј Бр.24",
    a2: "Центар, Скопје",
    a3: "1000 Скопје - Северна Македонија",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  document.getElementById("languageSwitcher").value = savedLang;
  translatePage(savedLang);
});
