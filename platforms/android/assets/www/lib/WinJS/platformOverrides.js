(function () {
    // Append the safeHTML polyfill
    var scriptElem = document.createElement('script');
    scriptElem.setAttribute('src', 'lib/winjs/js/winstore-jscompat.js');
    if (document.body) {
        document.body.appendChild(scriptElem);
    } else {
        document.head.appendChild(scriptElem);
    }
}());
