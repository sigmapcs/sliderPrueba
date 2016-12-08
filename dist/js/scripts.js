"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.edgrid = f();
  }
})(function () {
  var define, module, exports;return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }({ 1: [function (require, module, exports) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _menu = require('./menu');

      var _menu2 = _interopRequireDefault(_menu);

      var _migrate = require('./migrate');

      var _migrate2 = _interopRequireDefault(_migrate);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default = { menu: _menu2.default, migrate: _migrate2.default };
      module.exports = exports['default'];
    }, { "./menu": 2, "./migrate": 3 }], 2: [function (require, module, exports) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _utils = require('./utils');

      exports.default = function (navId, menuId) {
        var nav = (0, _utils.$)('#' + navId),
            menu = (0, _utils.$)('#' + menuId),
            toggleButton = (0, _utils.$)('#' + navId + '-toggle');

        function showNav() {
          nav.classList.toggle('show-menu');
        }

        function showSubMenu(e) {
          if (e.target.classList.contains('expand-submenu')) {
            e.preventDefault();
            e.target.classList.toggle('active');
            e.target.previousElementSibling.classList.toggle('show-submenu');
          }
        }

        // si el nav y toggle existen mostrar u ocultar menu
        if (nav) {
          if (toggleButton) {
            toggleButton.addEventListener('click', showNav);
          } else {
            console.error('Not found ' + navId + '-toggle Id');
          }
        } else {
          console.error('Not found ' + navId + ' Id');
        }

        if (menu) {
          // show submenus
          menu.addEventListener('click', showSubMenu);
          //
          // while (menuItemsLength--) {
          //   let menuItem = menuItems[menuItemsLength];
          //   // Detectar si un item es padre de un submenu
          //   if (menuItem.querySelector('ul') != null) {
          //     menuItem.classList.add('parent-submenu');
          //
          //
          //   }
          // }

          (0, _utils.each)((0, _utils.$)('li', menu) /* menuItems */, function (menuItem) {
            // Detectar si un item es padre de un submenu
            if (menuItem.querySelector('ul') != null) {
              menuItem.classList.add('parent-submenu');

              //Crear toggle button para submenus
              var expandSubmenu = document.createElement('div');
              expandSubmenu.classList.add('expand-submenu');
              menuItem.appendChild(expandSubmenu);
            }
          });
        } else {
          console.error('Not found ' + menuId + ' Id');
        }
      };

      module.exports = exports['default'];
    }, { "./utils": 4 }], 3: [function (require, module, exports) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _utils = require('./utils');

      exports.default = function () {

        // Clases antiguas (como clave) y nuevas (como valor).
        var classes = {
          grupo: 'ed-container',
          caja: 'ed-item',
          total: 'full',
          'hasta-tablet': 'to-m',
          'hasta-web': 'to-l',
          'hasta-hd': 'to-xl',
          'desde-tablet': 'from-m',
          'desde-web': 'from-l',
          'desde-hd': 'from-xl',
          'base-': 's-',
          'movil-': 's-',
          'tablet-': 'm-',
          'web-': 'l-',
          'hd-': 'xl-'
        };

        // Obtenemos las clases antiguas.
        var oldClasses = Object.keys(classes);

        // Expresión regular que encuentra los selectores antiguos
        // a partir del className de un elemento.
        // Creada a partir de: http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript#answer-196038
        var OLD_SELECTORS_REGEX = new RegExp([

        // Coincide con el inicio del className o
        // con un espacio que precede al selector antiguo.
        '(^|\\s)',

        // Conicide con uno de todos los selectores.
        '(' + oldClasses.join('|') + ')',

        // Coincide con el tamaño asignado por el selector
        // ej: base-50, coincidiría con 50.
        '(\\d{1,3}|\\d-\\d)?',

        // Coincide con el selector antiguo que este seguido
        // por un espacio o con el final del className.
        '(?!\\S)'].join(''), 'g');

        // Creamos un nuevo arreglo con los selectores de atributo
        // y de clase, resultantes de las clases antiguas.
        var oldSelectors = oldClasses.map(function (oldClass) {

          // Verificamos si se necesita un selector de atributo.
          // Si se necesita, lo retornamos con este.
          if (oldClass.endsWith('-')) {
            return '[class*="' + oldClass + '"]';
          }

          // De lo contrario, lo retornamos como selector de clase.
          return '.' + oldClass;
        });

        // Iteramos todos los elementos para añadir las nuevas clases.
        (0, _utils.each)((0, _utils.$)(oldSelectors.join()), function (element) {
          var match = void 0;
          var newClasses = '';

          // Iteramos todas las coincidencias.
          while (match = OLD_SELECTORS_REGEX.exec(element.className)) {
            newClasses += ' ' + (classes[match[2]] + (match[3] || ''));
          }

          // Añadimos las nuevas clases.
          element.className += newClasses;
        });
      };

      module.exports = exports['default'];
    }, { "./utils": 4 }], 4: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.$ = $;
      exports.each = each;
      /**
       * Alias del método `querySelectorAll`
       *
       * @param {String} selector
       * @param {Document|HTMLElement} context
       *
       * @return {NodeList|HTMLElement}
       *
       * @private
       */
      function $(selector) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

        if (/^#[\w-]+$/.test(selector)) {
          return context.getElementById(selector.slice(1));
        }

        return context.querySelectorAll(selector);
      }

      /**
       * Recorre todos los elementos de un NodeList o HTMLCollection.
       *
       * @param {NodeList|HTMLCollection} elements
       * @param {Function} callback
       *
       * @return void
       *
       * @private
       */
      function each(elements, callback) {
        var length = elements.length;

        for (var i = 0; i < length; ++i) {
          callback(elements[i], i, elements);
        }
      }
    }, {}] }, {}, [1])(1);
});

//# sourceMappingURL=ed-grid.js.map
'use strict';

$(function () {
  var form = $('#form');
  var sendForm = function sendForm(e) {};
  form.on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serializeArray(),
        url = $(this).attr('action');
    console.log(data + ' ' + url);
    $.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      data: data,
      success: function success() {
        $('.success').slideDown();
        $('.button-send').text('Enviado').attr('disabled', 'true').css({ background: '#ccc', color: 'green', cursor: 'none' });
      },
      error: function error() {
        $('.error').slideDown();
      }
    });
  });
  var inputGroup = $('.input-group input, .input-group textarea');
  inputGroup.blur(function () {
    var _t = $(this);
    if (_t.val() != '') {
      _t.parent().addClass('input-full');
    } else {
      _t.parent().removeClass('input-full');
    }
  });
  var phone = $('#phone');
  phone.on('keypress', function (e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if (keynum == 8) return true;
    return (/\d/.test(String.fromCharCode(keynum))
    );
  });
});
"use strict";

$("#slides").slidesjs({
  width: 1280,
  height: 600,
  play: {
    active: false,
    // [boolean] Generate the play and stop buttons.
    // You cannot use your own buttons. Sorry.
    effect: "slide",
    // [string] Can be either "slide" or "fade".
    interval: 7000,
    // [number] Time spent on each slide in milliseconds.
    auto: true,
    // [boolean] Start playing the slideshow on load.
    swap: false,
    // [boolean] show/hide stop and play buttons
    pauseOnHover: false,
    // [boolean] pause a playing slideshow on hover
    restartDelay: 100
    // [number] restart delay on inactive slideshow
  },
  effect: {
    slide: {
      speed: 2000
    }
  }
});
"use strict";
"use strict";
'use strict';

(function (d) {
  var year = d.querySelector('#year'),
      currentYear = new Date().getFullYear();
  year.innerHTML = currentYear;
})(document);