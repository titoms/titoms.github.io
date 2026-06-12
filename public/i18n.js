(function () {
  var SUPPORTED = ["en", "fr", "es"];
  var STORAGE_KEY = "fullstackchris.lang";
  var COOKIE_NAME = "googtrans";

  function getSavedLanguage() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.indexOf(saved) !== -1 ? saved : null;
    } catch (_) {
      return null;
    }
  }

  function getBrowserLanguage() {
    var languages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];

    for (var i = 0; i < languages.length; i += 1) {
      var lang = String(languages[i]).slice(0, 2).toLowerCase();
      if (SUPPORTED.indexOf(lang) !== -1) return lang;
    }

    return "en";
  }

  function getLanguage() {
    return getSavedLanguage() || getBrowserLanguage();
  }

  function setCookie(name, value) {
    var maxAge = 60 * 60 * 24 * 365;
    document.cookie = name + "=" + value + ";path=/;max-age=" + maxAge + ";SameSite=Lax";
    if (location.hostname.indexOf(".") !== -1) {
      document.cookie = name + "=" + value + ";path=/;domain=." + location.hostname + ";max-age=" + maxAge + ";SameSite=Lax";
    }
  }

  function clearCookie(name) {
    document.cookie = name + "=;path=/;max-age=0;SameSite=Lax";
    if (location.hostname.indexOf(".") !== -1) {
      document.cookie = name + "=;path=/;domain=." + location.hostname + ";max-age=0;SameSite=Lax";
    }
  }

  function persistLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}

    if (lang === "en") {
      clearCookie(COOKIE_NAME);
      return;
    }

    setCookie(COOKIE_NAME, "/en/" + lang);
  }

  function syncButtons(lang) {
    document.querySelectorAll("[data-lang-choice]").forEach(function (button) {
      var active = button.getAttribute("data-lang-choice") === lang;
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function loadGoogleTranslate(lang) {
    if (lang === "en") return;
    if (document.querySelector('script[data-site-translate="true"]')) return;

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: "fr,es",
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, "google_translate_element");
    };

    var script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-site-translate", "true");
    document.head.appendChild(script);
  }

  window.__setSiteLang = function (lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    persistLanguage(lang);
    window.location.reload();
  };

  document.addEventListener("click", function (event) {
    var target = event.target.closest && event.target.closest("[data-lang-choice]");
    if (!target) return;
    event.preventDefault();
    window.__setSiteLang(target.getAttribute("data-lang-choice"));
  }, true);

  document.addEventListener("DOMContentLoaded", function () {
    window.setTimeout(function () {
      var lang = getLanguage();
      document.documentElement.lang = lang;
      persistLanguage(lang);
      syncButtons(lang);
      loadGoogleTranslate(lang);
    }, 300);
  });
})();
