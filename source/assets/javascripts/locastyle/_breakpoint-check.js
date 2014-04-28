var locastyle = locastyle || {};

locastyle.breakpoints = (function() {
  'use strict';

  //
  // Tamanhos padrões dos breakpoints
  //
  var config = {
    screenSm: '768',
    screenMd: '992',
    screenLg: '1200'
  }

  function init(userConfig) {
    breakpointWindowWidth(userConfig);
    changeClassBreakpoint();
  }

  //
  // Coloca classe na tag html de acordo com o tamanho do breakpoint
  //
  function breakpointWindowWidth(userConfig) {
    if (userConfig){
      var documentWidth = userConfig.documentWidth;
    } else {
      var documentWidth = $(document).width();
    }

    console.log(documentWidth)

    // Se for menor que 768 - xs
    if (documentWidth < config.screenSm) {
      $('html').addClass('ls-screen-xs');
      locastyle.breakpointClass = "ls-screen-xs";
    }

    // Se for maior ou igual a 768 e menor que 992 - sm
    else if (documentWidth >= config.screenSm && documentWidth < config.screenMd) {
      $('html').addClass('ls-screen-sm');
      locastyle.breakpointClass = "ls-screen-sm";
    }

    // Se for maior ou igual a 992 e menor que 1200 - md
    else if (documentWidth >= config.screenMd && documentWidth < config.screenLg) {
      $('html').addClass('ls-screen-md');
      locastyle.breakpointClass = "ls-screen-md";
    }

    // Se for maior ou igual a 1200 - lg
    else {
      $('html').addClass('ls-screen-lg');
      locastyle.breakpointClass = "ls-screen-lg";
    };
    console.log(locastyle.breakpointClass)
  }

  //
  // Alterando a classe na tag html quando é redimensionamos a janela.
  //
  function changeClassBreakpoint () {

    var changeClass;

    window.onresize = function() {
      clearTimeout(changeClass);
      changeClass = setTimeout(function() {

        var breakpointActive = $('html').attr('class').replace(/(^|\s)ls-screen-\S+/g, '');

        $('html').attr('class', breakpointActive);

        breakpointWindowWidth();

        // dispara evento para informar outros modulos que o breakpoint foi atualizado
        $.event.trigger("breakpoint-updated");
      }, 300);
    };
  }

  return {
    init: init
  }

}());