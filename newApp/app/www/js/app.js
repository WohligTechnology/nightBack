var socialShare = {};
var push = {};
var googleanalyticsid = 'UA-67616258-1';
var isapp = true;
var config = {};
var onoffline = false;
var platform = "";

function addanalytics(screen) {
  if (window.analytics) {
    window.analytics.startTrackerWithId(googleanalyticsid);
    if (screen) {
      window.analytics.trackView(screen);
      window.analytics.trackEvent("Page Load", screen, screen, 1);
    } else {
      window.analytics.setUserId($.jStorage.get("user")._id);
      window.analytics.trackEvent("User ID Tracking", "User ID Tracking", "Userid", $.jStorage.get("user")._id);
    }
  }
}

angular.module('starter', ['ionic', 'starter.controllers', 'ionic-cache-src'])

.run(function($ionicPlatform, MyServices, $ionicPopup, $timeout, $state, $cordovaDevice) {

  $state.go("access.slider");
  if ($.jStorage.get("introslider") === false || $.jStorage.get("introslider") !== null) {
    $state.go("access.slider");
  }
  loadMenu(MyServices, $ionicPopup, $timeout);
  $ionicPlatform.ready(function() {

    // MyServices.getall
    if (window && window.plugins && window.plugins.socialsharing && window.plugins.socialsharing.share) {
      socialShare = window.plugins.socialsharing.share;
    }
    platform = $cordovaDevice.getPlatform();
    console.log(platform);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.overlaysWebView(true);
      StatusBar.styleLightContent();
    }
    if (window.cordova && window.cordova.platformId == 'android') {
      StatusBar.backgroundColorByHexString("#c12828");
    }
    if (window.cordova) {
      isapp = true;
    } else {
      isapp = false;
    }
    try {
      push = PushNotification.init({
        "android": {
          "senderID": "824698645594",
          "icon": "www/img/icon.png"
        },
        "ios": {
          "alert": "true",
          "badge": "true",
          "sound": "true"
        },
        "windows": {}
      });

      push.on('registration', function(data) {
        console.log(data);

        function setNoti(data) {
          if (data) {
            $.jStorage.set("notificationDeviceId", data);
          }
        }
        if (!$.jStorage.get("notificationDeviceId")) {
          $.jStorage.set("token", data.registrationId);
          var isIOS = ionic.Platform.isIOS();
          var isAndroid = ionic.Platform.isAndroid();
          if (isIOS) {
            $.jStorage.set("os", "iOS");
          } else if (isAndroid) {
            $.jStorage.set("os", "Android");
          }
          MyServices.setNotificationToken(setNoti);
        }

      });

      push.on('notification', function(data) {
        console.log(data);
      });

      push.on('error', function(e) {
        conosle.log("ERROR");
        console.log(e);
      });
    } catch (e) {
      console.log(e);
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $httpProvider.defaults.withCredentials = true;
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('access', {
    url: '/access',
    abstract: true,
    templateUrl: 'templates/access.html',
    controller: 'AccessCtrl'
  })

  .state('access.login', {
    url: '/login',
    views: {
      'content': {
        templateUrl: 'templates/accessView/login.html',
        controller: "LoginCtrl"
      }
    }
  })

  .state('access.signup', {
    url: '/signup',
    views: {
      'content': {
        templateUrl: 'templates/accessView/signup.html',
        controller: "LoginCtrl"
      }
    }
  })

  .state('access.resetpassword', {
    url: '/resetpassword',
    views: {
      'content': {
        templateUrl: 'templates/accessView/resetpassword.html',
        controller: "ResetPasswordCtrl"
      }
    }
  })

  .state('access.offline', {
    url: '/offline',
    views: {
      'content': {
        templateUrl: 'templates/accessView/offline.html',
        controller: "OfflineCtrl"
      }
    }
  })

  .state('access.forgotpassword', {
    url: '/forgotpassword',
    views: {
      'content': {
        templateUrl: 'templates/accessView/forgotpassword.html',
        controller: 'ForgotPasswordCtrl'
      }
    }
  })

  .state('access.slider', {
    url: '/introslider',
    views: {
      'content': {
        templateUrl: 'templates/accessView/introslider.html',
        controller: 'IntroSliderCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/home.html',
        controller: "HomeCtrl"
      }
    }
  })

  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/about.html',
        controller: "AboutCtrl"
      }
    }
  })

  .state('app.team', {
    url: '/team',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/team.html',
        controller: "TeamCtrl"
      }
    }
  })

  .state('app.article', {
    url: '/article/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/article.html',
        controller: "ArticleCtrl"
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/profile.html',
        controller: "ProfileCtrl"
      }
    }
  })

  .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'templates/appView/events.html',
          controller: "EventsCtrl"
        }
      }
    })
    .state('app.audiogallery', {
      url: '/audiogallery',
      views: {
        'menuContent': {
          templateUrl: 'templates/appView/audiogallery.html',
          controller: "AudiogalleryCtrl"
        }
      }
    })
    .state('app.audiogallerycategory', {
      url: '/audiogallerycategory',
      views: {
        'menuContent': {
          templateUrl: 'templates/appView/audiogallerycategory.html',
          controller: "AudiogallerycategoryCtrl"
        }
      },
      params: {
        item: "",
        items: ""
      }
    })

  .state('app.eventdetail', {
    url: '/eventdetail/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/eventdetail.html',
        controller: "EventDetailCtrl"
      }
    }
  })

  .state('app.blogs', {
    url: '/blogs',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/blogs.html',
        controller: "BlogsCtrl"
      }
    }
  })

  .state('app.blogdetail', {
    url: '/blogdetail/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/blogdetail.html',
        controller: "BlogDetailCtrl"
      }
    }
  })

  .state('app.photogallerycategory', {
    url: '/photogallerycategory',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/photogallerycategory.html',
        controller: "PhotoGalleryCategoryCtrl"
      }
    }
  })

  .state('app.photogallery', {
    url: '/photogallery/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/photogallery.html',
        controller: "PhotoGalleryCtrl"
      }
    }
  })

  .state('app.videogallerycategory', {
    url: '/videogallerycategory',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/videogallerycategory.html',
        controller: "VideoGalleryCategoryCtrl"
      }
    }
  })

  .state('app.videogallery', {
    url: '/videogallery/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/videogallery.html',
        controller: "VideoGalleryCtrl"
      }
    }
  })

  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/account.html',
        controller: "AccountCtrl"
      }
    }
  })

  .state('app.setting', {
    url: '/setting',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/setting.html',
        controller: "SettingCtrl"
      }
    }
  })

  .state('app.social', {
    url: '/social',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/social.html',
        controller: "SocialCtrl"
      }
    }
  })

  .state('app.notification', {
    url: '/notification',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/notification.html',
        controller: "NotificationCtrl"
      }
    }
  })

  .state('app.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/contact.html',
        controller: "ContactCtrl"
      }
    }
  })

  .state('app.enquiry', {
    url: '/enquiry',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/enquiry.html',
        controller: "EnquiryCtrl"
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/appView/search.html',
        controller: "SearchCtrl"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/access/introslider');

})

