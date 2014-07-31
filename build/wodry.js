(function() {
  var $,
    __hasProp = {}.hasOwnProperty;

  $ = jQuery;

  $.fn.extend({
    wodry: function(config) {
      var settings;
      if (config == null) {
        config = {};
      }
      settings = $.extend({}, config);
      if (settings.separator == null) {
        settings.separator = '|';
      }
      if (settings.delay == null) {
        settings.delay = 2000;
      }
      if (settings.animationTime == null) {
        settings.animationTime = 500;
      }
      if (settings.arm == null) {
        settings.arm = 100;
      }
      if (settings.animation == null) {
        settings.animation = 'rotateY';
      }
      if (settings.callback == null) {
        settings.callback = function() {};
      }
      this.animations = {
        rotateY: {
          front_transform: "translate3d(0,0," + settings.arm + "px)",
          back_transform: "translate3d(0,0," + settings.arm + "px) rotateY(180deg)",
          animation: {
            transform: " rotateY(180deg)",
            transition: " " + settings.animationTime + "ms"
          }
        }
      };
      return this.each(function() {
        var array, flip, flip_container, prefixer;
        flip_container = $(this);
        array = [];
        $.each(flip_container.text().split(settings.separator), function(key, value) {
          return array.push(value);
        });
        flip_container.text(array[0]);
        prefixer = function(properties, values) {
          var i, moz, o, propHash, property, result, value, webkit, _i, _len, _ref;
          result = {};
          propHash = {};
          for (_i = 0, _len = properties.length; _i < _len; _i++) {
            property = properties[_i];
            i = properties.indexOf(property);
            propHash[property] = values[i];
          }
          if (properties.length === values.length) {
            for (property in propHash) {
              if (!__hasProp.call(propHash, property)) continue;
              value = propHash[property];
              _ref = ["-webkit-" + property, "-moz-" + property, "-o-" + property], webkit = _ref[0], moz = _ref[1], o = _ref[2];
              result["" + webkit] = value;
              result["" + moz] = value;
              result["" + o] = value;
              result["" + property] = value;
            }
            return result;
          }
        };
        flip = function() {
          var back_text_index, front_text;
          if (flip_container.find(".back-face").length > 0) {
            flip_container.html(flip_container.find(".back-face").html());
          }
          front_text = flip_container.text();
          back_text_index = $.inArray(front_text, array);
          if ((back_text_index + 1) === array.length) {
            back_text_index = -1;
          }
          flip_container.html("");
          $("<span class='front-face'>" + front_text + "</span>").appendTo(flip_container);
          $(".front-face").css(prefixer(["transform"], ["translate3d(0,0," + settings.arm + "px)"]));
          $("<span class='back-face'>" + array[back_text_index + 1] + "</span>").appendTo(flip_container);
          $(".back-face").css(prefixer(["transform"], ["translate3d(0,0," + settings.arm + "px) rotateY(180deg)"]));
          return flip_container.wrapInner("<span class='adjecting' />").find(".adjecting").hide().show().css(prefixer(["transform", "transition"], [" rotateY(180deg)", " " + settings.animationTime + "ms"]));
        };
        return setInterval(function() {
          flip();
          return settings.callback();
        }, settings.delay + settings.animationTime);
      });
    }
  });

}).call(this);
