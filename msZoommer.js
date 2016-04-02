;(function (options) {

    var defaults = {
        id: "js_zoommer",
        dataSelector: "data-zoommer",
        width: 500
    };

    function ready(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState != 'loading')
                    fn();
            });
        }
    }

    function addEventListener(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function () {
                handler.call(el);
            });
        }
    }

    function zoom() {
        this.parentNode.style = "position: relative; cursor: crosshair;"
        var zoomContainer = document.createElement("div");
        zoomContainer.id = defaults.id;
        var width = Number(this.offsetWidth) + Number(50);
        zoomContainer.style =
            "position: absolute; " +
            "top: 0; left: " + width + "px; " +
            "z-index: 100000; " +
            "display: block; " +
            "width: " + defaults.width + "px; " +
            "max-height: 500px;  " +
            "background: #ddd;  ";
        ;
        var zoomImage = document.createElement("img");
        zoomImage.src = this.src;
        zoomImage.style = "width: 100%";
        zoomContainer.appendChild(zoomImage);
        this.parentNode.appendChild(zoomContainer);
    }

    function clearZoom() {
        var zoommer = document.getElementById(defaults.id);
        zoommer.parentNode.removeChild(zoommer);
    }

    function forEach(array, fn) {
        for (var i = 0; i < array.length; i++)
            fn(array[i], i);
    }

    function onReady() {
        var selector = '[' + defaults.dataSelector + '="true"]';
        var elements = document.querySelectorAll(selector);
        forEach(elements, function (item) {
            addEventListener(item, "mouseenter", zoom);
            addEventListener(item, "mouseleave", clearZoom);
        });
    }

    ready(onReady);

})();