.filter('serverpath', function() {
  return function(input, width, height, style, prof) {
    var other = "";
    if (width && width !== "") {
      other += "&width=" + width;
    }
    if (height && height !== "") {
      other += "&height=" + height;
    }
    if (style && style !== "") {
      other += "&style=" + style;
    }
    if (input) {
      return adminimage + input + other;
    } else {
      if (prof && prof == "profile") {
        return "img/user.jpg";
      } else {
        return "img/default.png";
      }
    }
  };
})

.filter('serverpathprofile', function() {
  return function(input, width, height, style) {
    var other = "";
    if (width && width !== "") {
      other += "&width=" + width;
    }
    if (height && height !== "") {
      other += "&height=" + height;
    }
    if (style && style !== "") {
      other += "&style=" + style;
    }
    if (input) {
      return adminimage + input + other;
    } else {
      return "/img/user.jpg";
    }
  };
})

.filter('serverimage', function() {
    return function(image) {
      if (image && image !== null) {
        var start = image.substr(0, 4);

        if (start == "http") {
          return image;
        }

        return adminimage + image;
      } else {
        return undefined;
      }
    };
  })
  .filter('extractVideoId', function() {
    return function(url) {
      var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
      if (videoid !== null) {
        return videoid[1];
      } else {
        return false;
      }
    };
  })

