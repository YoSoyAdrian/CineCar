function addEvent(element, event, fn) {
  if (element.addEventListener) {
    element.addEventListener(event, fn, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + event, fn);
  }
}

function loadScript(src, callback) {
  var s, r, t, write;

  write = src.split("/");
  r = false;
  s = document.createElement("script");
  s.type = "text/javascript";
  s.src = src;
  s.onload = s.onreadystatechange = function () {
    if (!r && (!this.readyState || this.readyState == "complete")) {
      r = true;
      if (callback !== undefined) {
        callback();
      }
    }
  };
  t = document.getElementsByTagName("script")[0];
  t.parentNode.insertBefore(s, t);
}

addEvent(window, "load", function () {
  loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",
   
    function () {
      loadScript("/assets/js/login.js");
    }
  );
});
