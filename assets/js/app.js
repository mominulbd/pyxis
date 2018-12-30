var CODEPIXAR = CODEPIXAR || {};

(function($) {

  /*!----------------------------------------------
  	# This beautiful code written with heart
  	# by Mominul Islam <me@mominul.me>
  	# In Dhaka, BD at the CodePixar workstation.
  	---------------------------------------------*/

  // USE STRICT
  "use strict";

  CODEPIXAR.initialize = {

    init: function() {
      CODEPIXAR.initialize.general();
      CODEPIXAR.initialize.portfolio();
      CODEPIXAR.initialize.slickSlider();
      CODEPIXAR.initialize.sectionBackground();
      CODEPIXAR.initialize.sectionSwitch();
      CODEPIXAR.initialize.priceFilter();
      CODEPIXAR.initialize.googleMap();
      CODEPIXAR.initialize.contactFrom();
    },

    /*========================================================*/
    /*=           Collection of snippet and tweaks           =*/
    /*========================================================*/

    general: function() {

      //Navigation Tabs
      $('.gp-tabs .gp-child').on('click', function() {
        var tab_id = $(this).attr('data-tab');

        $(this).siblings('.gp-child').removeClass('is-active');
        $(this).closest('.schedule-wrapper').find('.gp-tabs-content').children('.gp-tab-content').removeClass('is-active');

        $(this).addClass('is-active');
        $("#" + tab_id).addClass('is-active');
      });

      $('.swiper-container').each(function() {
        new SwiperRunner($(this));
      });


      $('.tilt').tilt({
        glare: true,
        maxGlare: .3,
        scale: 1.05,
        perspective: 1000,
        maxTilt: 10,
      })


      $('.date-picker').datepicker({
        'format': 'd/m/yyyy',
        'autoclose': true
      });


      /* Wow Js Init */
      var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true,
        scrollContainer: null,
      });

      wow.init();



      /* Bootstrap Accordion  */
      $('.faq .card-header').each(function() {
        var $this = $(this);
        $this.on('click', function(e) {
          var has = $this.hasClass('active');
          $('.faq .card-header').removeClass('active');
          if (has) {
            $this.removeClass('active');
          } else {
            $this.addClass('active');
          }
        });
      });

      /* Video Popup */
      $('.play-btn').magnificPopup({
        type: 'iframe'
      });

      //on item select
      $(".sofin-dropdown li").on('click', function(e) {
        var $target = $(e.target);
        var $dropdown = $target.closest(".sofin-dropdown");
        var $label = $dropdown.find("label");
        var $title = $label.find("span");
        var $toggle = $dropdown.find("input");

        if ($dropdown.hasClass("init") || ($toggle.is(":checked") && !$target.hasClass("selected"))) {
          $dropdown.removeClass("init");
          $dropdown.find("li.selected").removeClass("selected");
          $target.addClass("selected");
          $dropdown.attr("data-val", ($target.attr("data-val") || $target.attr("data-val") == "") ? $target.attr("data-val") : $target.text().trim());
          $title.text($target.attr("data-text") ? $target.attr("data-text") : $target.text().trim());
          $label.css("width", ($title.width() + 20) + "px");
          $toggle.prop("checked", false);
        }
      });

      //initialize with 1st option
      $(".lng-dropdown.init li:first-child").click();



      //Magnefic Popup
      $('.popup-modal').magnificPopup({
        type: 'image'
      });


      /* Quntity Control */

      $('.qty-box').each(function() {
        var $this = $(this),
          $qty = $('.input-number', $this);

        $this.on('click', '.quantity-right-plus', function(e) {
          e.preventDefault();

          var currentVal = parseInt($qty.val(), 10);
          if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
          }
        });

        $this.on('click', '.quantity-left-minus', function(e) {
          e.preventDefault();

          var currentVal = parseInt($qty.val(), 10);
          if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
          }
        });
      });


      var $items = $('.menu-item-has-children', $('.site-main-menu'));

      $items.each(function() {
        var $this = $(this),
          $anchor = $('> a', $this);

        $anchor.on('click', function(e) {
          var $this = $(this),
            style = $this.next().attr('style');
          e.preventDefault();
          $this.parent().parent().find('.menu-item-has-children, .menu-item-has-children.mega-menu').removeClass('sub-menu-open');
          $this.parent().parent().find('.menu-item-has-children > .sub-menu, .menu-item-has-children.mega-menu > .sub-menu').slideUp();
          if (!style || style === 'display: none;') {
            $this.closest('.menu-item-has-children').toggleClass('sub-menu-open');
            $this.next().slideToggle(300);
          }

        });
      });

      $('#nav-toggle').on('click', function() {
        $(this).toggleClass('active');
        $('.site-main-menu').slideToggle(300);
      });



      $('.sofin-select').on('click', '.placeholder', function() {
        var parent = $(this).closest('.sofin-select');
        if (!parent.hasClass('is-open')) {
          parent.addClass('is-open');
          $('.sofin-select.is-open').not(parent).removeClass('is-open');
        } else {
          parent.removeClass('is-open');
        }
      }).on('click', 'ul>li', function() {
        var parent = $(this).closest('.sofin-select');
        parent.removeClass('is-open').find('.placeholder').text($(this).text());
      });
    },


    /*==================================*/
    /*=           Slick Slider          =*/
    /*==================================*/

    portfolio: function() {

      if ((typeof $.fn.imagesLoaded !== 'undefined') && (typeof $.fn.isotope !== 'undefined')) {

        $(".sofin-portfolio-items").imagesLoaded(function() {

          var container = $(".sofin-portfolio-items");

          container.isotope({
            itemSelector: '.sofin-portfolio-item',
            layoutMode: 'masonry',
            transitionDuration: '0.5s'
          });

          $('.sofin-isotope-filter a').on('click', function() {
            $('.sofin-isotope-filter').find('.current').removeClass('current');
            $(this).parent().addClass('current');

            var selector = $(this).attr("data-filter");
            container.isotope({
              filter: selector
            });

            return false;
          });

          $(window).resize(function() {
            container.isotope();
            blogContainer.masonry();
          });

          $('body').scrollspy('refresh');

        });

        var blogContainer = $(".blog-items");

        blogContainer.masonry({
          itemSelector: '.blog-item',
          percentPosition: true
        });

      }

    },

    /*==================================*/
    /*=           Slick Slider          =*/
    /*==================================*/

    slickSlider: function() {
      $('.client-slider').slick({
        dots: false,
        infinite: true,
        arrows: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 700,
        slidesToShow: 4,
        pauseOnHover: true,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 420,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });

      $('.product-slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.prod-slider-nav',
        swipe: false
      });

      $('.prod-slider-nav').slick({
        vertical: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-slick',
        arrows: false,
        dots: false,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 576,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 380,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      });
    },

    /*==========================================*/
    /*=           Section Background           =*/
    /*==========================================*/

    sectionBackground: function() {

      // Section Background Image
      $('[data-bg-image]').each(function() {
        var img = $(this).data('bg-image');
        $(this).css({
          backgroundImage: 'url(' + img + ')',
        });
      });
    },

    /*=========================================*/
    /*=           Section Background          =*/
    /*=========================================*/

    sectionSwitch: function() {
      $('[data-type="section-switch"], .site-main-menu li a').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          if (target.length > 0) {

            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            $('html,body').animate({
              scrollTop: target.offset().top - 30
            }, 1000);
            return false;
          }
        }
      });
    },

    /*===================================*/
    /*=           Price Filter          =*/
    /*===================================*/

    priceFilter: function() {

      $(function() {
        $("#slider-range").slider({
          range: true,
          min: 0,
          max: 100,
          step: 5,
          values: [9, 70],
          slide: function(event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
          }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
          "  - $" + $("#slider-range").slider("values", 1));
      });

    },

    /*=================================*/
    /*=           Google Map          =*/
    /*=================================*/

    googleMap: function() {
      var address = [
        `Bangalore address
        info@antecamp.com
        (518) 457 - 5181 25462
        9: 30 - 23: 30`,
        `London address`,
        `Singpore address`,
        `Germany address`,
        `Mumbai address`,
        `Canada address`
      ]
      $('.gmap3-area').each(function() {
        var $this = $(this),
          key = $this.data('key'),
          lat = $this.data('lat'),
          lng = $this.data('lng'),
          mrkr = $this.data('mrkr');

        var map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: lat, lng: lng },
          zoom: 3,
          scrollwheel: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [{
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
              "saturation": 36
            }, {
              "color": "#333333"
            }, {
              "lightness": 40
            }]
          }, {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "visibility": "on"
            }, {
              "color": "#ffffff"
            }, {
              "lightness": 16
            }]
          }, {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
              "visibility": "off"
            }]
          }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#fefefe"
            }, {
              "lightness": 20
            }]
          }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#fefefe"
            }, {
              "lightness": 17
            }, {
              "weight": 1.2
            }]
          }, {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [{
              "saturation": "-9"
            }]
          }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
              "color": "#f5f5f5"
            }, {
              "lightness": 20
            }]
          }, {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [{
              "saturation": "-4"
            }, {
              "color": "#cdcdcd"
            }]
          }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
              "color": "#f5f5f5"
            }, {
              "lightness": 21
            }]
          }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
              "color": "#dedede"
            }, {
              "lightness": 21
            }]
          }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#ffffff"
            }, {
              "lightness": 17
            }]
          }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#ffffff"
            }, {
              "lightness": 29
            }, {
              "weight": 0.2
            }]
          }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
              "color": "#ffffff"
            }, {
              "lightness": 18
            }]
          }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
              "color": "#ffffff"
            }, {
              "lightness": 16
            }]
          }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
              "color": "#f2f2f2"
            }, {
              "lightness": 19
            }]
          }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
              "color": "#e9e9e9"
            }, {
              "lightness": 17
            }]
          }]
        });

        var markerBangalore = new google.maps.Marker({
          position: { lat: lat, lng: lng },
          map: map,
          icon: mrkr,
          title: 'Bangalore'
        });
        markerBangalore.addListener("click", function() {
          map.setZoom(10);
          map.setCenter(markerBangalore.getPosition());
          $('.contact-info').html(address[0]);
        });

        var markerLondon = new google.maps.Marker({
          position: { lat: 51.5171931, lng: -0.1445982 },
          map: map,
          icon: mrkr,
          title: 'London'
        });
        markerLondon.addListener("click", function() {
          map.setZoom(10);
          map.setCenter(markerLondon.getPosition());
          $(".contact-info").html(address[1]);
        });
        
        var markerSingapore = new google.maps.Marker({
          position: { lat: 1.2956618, lng: 103.8585702 },
          map: map,
          icon: mrkr,
          title: "Singapore"
        });
        markerSingapore.addListener('click', function () {
          map.setZoom(10);
          map.setCenter(markerSingapore.getPosition());
          $('.contact-info').html(address[2]);
        });

        var markerSingapore = new google.maps.Marker({
          position: { lat: 50.0827966, lng: 8.6269859 },
          map: map,
          icon: mrkr,
          title: "Germany"
        });
        markerSingapore.addListener('click', function () {
          map.setZoom(10);
          map.setCenter(markerSingapore.getPosition());
          $('.contact-info').html(address[3]);
        });

        var markerMumbai = new google.maps.Marker({
          position: { lat: 19.2080438, lng: 72.9707978 },
          map: map,
          icon: mrkr,
          title: "Mumbai"
        });
        markerMumbai.addListener('click', function () {
          map.setZoom(10);
          map.setCenter(markerMumbai.getPosition());
          $('.contact-info').html(address[4]);
        });

        var markerMumbai = new google.maps.Marker({
          position: { lat: 43.8341133, lng: -79.5089566 },
          map: map,
          icon: mrkr,
          title: "Canada"
        });
        markerMumbai.addListener('click', function () {
          map.setZoom(10);
          map.setCenter(markerMumbai.getPosition());
          $('.contact-info').html(address[5]);
        });


      });
    },

    /*=================================*/
    /*=           Contact Form          =*/
    /*=================================*/

    contactFrom: function() {

      $('[data-sofinform]').each(function() {
        var $this = $(this);
        $('.form-result', $this).css('display', 'none');

        $this.submit(function() {

          $('button[type="submit"]', $this).addClass('clicked');

          // Create a object and assign all fields name and value.
          var values = {};

          $('[name]', $this).each(function() {
            var $this = $(this),
              $name = $this.attr('name'),
              $value = $this.val();
            values[$name] = $value;
          });

          // Make Request
          $.ajax({
            url: $this.attr('action'),
            type: 'POST',
            data: values,
            success: function success(data) {

              if (data.error == true) {
                $('.form-result', $this).addClass('alert-warning').removeClass('alert-success alert-danger').css('display', 'block');
              } else {
                $('.form-result', $this).addClass('alert-success').removeClass('alert-warning alert-danger').css('display', 'block');
              }
              $('.form-result > .content', $this).html(data.message);
              $('button[type="submit"]', $this).removeClass('clicked');
            },
            error: function error() {
              $('.form-result', $this).addClass('alert-danger').removeClass('alert-warning alert-success').css('display', 'block');
              $('.form-result > .content', $this).html('Sorry, an error occurred.');
              $('button[type="submit"]', $this).removeClass('clicked');
            }
          });
          return false;
        });

      });
    }

  };

  CODEPIXAR.documentOnReady = {
    init: function() {
      CODEPIXAR.initialize.init();

    },
  };

  CODEPIXAR.documentOnLoad = {
    init: function() {
      $(".page-loader").fadeOut("slow");
    },
  };

  CODEPIXAR.documentOnResize = {
    init: function() {

    },
  };

  CODEPIXAR.documentOnScroll = {
    init: function() {
      CODEPIXAR.initialize.sectionBackground();

      if ($(window).scrollTop() > 300) {
        $('.return-to-top').addClass('back-top');
      } else {
        $('.return-to-top').removeClass('back-top');
      }

      /* Header Sticky */
      if ($(this).scrollTop() > 0) {
        $('.site-header').addClass("gp-header-fixed")
      } else {
        $('.site-header').removeClass("gp-header-fixed")
      }

    },
  };

  // Initialize Functions
  $(document).ready(CODEPIXAR.documentOnReady.init);
  $(window).on('load', CODEPIXAR.documentOnLoad.init);
  $(window).on('resize', CODEPIXAR.documentOnResize.init);
  $(window).on('scroll', CODEPIXAR.documentOnScroll.init);

})(jQuery);