.filter('profileimg', function() {
  return function(image) {
    if (image && image !== null) {
      var start = image.substr(0, 4);

      if (start == "http") {
        return image;
      }

      return adminimage + image;
    } else {
      return "img/user.jpg";
    }
  };
})

.directive('youtube', function($sce) {
  return {
    restrict: 'A',
    scope: {
      code: '='
    },
    replace: true,
    template: '<iframe id="popup-youtube-player" style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowscriptaccess="always"></iframe>',
    link: function(scope) {
      scope.$watch('code', function(newVal) {
        if (newVal) {
          scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
        }
      });
    }
  };
})


.filter('convertto12', function() {
  return function(date) {
    var newtime = "";
    if (date) {
      var split = date.split(":");
      if (parseInt(split[0]) >= 12) {
        newtime = (parseInt(split[0]) - 12) + ":" + split[1] + " PM onwards .";
      } else {
        newtime = split[0] + ":" + split[1] + " AM onwards .";
      }
      return newtime;
    }
  };
})

.filter('cut', function() {
  return function(value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;
    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace != -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || ' …');
  };
})

.filter('toPages', function() {
  return function(menu, value) {
    var newmenu = {};
    switch (menu.type) {
      case 'Blog':
        newmenu.typeid = menu.link._id;
        newmenu.link = 'blogdetail';
        break;
      case 'Event':
        newmenu.typeid = menu.link._id;
        newmenu.link = 'eventdetail';
        break;
      case 'Video Gallery':
        newmenu.typeid = menu.link._id;
        newmenu.link = "videogallery";
        break;
      case 'Photo Gallery':
        newmenu.typeid = menu.link._id;
        newmenu.link = "photogallery";
        break;
      case 'Home':
        newmenu.typeid = menu.link._id;
        newmenu.link = "article";
        break;
      case 'External Link':
        // newmenu.typeid = menu.link;
        newmenu.link = "blazen"+ menu.link;
        break;

      default:
        {
          switch (menu.link) {
            case 'Home':
              newmenu.link = "home";
              break;
            case 'Event':
              newmenu.link = "events";
              break;
            case 'Photo Gallery':
              newmenu.link = "photogallerycategory";
              break;
            case 'Video Gallery':
              newmenu.link = "videogallerycategory";
              break;
            case 'Audio':
              newmenu.link = "audiogallery";
              break;
            case 'Profile':
              newmenu.link = "profile";
              break;
            case 'Blog':
              newmenu.link = "blogs";
              break;
            case 'Notification':
              newmenu.link = "notification";
              break;
            case 'Contact':
              newmenu.link = "contact";
              break;
            case 'Social Feeds':
              newmenu.link = "social";
              break;
            case 'Enquiry Page':
              newmenu.link = "enquiry";
              break;
            default:
          }
        }
    }
    if (newmenu.typeid) {
      if (value == "default") {
        return "/app/" + newmenu.link + "/" + newmenu.typeid;
      } else {
        return "app." + newmenu.link + "({id:'" + newmenu.typeid + "'})";
      }
    } else {
      if (value == "default") {
        return "/app/" + newmenu.link;
      } else {
        return "app." + newmenu.link;
      }
    }
  };
})

.filter('cuthtml', function() {
  return function(value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;
    value = value.rendered.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace != -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || ' …');
  };
})

