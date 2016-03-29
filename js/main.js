var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var menu = require('./menu');

// create desktop menu
menu.create();

var VIDEO_PATH = path.resolve(__dirname, "files/videos");
var BANNER_PATH = path.resolve(__dirname, "files/banners");
var MVP_PATH = path.resolve(__dirname, "files/mvp");
var PROFILE_PATH = path.resolve(__dirname, "files/profiles/");

// load config
var config = loadJSON(path.resolve(__dirname, "config.json"));

// load mvp data
var latest = _.max(fs.readdirSync(MVP_PATH));
var mvp = loadJSON(path.resolve(MVP_PATH, latest, "data.json"));
var videos = fs.readdirSync(VIDEO_PATH);
var banners = fs.readdirSync(BANNER_PATH);

$(function() {
  var items = [];
  _.each(_.sampleSize(videos, config.video_num), function(val) {
    items.push('<div class="slide-item video">\
                  <div class="row">\
                    <video autoplay muted controls="false" preload="auto" id="video1">\
                       <source src="' +  path.resolve(VIDEO_PATH, val) + '" type="video/mp4">\
                    </video>\
                  </div>\
                </div>');
  });

  _.each(_.sampleSize(banners, config.banner_num), function(val) {
      items.push('<div class="slide-item banner">\
                    <div class="row">\
                      <img src="' + path.resolve(BANNER_PATH, val) + '" />\
                    </div>\
                  </div>');
  });


  _.each(mvp, function(val, key) {
    if (!config.members[key]) {
      return;
    }
    items.push('<div class="slide-item member">\
                  <div class="row">\
                    <div class="col-md-2">\
                      <img class="member-profile thumbnail" src="' + path.resolve(PROFILE_PATH, key) + '.png" />\
                    </div>\
                    <div class="col-md-10">\
                      <h1>' + config.members[key].name + '</h1>\
                    </div>\
                  </div>\
                  <div class="row">\
                    <div class="col-md-10">\
                      <img class="member-banner" src="' + path.resolve(MVP_PATH, latest, val.banner) + '" />\
                    </div>\
                    <div class="col-md-2">\
                      <h2>CTR: ' + val.CTR + '% </h2>\
                      <h2>CVR: ' + val.CVR + '% </h2>\
                    </div>\
                  </div>\
                </div>');
  });

  $("#start").after($(items.join("")));

  var MODES = ['horizontal', 'fade'];
  var EASINGS = ['linear','swing','easeInQuad','easeOutQuad','easeInOutQuad','easeInCubic','easeOutCubic','easeInOutCubic','easeInQuart','easeOutQuart','easeInOutQuart','easeInQuint','easeOutQuint','easeInOutQuint','easeInExpo','easeOutExpo','easeInOutExpo','easeInSine','easeOutSine','easeInOutSine','easeInCirc','easeOutCirc','easeInOutCirc','easeInElastic','easeOutElastic','easeInOutElastic','easeInBack','easeOutBack','easeInOutBack','easeInBounce','easeOutBounce','easeInOutBounce'];  var OPTS = {
    video: {
      speed: 1500,
      pause: config.video_duration_sec * 1000
    },
    banner: {
      speed: 500,
      pause: config.banner_duration_sec * 1000
    },
    member: {
      speed: 500,
      pause: config.member_duration_sec * 1000
    }
  };

  var opt_name = 'video'; // only work with it
  var slider = $('#slider').bxSlider();
  updateSlider(0, opt_name);
  var count = slider.getSlideCount();

  function onSlideAfterHandler(curSlide) {
    // reload page when slide end
    if (slider.getCurrentSlide() == (count - 1)) {
      setTimeout(function() {
        console.log("end - reload page");
        location.reload(true);
      }, OPTS[opt_name].pause);
    }

    // video
    if (curSlide.hasClass("video")) { // never come here
      if (opt_name != "video") {
        console.log("change to video setting");
        opt_name = "video";
        updateSlider(slider.getCurrentSlide(), opt_name);
        return;
      }

      // can not play video in onSlideAfterHandler
      slider.stopAuto();
      curSlide.find('video')[0].play();
    }

    // banner
    if (curSlide.hasClass("banner")) {
      if (opt_name != "banner") {
        console.log("change to banner setting");
        opt_name = "banner";
        updateSlider(slider.getCurrentSlide(), opt_name);
        return;
      }
    }

    // member
    if (curSlide.hasClass("member")) {
      if (opt_name != "member") {
        console.log("change to member setting");
        opt_name = "member";
        updateSlider(slider.getCurrentSlide(), opt_name);
        return;
      }
    }
  }

  function updateSlider(startSlide, opt_name) {
    startSlide = startSlide || 0;

    var easing = EASINGS[Math.floor(Math.random() * EASINGS.length)];
    var mode = MODES[Math.floor(Math.random() * MODES.length)]
    var opts = OPTS[opt_name];

    slider.reloadSlider({
      auto: true,
      controls: false,
    //  autoControls: true,
      speed: opts.speed,
      pause: opts.pause,
      mode: mode,
      useCSS: false,
      easing: easing,
      pager: false,
      infiniteLoop: false,
      adaptiveHeight: true,
      startSlide: startSlide,
      onSlideAfter: onSlideAfterHandler
    });
  }

  $('video').each(function() {
     this.onended = function() {
        slider.startAuto();
     };
     // remove controls
     this.removeAttribute("controls");
  });
});

function loadJSON(path) {
  var json = {};
  try {
    var file = fs.readFileSync(path);
    json = JSON.parse(file);
  } catch (e) {
    alert("Config file error:" + path);
  }

  return json;
 }