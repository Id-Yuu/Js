(function($) {
  /**
   * @param {Object} element
   * @param {boolean} immediately
   * @return {undefined}
   */
  function hide(element, immediately) {
    var opts = element.data("settings");
    if (typeof immediately === "undefined") {
      /** @type {boolean} */
      immediately = false;
    }
    if (immediately) {
      animate(element);
    }
    var data = update(element);
    element.animate(data.css, data.time, "linear", function() {
      element.css(opts.direction, "0");
      hide(element, true);
    });
  }
  /**
   * @param {Object} element
   * @return {?}
   */
  function update(element) {
    var options = element.data("settings");
    var $parent = element.children().first();
    /** @type {number} */
    var speed = Math.abs(-element.css(options.direction).replace("px", "").replace("auto", "0") - $parent.outerWidth(true));
    options = element.data("settings");
    /** @type {number} */
    var time = speed * 1E3 / options.speed;
    var result = {};
    /** @type {number} */
    result[options.direction] = element.css(options.direction).replace("px", "").replace("auto", "0") - speed;
    return{
      css : result,
      time : time
    };
  }
  /**
   * @param {Object} element
   * @return {undefined}
   */
  function animate(element) {
    var settings = element.data("settings");
    element.css("transition-duration", "0s").css(settings.direction, "0");
    var $html = element.children().first();
    if ($html.hasClass("webticker-init")) {
      $html.remove();
    } else {
      element.children().last().after($html);
    }
  }
  /**
   * @param {Object} element
   * @param {boolean} recurring
   * @return {undefined}
   */
  function callback(element, recurring) {
    if (typeof recurring === "undefined") {
      /** @type {boolean} */
      recurring = false;
    }
    if (recurring) {
      animate(element);
    }
    var data = update(element);
    /** @type {number} */
    var size = data.time / 1E3;
    size += "s";
    element.css(data.css).css("transition-duration", size);
  }
  /**
   * @param {?} elem
   * @param {?} arg2
   * @param {?} state
   * @return {undefined}
   */
  function test(elem, arg2, state) {
    var PUBLISHED;
    $.get(elem, function(elem) {
      var q = $(elem);
      q.find("item").each(function() {
        var doc = $(this);
        var data = {
          title : doc.find("title").text(),
          link : doc.find("link").text()
        };
        /** @type {string} */
        listItem = "<li><a href='" + data.link + "'>" + data.title + "</a></li>";
        PUBLISHED += listItem;
      });
      state.webTicker("update", PUBLISHED, arg2);
    });
  }
  /**
   * @param {Object} el
   * @return {undefined}
   */
  function init(el) {
    var settings = el.data("settings");
    el.width("auto");
    /** @type {number} */
    var x = 0;
    el.children("li").each(function() {
      x += $(this).outerWidth(true);
    });
    if (x < el.parent().width() || el.children().length == 1) {
      if (settings.duplicate) {
        /** @type {number} */
        itemWidth = Math.max.apply(Math, el.children().map(function() {
          return $(this).width();
        }).get());
        for (;x - itemWidth < el.parent().width() || el.children().length == 1;) {
          var childEl = el.children().clone();
          el.append(childEl);
          /** @type {number} */
          x = 0;
          el.children("li").each(function() {
            x += $(this).outerWidth(true);
          });
          /** @type {number} */
          itemWidth = Math.max.apply(Math, el.children().map(function() {
            return $(this).width();
          }).get());
        }
      } else {
        /** @type {number} */
        var dx0 = el.parent().width() - x;
        dx0 += el.find("li:first").width();
        var o = el.find("li:first").height();
        el.append('<li class="ticker-spacer" style="width:' + dx0 + "px;height:" + o + 'px;"></li>');
      }
    }
    if (settings.startEmpty) {
      o = el.find("li:first").height();
      el.prepend('<li class="webticker-init" style="width:' + el.parent().width() + "px;height:" + o + 'px;"></li>');
    }
    /** @type {number} */
    x = 0;
    el.children("li").each(function() {
      x += $(this).outerWidth(true);
    });
    el.width(x + 200);
    /** @type {number} */
    widthCompare = 0;
    el.children("li").each(function() {
      widthCompare += $(this).outerWidth(true);
    });
    for (;widthCompare >= el.width();) {
      el.width(el.width() + 200);
      /** @type {number} */
      widthCompare = 0;
      el.children("li").each(function() {
        widthCompare += $(this).outerWidth(true);
      });
    }
  }
  var t = function() {
    /** @type {(CSSStyleDeclaration|null)} */
    var s = document.createElement("p").style;
    /** @type {Array} */
    var v = ["ms", "O", "Moz", "Webkit"];
    if (s["transition"] == "") {
      return true;
    }
    for (;v.length;) {
      if (v.pop() + "Transition" in s) {
        return true;
      }
    }
    return false;
  }();
  var methods = {
    /**
     * @param {Text} settings
     * @return {?}
     */
    init : function(settings) {
      settings = jQuery.extend({
        speed : 50,
        direction : "left",
        moving : true,
        startEmpty : true,
        duplicate : false,
        rssurl : false,
        hoverpause : true,
        rssfrequency : 0,
        updatetype : "reset"
      }, settings);
      return this.each(function() {
        jQuery(this).data("settings", settings);
        var el = jQuery(this);
        el.addClass("newsticker");
        var opts = el.wrap("<div class='layoutCarousel'></div>");
        opts.after("<span class='tickeroverlay-left'>&nbsp;</span><span class='tickeroverlay-right'>&nbsp;</span>");
        var f = el.parent().wrap("<div class='tickercontainer'></div>");
        init(el);
        if (settings.rssurl) {
          test(settings.rssurl, settings.type, el);
          if (settings.rssfrequency > 0) {
            window.setInterval(function() {
              test(settings.rssurl, settings.type, el);
            }, settings.rssfrequency * 1E3 * 60);
          }
        }
        if (t) {
          el.css("transition-duration", "0s").css(settings.direction, "0");
          callback(el, false);
          el.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function(event) {
            if (!el.is(event.target)) {
              return false;
            }
            callback($(this), true);
          });
        } else {
          hide($(this));
        }
        if (settings.hoverpause) {
          el.hover(function() {
            if (t) {
              var meterPos = $(this).css(settings.direction);
              $(this).css("transition-duration", "0s").css(settings.direction, meterPos);
            } else {
              jQuery(this).stop();
            }
          }, function() {
            if (jQuery(this).data("settings").moving) {
              if (t) {
                callback($(this), false);
              } else {
                hide(el);
              }
            }
          });
        }
      });
    },
    /**
     * @return {?}
     */
    stop : function() {
      var data = $(this).data("settings");
      if (data.moving) {
        /** @type {boolean} */
        data.moving = false;
        return this.each(function() {
          if (t) {
            var meterPos = $(this).css(data.direction);
            $(this).css("transition-duration", "0s").css(data.direction, meterPos);
          } else {
            $(this).stop();
          }
        });
      }
    },
    /**
     * @return {?}
     */
    cont : function() {
      var data = $(this).data("settings");
      if (!data.moving) {
        /** @type {boolean} */
        data.moving = true;
        return this.each(function() {
          if (t) {
            callback($(this), false);
          } else {
            hide($(this));
          }
        });
      }
    },
    /**
     * @param {(Array|string)} items
     * @param {string} todo
     * @param {boolean} bytes
     * @param {boolean} val
     * @return {undefined}
     */
    update : function(items, todo, bytes, val) {
      todo = todo || "reset";
      if (typeof bytes === "undefined") {
        /** @type {boolean} */
        bytes = true;
      }
      if (typeof val === "undefined") {
        /** @type {boolean} */
        val = false;
      }
      if (typeof items === "string") {
        items = $(items);
      }
      var self = $(this);
      self.webTicker("stop");
      var data = $(this).data("settings");
      if (todo == "reset") {
        self.html(items);
        self.css(data.direction, "0");
        init(self);
      } else {
        if (todo == "swap") {
          self.children("li").addClass("old");
          /** @type {number} */
          var i = 0;
          for (;i < items.length;i++) {
            id = $(items[i]).data("update");
            match = self.find('[data-update="' + id + '"]');
            if (match.length < 1) {
              if (bytes) {
                if (self.find(".ticker-spacer:first-child").length == 0 && self.find(".ticker-spacer").length > 0) {
                  self.children("li.ticker-spacer").before(items[i]);
                } else {
                  self.append(items[i]);
                }
              }
            } else {
              self.find('[data-update="' + id + '"]').replaceWith(items[i]);
            }
          }
          self.children("li.webticker-init, li.ticker-spacer").removeClass("old");
          if (val) {
            self.children("li").remove(".old");
          }
          /** @type {number} */
          stripWidth = 0;
          self.children("li").each(function() {
            stripWidth += $(this).outerWidth(true);
          });
          self.width(stripWidth + 200);
        }
      }
      self.webTicker("cont");
    }
  };
  /**
   * @param {string} method
   * @return {?}
   */
  $.fn.webTicker = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      if (typeof method === "object" || !method) {
        return methods.init.apply(this, arguments);
      } else {
        $.error("Method " + method + " does not exist on jQuery.webTicker");
      }
    }
  };
})(jQuery);
