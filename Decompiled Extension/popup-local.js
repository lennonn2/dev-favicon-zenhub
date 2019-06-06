function checkEnv() {
  var curURL, imgURL;

  if (window.location.href.match(/127\.0\.0\.1:3000/)) {
    curURL = "local";
  } else if (window.location.href.match(/app-staging\.zenhub/)) {
    curURL = "staging";
  }

  function icoLoad() {
    document.head = document.head || document.getElementsByTagName("head")[0];

    function removeOldFavicons() {
      var shortcut = document.querySelector('link[rel="shortcut icon"]');
      var favs = document.querySelectorAll('link[rel="icon"]');
      shortcut.remove();
      for (var i = 0; i < favs.length; i++) {
        favs[i].remove();
      }
    }

    function changeFavicon(src) {
      var link = document.createElement("link"),
        oldLink = document.getElementById("dynamic-favicon");
      link.id = "dynamic-favicon";
      link.rel = "shortcut icon";
      link.href = src;
      if (oldLink) document.head.removeChild(oldLink);
      document.head.appendChild(link);
    }

    var cE = chrome.extension;

    switch (curURL) {
      case "local":
        imgURL = cE.getURL("icon-green.ico");
        break;
      case "staging":
        imgURL = cE.getURL("icon-orange.ico");
        break;
    }

    removeOldFavicons();
    changeFavicon(imgURL);
  }

  icoLoad();
}

window.onload = checkEnv();
