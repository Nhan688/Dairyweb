
var searchWrap = $('.search-wrap');
var searchInput = $('.search input');
var searchToggle = $('.search-toggle');
var clearSearch = $('.clear-search');
var overflow = $('.overflow-toggle-wrap');
var left = $('.left-wrap');
var menuToggle = $('.menu-toggle');
var menu = $('.menu-wrap');
var mask = $('.menu-mask');
var menuParent = $('.menu-parent-item');
var menuChild = $('.menu-child');
var menuChildItem = $('.menu-child-item');
var notHasChild = $('.menu-parent-item').not('.has-child');
var title = $('.title');
var org = $('.org');
var orgListToggle = $('.menu-org');
var orgList = $('.org-overflow-wrap');
var orgListItem = $('.org-overflow-item');
var menuBody = $('.menu-body');
var dropToggle = $('.drop-toggle');
var dropOverflow = $('.drop');
var left = $('.title-contain .left');
var navChild = $('.nav-item-toggle-wrap .drop-child');
var selected = $('.selected');
var orgReplace = $('.org-replace');

$(searchInput).on('keyup', function() {
  if ($(this).val().length > 0) {
    clearSearch.removeClass('hidden');
  } else {
    clearSearch.addClass('hidden');
  }
});

$(clearSearch).on('click', function() {
  $(this).addClass('hidden');
  $(searchInput).val('').focus();
});

//$(searchToggle).on('click', function() {
//  $(this).toggleClass('close-search');
//  overflow.toggleClass('hidden');
//  $(searchWrap).toggleClass('is-open');
//  $(searchWrap).toggleClass('full-width');
//  $(searchInput).focus();
//});

$(searchInput).on('focus', function() {
  $(searchWrap).addClass('is-open');
  //  $(searchToggle).addClass('close-search');
});

$(searchInput).on('blur', function() {
  //  $(searchWrap).removeClass('is-open');
});

//$(window).on('resize', function() {
//  if ($(this).width() > 600) {
//    $(searchWrap).removeClass('full-width'); 
//    overflow.removeClass('hidden');
//  } else {
//     if ($(searchInput).is(":focus")) {
//       overflow.addClass('hidden');
//       $(searchWrap).addClass('full-width'); 
//       $(searchToggle).addClass('close-search');
//     } else {
//       $(searchToggle).removeClass('close-search');
//     }
//  }
//});

$(menuToggle).on('click', function() {
  $(menu).toggleClass('is-open');
  $(mask).toggleClass('is-visible');
  $(searchWrap).removeClass('is-open');
});

$(mask).on('click', function() {
  $(menu).toggleClass('is-open');
  $(mask).toggleClass('is-visible');
});

$(menuParent).on('click', function(e) {
  var thisOne = e.target;
  var openMe = e.target.nextElementSibling;
  //$(menuParent).not($(thisOne)).removeClass('is-open');
  $(thisOne).toggleClass('is-open');
  //$(menuChild).not($(openMe)).removeClass('is-open');
  $(openMe).toggleClass('is-open');
});

$(menuChildItem).on('click', function() {
  $(menu).toggleClass('is-open');
  $(mask).toggleClass('is-visible');
  $('.selected').removeClass('selected');
  $(this).addClass('selected');
  $(left).text($(this).text());
});

$(notHasChild).on('click', function() {
  $(menu).toggleClass('is-open');
  $(mask).toggleClass('is-visible');
  $('.selected').removeClass('selected');
  $(this).addClass('selected');
  $(left).text($(this).text());
});

$(orgListToggle).on('click', function() {
  $(orgListToggle).toggleClass('is-open');
  $(orgList).toggleClass('hide-me');
  $(menuBody).toggleClass('hide-me');
});

$(orgListItem).on('click', function() {
  if ($(this).hasClass('preventDefault')) {

  } else {
      $(orgReplace).text($(this).text());
      $(org).text($(this).text());
      $(orgListToggle).text($(this).text());
  }
  $(orgListToggle).removeClass('is-open');
  $(orgList).addClass('hide-me');
  $(org).removeClass('is-open');
  $(menuBody).removeClass('hide-me');
  $(menu).toggleClass('is-open');
  $(mask).toggleClass('is-visible');
});

$(org).on('click', function() {
  if ($(this).hasClass('clickable')) {
    $(org).toggleClass('is-open');
    $(orgList).toggleClass('hide-me');
    $(menuBody).toggleClass('hide-me');
  }
});

$(window).on('resize', function() {
  if ($(this).width() > 800) {
    $(org).addClass('clickable');
  } else {
    $(org).removeClass('clickable');
  }
});

$(window).on('load', function() {
  if ($(this).width() > 800) {
    $(org).addClass('clickable');
  } else {
    $(org).removeClass('clickable');
  }
});


//selects the selected section in both navs 
$('li').click(function() {
  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected');
  }

  $(this).closest('.drop-toggle').addClass('selected');
  $('.drop-toggle').not($(this).closest('.drop-toggle')).removeClass('selected');
  $('.nav-item-toggle-wrap').not($(this).closest('.drop-toggle')).removeClass('selected');

  var link = $(this).find('div').attr("data-link");
  $('div[data-link=' + link + ']').each(function() {
    $(this).addClass('selected');
  });
  
  $('li[data-link=' + link + ']').each(function() {
    $(this).addClass('selected');
  });

});

$(dropToggle).on('click', function() {
  if ($(this).hasClass('search-toggle-wrap')) {
    if ($(dropOverflow).hasClass('is-open')) {
      $(searchToggle).toggleClass('close-search');
      $(searchWrap).removeClass('is-open');
      console.log('is-open');
    } else {
      $(dropOverflow).not($(this).find($(dropOverflow))).removeClass('is-open');
      $(searchInput).focus();
      $(searchToggle).toggleClass('close-search');
      $(searchWrap).addClass('is-open');
      console.log('is-not-open');
    }
  } else {
    console.log('is-not-search');
    $(dropOverflow).not($(this).find($(dropOverflow))).removeClass('is-open');
    $(this).find($(dropOverflow)).toggleClass('is-open');
    $(searchToggle).removeClass('close-search');
  }
});

$('.org-wrap .drop-child').on('click', function() {
    if ($(this).hasClass('preventDefault')) {

    } else {
      $(org).text($(this).text());
      $(orgReplace).text($(this).text());
    }
  
});