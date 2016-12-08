'use strict';

var edgrid = {};

// menu
edgrid.menu = function (navId, menuId) {
  var nav = document.getElementById(navId),
      menu = document.getElementById(menuId),
      toggleButton = document.getElementById(navId + '-toggle');

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
    var menuItems = menu.querySelectorAll('li');
    var menuItemsLength = menuItems.length;

    // show submenus
    menu.addEventListener('click', function (e) {
      showSubMenu(e);
    });

    while (menuItemsLength--) {
      var menuItem = menuItems[menuItemsLength];
      // Detectar si un item es padre de un submenu
      if (menuItem.querySelector('ul') != null) {
        menuItem.classList.add('parent-submenu');

        //Crear toggle button para submenus
        var expandSubmenu = document.createElement('div');
        expandSubmenu.classList.add('expand-submenu');
        menuItem.appendChild(expandSubmenu);
      }
    }
  } else {
    console.error('Not found ' + menuId + ' Id');
  }
};