.filter('rawHtml', ['$sce',
    function($sce) {
      return function(val) {
        return $sce.trustAsHtml(val);
      };
    }
  ])
  .directive('navigationLink', function() {
    return {
      // templateUrl: 'views/directive/listType.html',
      restrict: 'A',
      scope: {
        uisref: '=uiSref'
      },
      link: function($scope, element, attrs) {
        console.log($scope.uisref);
      }
    };
  })
  .directive('onlyDigits', function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attr, ctrl) {
        var digits;

        function inputValue(val) {
          if (val) {
            if (attr.type == "tel") {
              digits = val.replace(/[^0-9\+\\]/g, '');
            } else {
              digits = val.replace(/[^0-9\-\\]/g, '');
            }


            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits, 10);
          }
          return undefined;
        }
        ctrl.$parsers.push(inputValue);
      }
    };
  })

.filter('formatdate', function($filter) {
  return function(val) {
    var splitval = val.toString().split(" ");
    return $filter('date')(splitval[0], 'dd MMMM, yyyy');
  };
})

.filter('noappid', function() {
  return function(val) {
    var val = val.replace("PageUrl", "");
    return val;
  };
})

.filter('url', function($filter) {
  return function(val) {
    if (val) {
      var splitval = val.split(",");
      return splitval[0];
    }
  };
})

.directive('fbPost', function($document) {
  return {
    restrict: 'EA',
    replace: false,
    link: function($scope, element, attr) {
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=1652034465042425";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  };
})


.directive('tweetBox', function($document) {
  return {
    restrict: 'EA',
    replace: false,
    link: function($scope, element, attr) {
      ! function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
          p = /^http:/.test(d.location) ? 'http' : 'https';
        if (!d.getElementById(id)) {
          js = d.createElement(s);
          js.id = id;
          js.src = p + "://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js, fjs);
        }
      }(document, "script", "twitter-wjs");
    }
  };
})

.directive('noInt', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        scope.signinsubmit = function(data) {
          scope.signinsubmit(data);
        };
        // if (checkConnectivity) {
        //   element.attr("disabled",false);
        // }else {
        //   element.attr("disabled",true);
        // }

      }
    };
  })
  .config(function($cacheSrcProvider) {
    $cacheSrcProvider
      .set({
        color: "#e10f0f"
      }); // set option
  })

.directive('imgloadingsec', function($compile, $parse) {
  return {
    restrict: 'EA',
    replace: false,
    link: function($scope, element, attrs) {
      var $element = $(element);
      if (!attrs.noloading) {
        $element.after("<img src='img/loading.gif' class='loading' />");
        var $loading = $element.next(".loading");
        $element.load(function() {
          $loading.remove();
          $(this).addClass("doneLoading");
        });
      } else {
        $($element).addClass("doneLoading");
      }
    }
  };
});

var loadMenu = function(MyServices, $ionicPopup, $timeout) {
  var navigation = {};
  MyServices.getNavigationMob(function(nav) {
    navigation.menu = nav.data;
    MyServices.getConfigMob(function(conf) {
      navigation.config = conf.data[0];
      config = navigation;
      config.defaultMenu = _.filter(config.menu, {
        'default': true
      });
      MyServices.setconfigdata(navigation);
      if (config.config.gaid) {
          googleanalyticsid = config.config.gaid;
      }
      if (config.config.soundCloudUsername) {
        soundCloudUsername = config.config.soundCloudUsername;
      }
      $.jStorage.set("blogType", config.config.blog);
    }, function(err, sta) {

    });
  }, function(err, sta) {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">No Internet Connection!</p>',
      title: ''

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  });
};



var formvalidation = function(allvalidation) {
  var isvalid2 = true;
  for (var i = 0; i < allvalidation.length; i++) {
    if (allvalidation[i].field === "" || !allvalidation[i].field) {
      allvalidation[i].validation = "ng-dirty";
      isvalid2 = false;
    } else {
      allvalidation[i].validation = "";
    }
  }
  return isvalid2;
};
