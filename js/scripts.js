"use strict";

/* Functions */
function leadZero(n) {
  return (n < 10 ? '0' : '') + n;
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function equalHeight(group) {
  if (jQuery(window).width() > '768') {
    var tallest = 0;
    jQuery(group).each(function () {
      var thisHeight = jQuery(this).css('height', '').outerHeight();
      if (thisHeight > tallest) {
        tallest = thisHeight;
      }
    });
    jQuery(group).css('height', tallest);
  } else {
    jQuery(group).css('height', '');
  }
}

function equalHeight_m(group) {
  var tallest = 0;
  jQuery(group).each(function () {
    var thisHeight = jQuery(this).css('height', '').outerHeight();
    if (thisHeight > tallest) {
      tallest = thisHeight;
    }
  });
  jQuery(group).css('height', tallest);
}

function search_popup(type) {
  if(jQuery('.header-search-button').length > 0) {
    jQuery('.search-popup').each(function() {
      var $this = jQuery(this),
          $sb = jQuery('.site-header .header-search-button i'),
          window_w = jQuery(window).width(),
          window_h = jQuery(window).height(),
          sb_left = $sb.offset().left+7.5,
          sb_top = $sb.position().top+7.5,
          result_h = sb_left*100/window_w,
          result_v = sb_top*100/window_h,
          size = 0;

      if($this.hasClass('active')) {
        size = 150;
      } else {
        size = 0;
      }
      
      $this.css({
        '-webkit-clip-path': 'circle('+size+'% at '+result_h+'% '+result_v+'%)',
        'clip-path': 'circle('+size+'% at '+result_h+'% '+result_v+'%)'
      });
    });
  }
}

jQuery(window).on('load', function () {
  jQuery('body').addClass('loaded');

  jQuery(window).trigger('resize').trigger('scroll');
  jQuery('.isotope').isotope();
  jQuery('.owl-carousel').trigger('refresh.owl.carousel');

  setTimeout(function () {
    jQuery(window).trigger('resize').trigger('scroll');
    jQuery('.owl-carousel').trigger('refresh.owl.carousel');
    jQuery('.isotope').isotope();
  }, 700)
});


jQuery(document).ready(function () {

  jQuery(document).on('click', '[href="#"]', function(e) {
    e.preventDefault();
  });

  jQuery('#wpadminbar').addClass('wpadminbar');

  /* Navigation Events */

  jQuery('.nav-butter.hidden_menu, .nav-butter.visible_menu').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active').parent().find('.navigation').removeClass('active');
    } else {
      jQuery(this).addClass('active').parent().find('.navigation').addClass('active');
    }
  });
  
  jQuery('.nav-butter.side_menu').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.site-header-side-nav').removeClass('active');
    } else {
      jQuery(this).addClass('active');
      jQuery('.site-header-side-nav').addClass('active');
    }
  });
  
  jQuery('.side-navigation a').on('click', function(e) {
    var $el = jQuery(this),
        $parent = $el.parent();

    if($parent.hasClass('menu-item-has-children') && !$parent.hasClass('active')) {
      e.preventDefault();

      $parent.addClass('hide active').siblings().addClass('hide');
      $el.parents('.sub-menu').addClass('opened');
    }
  });
  
  jQuery('.side-navigation .sub-menu > .back').on('click', function() {
    var $el = jQuery(this);

    $el.parent().parent().removeClass('hide active').siblings().removeClass('hide');
    $el.parent().parent().removeClass('opened').parent().removeClass('opened');
  });
  
  jQuery('.side-navigation .sub-menu').prepend('<li class="back free-basic-ui-elements-left-arrow"></li>');

  /* Scroll Event */

  jQuery(window).on('load scroll', function () {
    var scroll_top = jQuery(document).scrollTop(),
      scroll_top_w = scroll_top + jQuery(window).height(),
      scroll_top_w2 = scroll_top + (jQuery(window).height() / 2);

    if (scroll_top > 50) {
      jQuery('.site-header').addClass('fixed');
    } else {
      jQuery('.site-header').removeClass('fixed');
    }
  });

  /* Resize Events */

  var nav_el = '';
	if(jQuery('.navigation').hasClass('visible_menu')) {
		nav_el = 'yes';
	}

  jQuery(window).on('load resize', function () {
    var window_height = jQuery(window).height() - jQuery('#wpadminbar').height() - jQuery('.header-space:visible').height();

    jQuery('.full-height').css('height', window_height);
    jQuery('.site-header.on-side').css('width', window_height);

    jQuery('.icon-box-carousel').each(function () {
      equalHeight_m(jQuery(this).find('.icon-box'));
    });

    jQuery('.main-container, .protected-post-form').css('min-height', window_height-jQuery('.site-footer').outerHeight());

    search_popup('recalc');

    if (nav_el == "yes") {
			if(jQuery(window).width() >= 992) {
				jQuery('.navigation, .nav-butter').addClass('visible_menu').removeClass('hidden_menu');
			} else {
				jQuery('.navigation, .nav-butter').removeClass('visible_menu').addClass('hidden_menu');
			}
    }
  });

  /* Mobile Menu */
  
  jQuery('.navigation .menu-item-has-children > a').on("click", function(){
    if(jQuery(window).width() < 992) {
      if(!jQuery(this).hasClass('current')) {
        jQuery(this).addClass('current').parent().children('.sub-menu').slideDown().siblings().children('.sub-menu').slideUp();
        return false;
      }
    }
  });

  /* Icon Box Hover */

  jQuery(document).on('mouseenter', '.icon-box', function () {
    var $this = jQuery(this),
      h = -jQuery(this).find('.dropdown').outerHeight(true) / 2;
    console.log(jQuery(this).find('.dropdown').outerHeight(true));
    $this.addClass('hover').find('.wrap').stop().css('margin', h + 'px 0').find('.dropdown').stop().slideDown(300);
  }).on('mouseleave', '.icon-box', function () {
    var $this = jQuery(this);
    $this.removeClass('hover').find('.wrap').stop().css('margin', 0).find('.dropdown').stop().slideUp(300);
  });

  /* Mouse Button */

  jQuery('.mouse-button').on('click', function () {
    var $area = jQuery(this).parent(),
      top = $area.offset().top + $area.height();

    jQuery('body, html').animate({
      scrollTop: top
    }, 1100);
    return false;
  });

  /* Focus on Input */

  jQuery('.input-row input.style1, .input-row textarea.style1, .input-row input.input-text, .input-row textarea.input-text, .woocommerce-form-row input.input-text, .woocommerce-form-row textarea.input-text').on('focusin', function () {
    jQuery(this).parents('.input-row').addClass('focus');
  }).on('focusout', function () {
    if (!jQuery(this).val()) {
      jQuery(this).parents('.input-row').removeClass('focus').addClass('focusout').delay(450).queue(function (next) {
        jQuery(this).removeClass('focusout');
        next();
      });
    }
  }).each(function () {
    if (jQuery(this).val()) {
      jQuery(this).parents('.input-row').addClass('focus');
    }
  });

  /* Portfolio */

  jQuery('.portfolio-items.isotope').each(function () {
    var $grid = jQuery(this).isotope({
      itemSelector: 'article',
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });

    jQuery(this).parents('.portfolio-block').on('click', '.filter-buttons button', function () {
      jQuery(this).addClass('current').siblings().removeClass('current');
      var filterValue = jQuery(this).attr('data-filter');
      $grid.isotope({
        filter: filterValue
      });
      jQuery(window).trigger('resize').trigger('scroll');
    });
  });

  /* Project Gallery */

  jQuery('.project-gallery.isotope').each(function () {
    jQuery(this).isotope({
      itemSelector: '.item',
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });
  });

  /* Project Slider */

  if(jQuery('.project-slider .swiper-slide').length > 1) {
    var $project_slider = jQuery('.project-slider'),
    $project_slider_container = new Swiper($project_slider.find('.swiper-container'), {
      loop: true,
      navigation: {
        nextEl: $project_slider.find('.next'),
        prevEl: $project_slider.find('.prev'),
      },
    });
  }

  /* Reply Comment */

  jQuery('.replytocom').on('click', function(){
		var id_parent = jQuery(this).attr('data-id');
		jQuery('#comment_parent').val(id_parent);
		jQuery('#respond').appendTo(jQuery(this).parents('.comment-item'));
		jQuery('#cancel-comment-reply-link').show();
		return false;
  });
  
  jQuery('#cancel-comment-reply-link').on('click', function(){
		jQuery('#comment_parent').val('0');
		jQuery('#respond').appendTo(jQuery('#commentform-area'));
		jQuery('#cancel-comment-reply-link').hide();
		return false;
  });

  /* Quantity Buttons */
  
  jQuery('.quantity .down').on("click", function(){
		var val = jQuery(this).parent().find('.input-text').val();
		if(val > 1) {
			val = parseInt(val) - 1;
			jQuery(this).parent().find('.input-text').val(val);
		}
		return false;
	});

	jQuery('.quantity .up').on("click", function(){
    var val = jQuery(this).parent().find('.input-text').val(),
        max = jQuery(this).parent().find('.input-text').attr('max');
    if(max == '' || val < max) {
      val = parseInt(val) + 1;
      jQuery(this).parent().find('.input-text').val(val);
    }
		return false;
  });
  
  /* Scrollbar */

  jQuery('.scrollbar-inner').each(function() {
    jQuery(this).scrollbar({
      'scrollx': false,
    })
  });

  /* Search Popup */

  jQuery('.site-header .header-search-button, .search-popup .close').on('click', function() {
    jQuery(this).toggleClass('active');
    jQuery('.search-popup').toggleClass('active');

    search_popup('toggle');
  });

  /* Right Click Disable */

  jQuery('.right-click-disable-true').on('contextmenu', function() {
		jQuery('.right-click-disable-message').addClass('active');
		return false;
  });
  
  jQuery('.right-click-disable-message:not(.lic)').on('click', function() {
		jQuery(this).removeClass('active');
		return false;
	});
});