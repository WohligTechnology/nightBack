var reloadpage = false;
var configreload = {};
var checkConnectivity = navigator.onLine;
var circleStyle = "display:inline-block;position:absolute;top:50%;left:50px;transform:translate(-50%,-50%);";

angular.module('starter.controllers', ['starter.services', 'ion-gallery', 'ngCordova', 'ngSanitize', 'ionic-cache-src'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices, $ionicLoading, $location, $filter, $cordovaNetwork, $state, $ionicPopup) {
  addanalytics("flexible menu");
  //	$ionicLoading.hide();
  $scope.config = MyServices.getconfigdata();
  $scope.circleStyle = "display:inline-block;position:absolute;top:50%;left:30px;transform:translate(-50%,-50%);";

  function internetaccess() {
    if (navigator) {
      checkConnectivity = navigator.onLine;
    }
  }
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    internetaccess();
    loadMenu(MyServices, $ionicPopup, $timeout);
    configreload.func();
  });
  window.addEventListener("offline", function(e) {
    internetaccess();
  });
  window.addEventListener("online", function(e) {
    internetaccess();
  });

  $scope.menudata = [];
  var loginstatus = false;

  // loader
  // $scope.showloading = functiocordovan() {
  //   $ionicLoading.show({
  //     template: '<ion-spinner class="spinner-positive"></ion-spinner>'
  //   });
  //   $timeout(function() {
  //     $ionicLoading.hide();
  //   }, 5000);
  // };
  //	$scope.showloading();
  configreload.onallpage = function() {
    var loginstatus = false;
    if ($.jStorage.get("introslider") === false || $.jStorage.get("introslider") === null) {
      $state.go("access.slider");
    } else {
      if (MyServices.getconfigdata()) {
        if (MyServices.getconfigdata().config.login) {
          if (MyServices.getconfigdata().config.login.hasLogin) {
            loginstatus = true;
            if (loginstatus && MyServices.getuser() === null) {
              $state.go("access.login");
            }
          }
        } else {
          // $state.go("access.slider");
        }
      }
    }
  };
  $timeout(function() {
    configreload.onallpage();
  }, 1000);

  $scope.toSetting = function() {
    $state.go("app.setting");
  };

  configreload.func = function() {
    var data = MyServices.getconfigdata();
    $scope.menudata = data.menu;
    _.each($scope.menudata, function(n, key) {
      if ($filter("toPages")(n, "default").split('blazen')[0] === "/app/") {
        n.topage = $filter("toPages")(n, "default").split('blazen')[1];
        // n.target = "_blank";
      } else {
        n.topage = "#" + $filter("toPages")(n, "default").split('blazen')[0];
        // n.target = "";

      }
    });
    $scope.logso = "";
    MyServices.authenticate(function(data) {
      if (data._id) {
        $scope.userdetails = data;
      }else {
        $scope.userdetails = $.jStorage.get("user");
      }
    }, function(err) {

    });
    if (data.config.login) {
      if (!data.config.login.hasLogin) {
        if (data.menu.length < 1) {
          var myPopup = $ionicPopup.show({
            template: '<p class="text-center">No Data to Show.</p>',
            title: 'Oops!',
            scope: $scope,
          });
          $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 2000);
        }
        // $scope.menu.setting = false;
      } else {
        // $scope.menu.setting = true;
        $scope.logso = "has-menu-photo";
      }
    }
  };

  $timeout(function() {
    configreload.func();
  }, 2000);

  var logoutsuccess = function(data, success) {
    if (data.value === true) {
      $.jStorage.deleteKey('user');
      reloadpage = true;
      $ionicLoading.hide();
      $state.go("access.login");
    }
  };
  $scope.logout = function() {
    if (checkConnectivity) {
      $ionicLoading.show();
      MyServices.logout(logoutsuccess, function(err) {
        // $location.url("/access/offline");
      });
    } else {
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">No internet Connectivity</p>',
        title: 'Oops!',
        scope: $scope,
      });
      $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 2000);
    }
  };

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/accessView/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  if ($.jStorage.get("user")) {
    MyServices.getConfigMob(function(conf) {

    });
    MyServices.authenticate(function(data) {
      if (data === '') {
        $.jStorage.set("user", data);
        $scope.userdetails = $.jStorage.get("user");
      } else {

      }

      if (data.value === false) {
        $scope.userdetails = $.jStorage.get("user");
      } else {
        $scope.userdetails = data.data;
        // $scope.userdetails.myimage = {
        //   'background-image': "url('" + $filter("profileimg")(data.image) + "')"
        // };
      }
    }, function(err) {
      $scope.userdetails = $.jStorage.get("user");
      // $location.url("/access/offline");
    }, function(err) {
      console.log(err);
    });

  }

  $scope.navigatePage = function(link) {
    console.log(link);
  };

})

.controller('IntroSliderCtrl', function($scope, MyServices, $stateParams, $http, $timeout, $state, $ionicPopup, $filter, $location, $ionicSlideBoxDelegate) {
  $scope.showButton = false;


  $scope.redirectPage = function() {
    MyServices.setIntroJstorage();
    if (config) {
      if (config.config) {
        if (config.config.login) {
          if (!MyServices.getuser() && config.config.login.hasLogin) {
            $state.go("access.login");
          } else {
            console.log(config.defaultMenu[0]);
            if (config.defaultMenu.length === 0) {
              $state.go("app.home");
            } else {
              $location.url($filter('toPages')(config.defaultMenu[0], 'default'));
            }
          }
        } else {
          if (config.defaultMenu.length === 0) {
            $state.go("app.home");
          } else {
            $location.url($filter('toPages')(config.defaultMenu[0], 'default'));
          }
        }
      } else {
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">Contact Owner OR No internet Connectivity</p>',
          title: 'Oops!',
          scope: $scope,
        });
        $timeout(function() {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
      }
    }
    else {
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">No internet Connectivity</p>',
        title: 'Oops!',
        scope: $scope,
      });
      $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 2000);
    }


  };

  if (MyServices.getIntroJstorage()) {
    // $scope.showButton = false;
    $timeout(function() {
      $scope.redirectPage();

    }, 1000);
  } else {
    MyServices.getIntroslider(function(data) {
      $scope.slider = data.data;
      $ionicSlideBoxDelegate.update();
    });
    // $scope.showButton = true;
  }

  $scope.slideHasChanged = function(index) {
    console.log(index);
    console.log($scope.slider.length);
    if (index === $scope.slider.length - 1) {
      $scope.showButton = true;
    } else {
      $scope.showButton = false;
    }
  };

})

.controller('AccessCtrl', function($scope) {

})

.controller('AudiogalleryCtrl', function($scope, MyServices, $stateParams, $http) {
  $scope.msg = "";
  $scope.circleStyle = circleStyle;

  if (checkConnectivity) {
    $scope.msg = "";
    MyServices.getAllAudio(function(data) {
      console.log(data);
      if (data.data.length === 0) {
        $scope.msg = "No Sound Track Found.";
      } else {
        $scope.audio = data.data;
      }

    }, function(err) {
      $scope.msg = "No Sounds.";
    });
  } else {
    $scope.msg = "No Internet Connectivity";
  }


})

.controller('AudiogallerycategoryCtrl', function($scope, MyServices, $stateParams) {

  SC.initialize({
    client_id: 'f4f861b2fb75e16adfe48c4140d826f5'
  });
  var pauser;
  $scope.item = $stateParams.item;
  var allAudio = $stateParams.items;
  console.log('each item: ', $stateParams);
  $scope.isPlaying = 0;
  console.log('isPlaying: ', $scope.isPlaying);

  $scope.streamNow = function(value, isPlaying) {
    console.log("stream now cliked");
    console.log("is playing value: ", isPlaying);
    if (isPlaying == 1) {
      console.log("value: ", value);
      $scope.isPlaying = 0;
      SC.stream('/tracks/' + value.id).then(function(player) {
        pauser.pause();
        // $.jStorage.set('pauser', pauser);
        // $.jStorage.set('id', value.id);
        console.log($scope.isPlaying);
      });
    } else {
      console.log("value: ", value);
      $scope.isPlaying = 1;
      SC.stream('/tracks/' + value.id).then(function(player) {
        player.play();
        pauser = player;
        // $.jStorage.set('pauser', pauser);
        // $.jStorage.set('id', value.id);
        console.log($scope.isPlaying);
      });
    }
  };

  $scope.streamNow($scope.item, $scope.isPlaying);

  console.log('all audio length: ', allAudio.length);
  $scope.nextPlay = function(value) {
    var index = allAudio.indexOf(value);
    if (index >= allAudio.length - 1) {
      // $scope.isPlaying = 1;
      index = 0;
      $scope.item = allAudio[index];
      SC.stream('/tracks/' + allAudio[index].id).then(function(player) {
        player.play();
        pauser = player;
        // $.jStorage.set('pauser', pauser);
        // $.jStorage.set('id', allAudio[index].id);
      });
    } else {
      // $scope.isPlaying = 1;
      ++index;
      $scope.item = allAudio[index];
      SC.stream('/tracks/' + allAudio[index].id).then(function(player) {
        player.play();
        pauser = player;
        // $.jStorage.set('pauser', pauser);
        // $.jStorage.set('id', allAudio[index].id);
      });
    }
  };

  $scope.prevPlay = function(value) {
    var index = allAudio.indexOf(value);
    if (index === 0) {
      $scope.isPlaying = 1;
      index = allAudio.length - 1;
      $scope.item = allAudio[index];
      SC.stream('/tracks/' + allAudio[index].id).then(function(player) {
        player.play();
        pauser = player;
        // $.jStorage.set('pauser', pauser);
        // $.jStorage.set('id', allAudio[index].id);
      });
    } else {
      $scope.isPlaying = 1;
      --index;
      $scope.item = allAudio[index];
      SC.stream('/tracks/' + allAudio[index].id).then(function(player) {
        player.play();
        pauser = player;
        // $.jStorage.set('pauser', pauser);
        // $.jStorage.set('id', allAudio[index].id);
      });
    }
  };

  $scope.$on('$destroy', function() {
    // console.log('exiting AudiogallerycategoryCtrl!')
    SC.stream('/tracks/' + $scope.item.id).then(function(player) {
      pauser.pause();
      // pauser = player;
      // $.jStorage.set('pauser', pauser);
      // $.jStorage.set('id', allAudio[index].id);
    });
  });
})

.controller('ArticleCtrl', function($scope, MyServices, $stateParams, $ionicPopup, $interval, $location, $window, $ionicLoading, $timeout) {
  configreload.onallpage();
  $scope.article = {};
  $scope.msg = "";

  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.refreshData = function(){
  $scope.showloading();
  MyServices.getStaticPages($stateParams.id, function(data) {
    $scope.article = data.data;
    if (data.value === false) {
      $scope.msg = "Blank Article.";
    }
    addanalytics(data.title);
    $scope.$broadcast('scroll.refreshComplete');
    $ionicLoading.hide();
  }, function(err) {
    // $location.url("/access/offline");
  });
};
$scope.refreshData();
})

.controller('LoginCtrl', function($scope, MyServices, $ionicPopup, $interval, $location, $window, $ionicLoading, $timeout, $state, $filter) {
  addanalytics("flexible login page");
  $scope.logindata = {};
  $.jStorage.deleteKey("user");

  $scope.forgotpass = function() {
    $state.go("access.forgotpassword");
  };
  $timeout(function() {
    $scope.config = MyServices.getconfigdata();
  }, 1000);
  var loginstatus = false;

  function internetaccess(toState) {
    if (navigator) {
      onoffline = navigator.onLine;
    }
  }
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    internetaccess(toState);
  });
  window.addEventListener("offline", function(e) {
    internetaccess();
  });
  window.addEventListener("online", function(e) {
    internetaccess();
  });

  // loader
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  //logins
  var checktwitter = function(data, status) {
    var repdata = {};
    if (data._id) {
      $interval.cancel(stopinterval);
      ref.close();
      MyServices.authenticate(authenticatesuccess, function(err) {
        console.log(err);
      });
    } else {

    }
  };

  var callAtIntervaltwitter = function() {
    MyServices.authenticate(checktwitter, function(err) {
      console.log(err);
    });
  };
  var authenticatesuccess = function(data, status) {
    $ionicLoading.hide();
    if (data.name) {
      $.jStorage.set("user", data);
      user = data;
      reloadpage = true;
      if (config.defaultMenu.length === 0) {
        $state.go("app.home");
      } else {
        $location.url($filter('toPages')(config.defaultMenu[0], 'default'));
      }
    }
  };
  $scope.facebooklogin = function() {
    if (checkConnectivity) {

    } else {

    }
    if (isapp) {
      ref = cordova.InAppBrowser.open(vigzserver + 'user/loginFacebook', '_blank', 'location=no');
    } else {
      ref = window.open(vigzserver + 'user/loginFacebook', '_blank', 'location=no');
    }
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate(authenticatesuccess, function(err) {
        console.log(err);
      });
      $interval.cancel(stopinterval);
    });
  };
  $scope.twitterlogin = function() {
    if (isapp) {
      ref = cordova.InAppBrowser.open(vigzserver + 'user/loginTwitter', '_blank', 'location=no');
    } else {
      ref = window.open(vigzserver + 'user/loginTwitter', '_blank', 'location=no');
    }
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate(authenticatesuccess, function(err) {
        console.log(err);
      });
      $interval.cancel(stopinterval);
    });
  };

  $scope.instagramlogin = function() {
    if (isapp) {
      ref = cordova.InAppBrowser.open(vigzserver + 'user/loginInstagram', '_blank', 'location=no');
    } else {
      ref = window.open(vigzserver + 'user/loginInstagram', '_blank', 'location=no');
    }
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate(authenticatesuccess, function(err) {
        console.log(err);
      });
      $interval.cancel(stopinterval);
    });
  };

  $scope.googlelogin = function() {
    if (isapp) {
      ref = cordova.InAppBrowser.open(vigzserver + 'user/loginGoogle', '_blank', 'location=no');
    } else {
      ref = window.open(vigzserver + 'user/loginGoogle', '_blank', 'location=no');
    }
    stopinterval = $interval(callAtIntervaltwitter, 2000);
    ref.addEventListener('exit', function(event) {
      MyServices.authenticate(authenticatesuccess, function(err) {
        console.log(err);
      });
      $interval.cancel(stopinterval);
    });
  };
  // popup
  $scope.showPopupsignupsuccess = function() {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Successfully registered!</p>',
      title: 'Congrats!',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };
  $scope.showPopupsignupfailure = function() {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">User already exist</p>',
      title: 'Oops!',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  //SIGN UP FORM
  $scope.signup = {};
  var signupsuccess = function(data, status) {
    if (data.value === true) {
      MyServices.authenticate(function(data) {
        $.jStorage.set("user", data);
        user = data;
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">Signed up successfully!</p>',
          title: 'Congrats!',
          scope: $scope,
        });
        $timeout(function() {
          myPopup.close(); //close the popup after 3 seconds for some reason
          if (config.defaultMenu.length === 0) {
            $state.go("app.home");
          } else {
            $location.url($filter('toPages')(config.defaultMenu[0], 'default'));
          }
        }, 2000);
      }, function(err) {
        console.log(err);
      });
    } else {
      $scope.showPopupsignupfailure();
    }
    $ionicLoading.hide();
    $scope.signup = {};
  };

  var msgforall = function(msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Login',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  };

  $scope.signupsubmit = function(signup) {
    if (checkConnectivity) {
      $ionicLoading.show();
      $scope.allvalidation = [{
        field: $scope.signup.username,
        validation: ""
      }, {
        field: $scope.signup.email,
        validation: ""
      }, {
        field: $scope.signup.dob,
        validation: ""
      }, {
        field: $scope.signup.password,
        validation: ""
      }];
      var check = formvalidation($scope.allvalidation);
      if (check) {
        console.log($scope.signup);
        MyServices.saveProfileMob($scope.signup, signupsuccess, function(err) {
          // $location.url("/access/offline");
          $ionicLoading.hide();
          msgforall("No Internet Connection.");
        });
      } else {
        msgforall("Fill all data");
        $ionicLoading.hide();
      }
    } else {
      msgforall("No Internet Connection.");
    }

  };

  // SIGN IN
  $scope.signin = {};
  var signinsuccess = function(data, status) {
    $ionicLoading.hide();
    if (data.value === true) {
      $timeout(function() {
        MyServices.authenticate(function(data) {
          console.log(data);
          if (data._id) {
            $.jStorage.set("user", data);
            user = data;
            if (config.defaultMenu.length === 0) {
              $state.go("app.home");
            } else {
              $location.url($filter('toPages')(config.defaultMenu[0], 'default'));
            }
            $scope.signin = {};
          }

        }, function(err) {
          console.log(err);
        });
      }, 100);

    } else {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Wrong username or password!'
      });
    }
  };
  $scope.signinsubmit = function(signin) {
    if (checkConnectivity) {
      $ionicLoading.show();
      $scope.allvalidation = [{
        field: $scope.signin.username,
        validation: ""
      }, {
        field: $scope.signin.password,
        validation: ""
      }];
      var check = formvalidation($scope.allvalidation);
      if (check) {
        MyServices.signinMob(signin, signinsuccess, function(err) {
          // $location.url("/access/offline");
          $ionicLoading.hide();
          msgforall("No Internet Connection.");
        });
      } else {
        msgforall("Fill all data");
        $ionicLoading.hide();
      }
    } else {
      msgforall("No Internet Connection.");
    }


  };

  //        ***** tabchange ****

  $scope.tab = 'signin';
  $scope.classa = 'active';
  $scope.classb = '';

  $scope.tabchange = function(tab, a) {

    $scope.tab = tab;
    if (a == 1) {
      $scope.classa = "active";
      $scope.classb = '';

    } else {
      $scope.classa = '';
      $scope.classb = "active";

    }
  };

  //    ****** End ******

})

.controller('ResetPasswordCtrl', function($scope) {
  addanalytics("Reset password");
  // loader
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.showPopup2 = function() {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Your password is updated!</p>',
      title: 'Password updated!',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.showPopup3 = function() {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Your passwords do not match!</p>',
      title: 'Sorry!',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.showPopup4 = function() {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Something went wrong!</p>',
      title: 'Oops! Try again.',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.password = {};
  var changepasswordcallback = function(data, status) {
    if (data == 1) {
      $scope.showPopup2();
      $ionicLoading.hide();
      $scope.password = {};
    } else if (data === 0) {
      $ionicLoading.hide();
      $scope.showPopup4();
    } else if (data == -1) {
      $ionicLoading.hide();
      $scope.showPopup3();
    }
  };

  $scope.changepassword = function(password) {
    $ionicLoading.show();

    $ionicLoading.show();
    $scope.allvalidation = [{
      field: $scope.password.oldpassword,
      validation: ""
    }, {
      field: $scope.password.newpassword,
      validation: ""
    }, {
      field: $scope.password.confirmpassword,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.changepassword(password, changepasswordcallback, function(err) {
        // $location.url("/access/offline");
      });
    } else {
      msgforall("Fill all data");
      $ionicLoading.hide();
    }

  };

})

.controller('ForgotPasswordCtrl', function($scope, $ionicLoading, $timeout, MyServices, $location, $ionicPopup, $state) {
  addanalytics("Forgot password");
  // loader
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  var forgotpasswordcallback = function(data, status) {
    console.log(data);
    $ionicLoading.hide();
    if (data == "true") {
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">Please check your email, an email has been send to your id.</p>',
        title: 'Email sent!',
        scope: $scope,

      });
      $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
        $state.go("access.login");
      }, 2000);

    } else {
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">Not a valid email.</p>',
        title: 'Oops! Try again.',
        scope: $scope,

      });
      $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 2000);
    }
  };
  $scope.forgotpassword = function(email) {
    $ionicLoading.show();
    MyServices.forgotpassword(email, forgotpasswordcallback, function(err) {
      // $location.url("/access/offline");
    });
  };
})

.controller('SignupCtrl', function($scope) {

})

.controller('HomeCtrl', function($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $ionicPopup) {
  addanalytics("Home page");
  configreload.onallpage();
  var showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 3000);
  };
  // showloading();

  var loginstatus = false;
  var menu = {};
  menu.setting = false;
  $scope.refreshData = function(){
    loadMenu(MyServices, $ionicPopup, $timeout);
    configreload.func();
  config = MyServices.getconfigdata();

  MyServices.homeSlider(function(data) {
    $scope.slides = data.data;
    $ionicSlideBoxDelegate.update();
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
  }, function(err) {});
  configreload.onallpage();
};
$scope.refreshData();
})

.controller('AboutCtrl', function($scope) {

})

.controller('TeamCtrl', function($scope) {

})

.controller('OfflineCtrl', function($scope, $ionicLoading) {
  addanalytics("Offline page");
  $ionicLoading.hide();
})

.controller('ProfileCtrl', function($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout, $cordovaFileTransfer, $cordovaImagePicker, $filter) {

  configreload.onallpage();
  $scope.edit = false;
  $scope.user = {};
  $scope.user.newimage = "";
  $scope.password = {};
  //	$scope.user.dob = moment().format("YYYY-MM-DD");

  $scope.changeedit = function(val) {

    if ($.jStorage.get("user") && $.jStorage.get("user").dob)
      $scope.user.dob = new Date($.jStorage.get("user").dob);
    if (!_.isDate($scope.user.dob)) {
      $scope.user.dob = moment($scope.user.dob, "YYYY-MM-DD");
    }
    if (!_.isDate($scope.user.dob)) {
      $scope.user.dob = moment($scope.user.dob);
    }

    $scope.edit = val;
  };

  var showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  showloading();
  MyServices.getUserMob(function(data) {
    $ionicLoading.hide();
    if (data.value === false) {
      $scope.user = false;
    } else {
      $scope.user = data.data;
    }
    addanalytics(data.name);
    $scope.user.newcoverimage = {
      'background-image': "url('" + $filter("serverpath")($scope.user.bannerPic) + "')"
    };
    $scope.user.newimage = {
      'background-image': "url('" + $filter("serverpath")($scope.user.profilePic, '', '', '', 'profile') + "')"
    };

  }, function(err) {
    // $location.url("/access/offline");
  });
  $scope.showPopup1 = function() {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Your profile is updated!</p>',
      title: 'Thank you!',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.showMsg = function(msg, title) {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: title,
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.saveProfile = function() {
    console.log($scope.user);
    if ($scope.user === false) {
      $scope.showMsg("Session Expired.", "Profile");
    } else {
      if (checkConnectivity) {
        MyServices.updateProfileMob($scope.user, function(data, status) {
          if (data !== 0) {
            $.jStorage.set("user", data);
            $scope.showPopup1();
            $scope.edit = !$scope.edit;
          }
        }, function(err) {
          // $location.url("/access/offline");
        });
      } else {
        $scope.passwordpopup("No Internet Connection", 'Profile');
      }
    }

  };

  $scope.passwordpopup = function(msg, title) {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: title,
      scope: $scope
    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  $scope.changePassword = function() {
    if ($scope.user === false) {
      $scope.showMsg("Session Expired.", "Profile");
    } else {
      $scope.password.id = MyServices.getuser().id;


      $scope.allvalidation = [{
        field: $scope.password.oldpassword,
        validation: ""
      }, {
        field: $scope.password.newpassword,
        validation: ""
      }, {
        field: $scope.password.confirmpassword,
        validation: ""
      }];
      var check = formvalidation($scope.allvalidation);
      if (check) {
        if ($scope.password.newpassword === $scope.password.confirmpassword) {
          MyServices.changePasswordMob($scope.password, function(data) {
            if (data.value === true) {
              $scope.passwordpopup("Password changed successfully", 'Forgot Password!');
            } else {
              $scope.passwordpopup("Old password does not match", 'Forgot Password!');
            }
            console.log(data);
          }, function(err) {
            // $location.url("/access/offline");
          });
        } else {
          $scope.passwordpopup("Both the passwords does not match", 'Forgot Password!');
        }
      } else {
        $ionicLoading.hide();
        $scope.passwordpopup("Please enter all the fields.", 'Forgot Password!');
      }
    }
  };

  //	pick image from gallery
  var options = {
    maximumImagesCount: 1,
    width: 800,
    height: 800,
    quality: 80,
    allowEdit: true

  };
  $scope.picFromGallery = function() {
    if (navigator.onLine) {
      $cordovaImagePicker.getPictures(options).then(function(resultImage) {

        var options = {};
        var params = {};
        params.image = true;
        options.params = params;
        $cordovaFileTransfer.upload(vigzserver + "upload/fromApp", resultImage[0], options)
          .then(function(result) {
            console.log(result.response);
            var data = JSON.parse(result.response);
            if (data.value === true) {
              $scope.user.newimage = {
                'background-image': "url('" + resultImage[0] + "')"
              };
            } else {
              $scope.showMsg("Your Session is Expired OR Invalid Image Formate. Please Login.");

            }
            $ionicLoading.hide();
          }, function(err) {
            console.log(err);
          }, function(progress) {
            console.log(progress);
          });

      }, function(err) {
        // An error occured. Show a message to the user
      });
    } else {
      $scope.showMsg("Interner Connection Required To Edit Profile Image. ");
    }

  };

  $scope.picImageForCover = function() {
    console.log("in profile cover pic");

    if (navigator.onLine) {
      $cordovaImagePicker.getPictures(options).then(function(resultImage) {
        var options = {};
        var params = {};
        params.image = false;

        options.params = params;
        $cordovaFileTransfer.upload(vigzserver + "upload/fromApp", resultImage[0], options)
          .then(function(result) {
            console.log(result.response);
            var data = JSON.parse(result.response);
            if (data.value === true) {
              $scope.user.newcoverimage = {
                'background-image': "url('" + resultImage[0] + "')"
              };
            } else {
              $scope.showMsg("Your Session is Expired OR Invalid Image Formate. Please Login.");

            }
            $ionicLoading.hide();
          }, function(err) {
            console.log(err);
          }, function(progress) {
            console.log(progress);
          });

      }, function(err) {
        // An error occured. Show a message to the user
      });
    } else {
      $scope.showMsg("Interner Connection Required To Edit Profile Image. ");
    }

  };
})

.controller('EventsCtrl', function($scope, MyServices, $location, $ionicLoading, $filter, $state) {
  addanalytics("Event page");
  configreload.onallpage();
  $ionicLoading.show();
  $scope.pageno = 1;
  $scope.events = [];
  $scope.keepscrolling = true;
  $scope.msg = "Loading....";
  $scope.circleStyle = circleStyle;
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.share = function(item) {
    var data = {};
    data.startdate = $filter('date')(item.startdate, 'dd MMM, yyyy');
    data.starttime = $filter('convertto12')(item.starttime);
    data.image = $filter('serverimage')(item.image);
    window.plugins.socialsharing.share('Checkout "' + item.title + '" starting on ' + data.startdate + ', ' + data.starttime, null, data.image + 'At ' + item.venue);
  };

  $scope.loadevents = function(pageno) {
    MyServices.getEventAllMob(pageno, function(data) {
      if (pageno === 1) {
        $scope.events = [];
      }
      $ionicLoading.hide();
      _.each(data.data.data, function(n) {
        $scope.events.push(n);
      });

      if ($scope.events.length === 0) {
        $scope.msg = "No data found.";
      } else {
        $scope.msg = "";
      }

      if (data.data.data.length === 0) {
        $scope.keepscrolling = false;
      }
    }, function(err) {
      $scope.keepscrolling = false;
      if ($scope.events.length === 0) {
        $scope.msg = "No data found.";
      }
      $ionicLoading.hide();
      // $location.url("/access/offline");
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.refreshData = function() {
    $scope.events = [];
    $scope.pageno = 1;
    $scope.loadevents(1);
  };

  $scope.refreshData();

  $scope.loadMorePolls = function() {
    $scope.loadevents(++$scope.pageno);
  };

  $scope.geteventdetails = function(id) {
    $state.go("app.eventdetail", {
      id: id
    });
  };

})

.controller('EventDetailCtrl', function($scope, $stateParams, MyServices, $ionicLoading, $ionicSlideBoxDelegate, $ionicModal, $filter) {
  configreload.onallpage();
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.msg = "Loading...";
  $scope.video = {};
  $scope.image = {};


  var init = function() {
    return $ionicModal.fromTemplateUrl('templates/appView/modal-video.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;

    });
  };

  $ionicModal.fromTemplateUrl('templates/appView/modal-image.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;

  });

  $scope.showVideo = function(url) {
    init().then(function() {
      $scope.modal.show();
    });
    $scope.video = [];
    $scope.video.url = $filter("extractVideoId")(url) + "?autoplay=1";
  };
  $scope.showImage = function(url) {
    $scope.modal.show();
    $scope.image.img = url;
  };

  $scope.closeVideo = function() {
    $scope.modal.remove()
      .then(function() {
        $scope.modal = null;
      });
  };
  $scope.closeImage = function() {
    $scope.modal.hide();
  };

  $scope.id = $stateParams.id;
  var getsingleeventscallback = function(data, status) {
    if (data.data === "") {
      $scope.msg = "No data found";
      addanalytics("Event detail page");
    } else {
      $scope.msg = "";
      addanalytics(data.title);
    }
    if (data.data.images && data.data.images.length > 0) {
      data.data.eventimages = _.chunk(data.data.images, 2);
    }
    if (data.data.videos && data.data.videos.length > 0) {
      data.data.eventvideos = _.chunk(data.data.videos, 2);
    }
    $scope.eventdetail = data.data;
    $ionicSlideBoxDelegate.update();
    $scope.$broadcast('scroll.refreshComplete');

  };
  $scope.refreshData = function(){
  MyServices.getEventOneMob($stateParams.id, getsingleeventscallback, function(err) {
    $scope.$broadcast('scroll.refreshComplete');
  });
};
$scope.refreshData();
})

.controller('BlogsCtrl', function($scope, MyServices, $location, $ionicLoading, $state) {
  configreload.onallpage();
  $scope.blogs = [];
  $ionicLoading.show();
  $scope.pageno = 1;
  $scope.keepscrolling = true;
  $scope.circleStyle = "display:inline-block;position:absolute;top:50%;left:30px;transform:translate(-50%,-50%);";
  $scope.msg = "Loading...";
  // loader

  $scope.getblogdetailscms = function(id) {
    $state.go("app.blogdetail", {
      id: id
    });
  };
  showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.blogDetail = function(blog, name) {
    $ionicLoading.show();
    blog.provider = name;
    $.jStorage.set('postdetail', blog);
    if (name == "cms") {
      $state.go("app.blogdetail", {
        id: blog._id
      });
    } else {
      $state.go("app.blogdetail", {
        id: 0
      });
    }
  };

  $scope.reloadblog = function(page) {
    MyServices.getBlogAllMob(page, function(data, status) {
      //			console.log(data);
      $ionicLoading.hide();
      _.each(data.data.data, function(n) {
        $scope.blogs.push(n);
      });

      if (data.data.data.length === 0) {
        $scope.keepscrolling = false;
      }
      if ($scope.blogs.length !== 0) {
        $scope.msg = "";
      } else {
        $scope.msg = "No data found";
      }
    }, function(err) {
      $scope.keepscrolling = false;
      if ($scope.blogs.length !== 0) {
        $scope.msg = "No data found";
      }
      $ionicLoading.hide();
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };

$scope.reloadGetAll = function(){
  if ($.jStorage.get("blogType") && $.jStorage.get("blogType").blogType == "Wordpress") {
    console.log("wordpress blog");
    addanalytics("Wordpress blog");
    $scope.showWordpress = true;
    $scope.keepscrolling = false;
    Wordpress_UserName = $.jStorage.get("blogType").wordpressUsername;
    MyServices.getWordpressPosts($.jStorage.get("blogType").wordpressUsername, function(data, status) {
      $ionicLoading.hide();
      $scope.blogs = data.posts;
      $scope.msg = "";
    });
  } else if ($.jStorage.get("blogType") && $.jStorage.get("blogType").blogType == "Tumblr") {
    addanalytics("Tumblr Blog");
    $scope.showTumblr = true;
    $scope.keepscrolling = false;
    Tumblr_UserName = $.jStorage.get("blogType").tumblrUsername;
    MyServices.getTumblrPosts($.jStorage.get("blogType").tumblrUsername, function(data, status) {

      $ionicLoading.hide();
      if (data) {
        $scope.msg = "";
        $scope.blogs = data.data.response.posts;
        console.log($scope.blogs);
      } else {
        $scope.msg = "No blog data or Invalid blog";
      }
    }, function(data) {
      // console.log(data);
    });
  } else if ($.jStorage.get("blogType") && $.jStorage.get("blogType").blogType == "CMS") {
    addanalytics("Custom blog");
    $scope.showCustomblog = true;
    $scope.reloadblog(1);
  } else if ($.jStorage.get("blogType") && $.jStorage.get("blogType").blogType == "SelfHosted") {
    addanalytics("Wordpress self blog");
    $scope.showWordpressSelf = true;
    $scope.keepscrolling = false;
    Wordpress_UserName = $.jStorage.get("blogType").selfHostedUsername;
    MyServices.getWordpressSelfPosts($.jStorage.get("blogType").selfHostedUsername, function(data, status) {
      $ionicLoading.hide();
      $scope.msg = "";
      console.log(data);
      $scope.blogs = data;
      _.each($scope.blogs, function(n) {
        n.content = n.content.rendered;
      });
    });
  }
};

$scope.reloadGetAll();

  $scope.refreshData = function(){
    $scope.blogs = [];
    $scope.reloadGetAll();
  };

  $scope.loadMorePolls = function() {
    $scope.reloadblog(++$scope.pageno);
  };

})

.controller('BlogDetailCtrl', function($scope, MyServices, $ionicLoading, $stateParams, $timeout) {

  configreload.onallpage();
  $ionicLoading.hide();
  $scope.msg = "Loading....";
  var getsingleblogsuccess = function(data, status) {
    console.log(data);
    $ionicLoading.hide();
    $scope.showcmsdetail = true;
    $scope.details = data.data;
    addanalytics(data.data.blogtitle);
    if (data === '') {
      $scope.msg = "No such blog";
    } else {
      $scope.msg = "";
    }
  };

  $scope.id = $stateParams.id;

  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.showloading();

  // tumblr and wordpress
  if ($stateParams.id === "0") {
    console.log("in blog detail if");
    $scope.msg = "";
    $ionicLoading.hide();
    $scope.details = $.jStorage.get('postdetail');
    addanalytics("tumblr wordpress blog" + $scope.details.album);
    if ($scope.details.provider == 'tumblr') {
      var newdt = $scope.details.date.split('T');
      $scope.details.date = newdt[0];
    }
  } else {
    MyServices.getBlogOneMob($scope.id, getsingleblogsuccess, function(err) {
      // $location.url("/access/offline");
    });
  }
})

.controller('PhotoGalleryCategoryCtrl', function($scope, MyServices, $location, $ionicLoading, $state) {
  addanalytics("Photo gallery");
  configreload.onallpage();
  $ionicLoading.show();
  $scope.msg = "Loading....";
  $scope.pageno = 1;
  $scope.photos = [];
  $scope.keepscrolling = true;
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.sendphotoid = function(id) {
    $state.go("app.photogallery", {
      id: id
    });
  };

  // $scope.getItemHeight = function(item){
  //   return angular.element(item).offsetHeight;
  // };

  $scope.loadgallery = function(pageno) {
    MyServices.getPhotoAllMob(pageno, function(data, status) {
      $ionicLoading.hide();
      if (pageno === 1) {
        $scope.photos = [];
      }
      _.each(data.data.data, function(n) {
        $scope.photos.push(n);
      });

      if (data.data.data.length === 0) {
        $scope.keepscrolling = false;
      }

      if ($scope.photos.length === 0) {
        $scope.msg = "The gallery is empty.";
      } else {
        $scope.msg = "";
      }
    }, function(err) {
      $scope.keepscrolling = false;
      if ($scope.photos.length === 0) {
        $scope.msg = "The gallery is empty.";
      }
      $ionicLoading.hide();
    });

    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };


  $scope.refreshData = function() {
    $scope.photos = [];
    $scope.pageno = 1;
    $scope.loadgallery(1);
  };

  $scope.refreshData();


  $scope.loadMorePolls = function() {
    $scope.loadgallery(++$scope.pageno);
  };

})

.controller('PhotoGalleryCtrl', function($scope, MyServices, $stateParams, $ionicLoading, $timeout, $location, $filter) {
  addanalytics("Photo gallery Details");
  configreload.onallpage();
  $ionicLoading.show();
  $scope.msg = "Loading....";
  $scope.keepscrolling = true;
  $scope.photos = [];
  $scope.pageno = 1;
  // loader

  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.showloading();

  $scope.photoid = $stateParams.id;

  $scope.loadphoto = function(pageno) {
    MyServices.getPhotoOneMob($stateParams.id, pageno, function(data, status) {
      $ionicLoading.hide();
      if (pageno === 1) {
        $scope.photos = [];
      }
      _.each(data.data.data, function(n) {
        $scope.photoObj = {};
        $scope.photoObj.src = $filter("serverpath")(n.image, 1200, 1200, "fill");
        $scope.photos.push($scope.photoObj);
      });
      if (data.data.data.length === 0) {
        $scope.keepscrolling = false;
      }

      if ($scope.photos.length === 0) {
        $scope.msg = "The gallery is empty.";
      } else {
        $scope.msg = "";
      }
    }, function(err) {
      $scope.keepscrolling = false;
      if ($scope.photos.length === 0) {
        $scope.msg = "The gallery is empty.";
      }
      $ionicLoading.hide();
      // $location.url("/access/offline");
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.refreshData = function() {
    $scope.photos = [];
    $scope.pageno = 1;
    $scope.loadphoto(1);
  };

  $scope.refreshData();

  $scope.loadMorePolls = function() {
    $scope.loadphoto(++$scope.pageno);
  };

})

.controller('VideoGalleryCategoryCtrl', function($scope, MyServices, $ionicLoading) {
  addanalytics("Video Gallery Page");
  configreload.onallpage();
  $ionicLoading.show();
  $scope.videos = [];
  $scope.keepscrolling = true;
  $scope.pageno = 1;
  $scope.msg = "Loading....";
  $scope.circleStyle = circleStyle;
  // loader
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.loadphoto = function(pageno) {
    MyServices.getAllMob(pageno, function(data, status) {
      $ionicLoading.hide();
      console.log("ininininininini");
console.log(data.data);
      _.each(data.data.data, function(n) {
        $scope.videos.push(n);
      });

      if (data.data.data.length === 0) {
        $scope.keepscrolling = false;
      }

      if ($scope.videos.length === 0) {
        $scope.msg = "The gallery is empty.";
      } else {
        $scope.msg = "";
      }

    }, function(err) {
      $scope.keepscrolling = false;
      if ($scope.videos.length === 0) {
        $scope.msg = "The gallery is empty.";
      }
      $ionicLoading.hide();
    });

    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.loadphoto(1);

  $scope.loadMorePolls = function() {
    $scope.loadphoto(++$scope.pageno);
  };
  $scope.refreshData = function(){
    $scope.videos = [];
    $scope.pageno = 1;
    $scope.loadphoto(1);
  };
})

.controller('VideoGalleryCtrl', function($scope, MyServices, $location, $ionicModal, $stateParams, $ionicLoading, $ionicPopup, $timeout, $ionicPlatform, $filter) {
  addanalytics("Video gallery detail page");
  configreload.onallpage();
  $ionicLoading.show();
  $scope.pageno = 1;
  $scope.videos = [];
  $scope.keepscrolling = true;
  $scope.msg = "Loading....";
  $scope.circleStyle = circleStyle;

  $scope.share = function(item) {
    console.log(item);
    window.plugins.socialsharing.share(item.alt, null, 'http://img.youtube.com/vi/' + item.url + '/default.jpg', 'https://www.youtube.com/watch?v=' + item.url);
  };

  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.showloading();
  $scope.videoid = $stateParams.id;

  $scope.loadphoto = function(pageno) {
    MyServices.getOneMob($scope.videoid, pageno, function(data, status) {
      $ionicLoading.hide();
      _.each(data.data.data, function(n) {
        $scope.videos.push(n);
      });


      if (data.data.data.length === 0) {
        console.log("in oth length");
        $scope.keepscrolling = false;
      }

      if ($scope.videos.length === 0) {
        $scope.msg = "The gallery is empty.";
      } else {
        $scope.msg = "";
      }
    }, function(err) {
      $scope.keepscrolling = false;
      if ($scope.videos.length === 0) {
        $scope.msg = "The gallery is empty.";
      }
      $ionicLoading.hide();
      // $location.url("/access/offline");
    });

    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };


  $scope.loadphoto(1);

  $scope.loadMorePolls = function () {
  	$scope.loadphoto(++$scope.pageno);
  };

  $scope.refreshData = function(){
    $scope.videos = [];
    $scope.pageno = 1;
    $scope.loadphoto(1);
  };


  var init = function() {
    return $ionicModal.fromTemplateUrl('templates/appView/modal-video.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;

    });
  };


  $scope.showVideo = function(url) {
    init().then(function() {
      $scope.modal.show();
    });
    $scope.video = [];
    $scope.video.url = $filter("extractVideoId")(url) + "?autoplay=1";
  };

  $scope.closeVideo = function() {
    $scope.modal.remove()
      .then(function() {
        $scope.modal = null;
      });
  };

  document.addEventListener('backbutton', function(event) {
    console.log("on back button");
    event.preventDefault(); // EDIT
    $scope.closeVideo();
    //		navigator.app.exitApp(); // exit the app
  });


  $ionicPlatform.onHardwareBackButton(function() {
    console.log("hardwarebutton");
    //		alert("back back");
    $scope.closeVideo();
    //		console.log("Back Button");
  });

  $scope.$on('modal.remove', function() {
    // Execute action
    console.log("on removed");
    $scope.currentURL = {};
  });

})

.controller('AccountCtrl', function($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout) {
  addanalytics("Account page");
  console.log("fasdfasd&&&&&&&&&&&&&&&");
  configreload.onallpage();
  if ($.jStorage.get("user")) {
    $scope.userdetails = {};
    $scope.userdetails.username = $.jStorage.get("user").name;
    if ($scope.userdetails.username === "") {
      $scope.userdetails.username = $.jStorage.get("user").name;
    }
    $scope.userdetails.userimage = $.jStorage.get("user").image;
    $scope.userdetails.useremail = $.jStorage.get("user").email;
  }

  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.profile = {};
  $scope.showPopup1 = function() {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Your profile is created!</p>',
      title: 'Thank you!',
      scope: $scope,
    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

  var profilesubmitcallback = function(data, status) {
    $ionicLoading.hide();
    if (data == 1) {
      $scope.showPopup1();
      $scope.profile = {};
    }
  };

  $scope.profilesubmit = function(profile) {
    $ionicLoading.show();
    MyServices.profilesubmit(profile, profilesubmitcallback, function(err) {
      // $location.url("/access/offline");
    });
  };
})

.controller('SettingCtrl', function($scope, MyServices, $ionicLoading, $timeout, $location) {
  addanalytics("Setting page");
  configreload.onallpage();

  $scope.setting = {};
  $scope.config = config;
  $scope.user = {};

  MyServices.getUserMob(function(data) {
    $ionicLoading.hide();
    if (data.value === true) {
      $scope.user = data.data;
    }

  }, function(err) {
    // $location.url("/access/offline");
  });

  // MyServices.getUserMob(function(data) {
  // if (config.config.notification) {
  //   $scope.setting.videonotification = config.config.notification.videonotification;
  //   $scope.setting.eventnotification = config.config.notification.eventnotification;
  //   $scope.setting.blognotification = config.config.notification.blognotification;
  //   $scope.setting.photonotification = config.config.notification.photonotification;
  // }
  // }, function(err) {
  //   // $location.url("/access/offline");
  // });

  $scope.changeSetting = function(setting) {
    console.log($scope.user);
    if ($scope.user._id !== "0") {
      MyServices.changeSetting($scope.user, function(data) {
        console.log(data);
      }, function(err) {
        // $location.url("/access/offline");
      });
    }

  };

})

.controller('SocialCtrl', function($scope, MyServices, $timeout, $ionicPopup) {
  addanalytics("Social page");
  configreload.onallpage();
  $scope.tab = 'fb';
  $scope.social = [];
  $scope.showsocial = {};
  $scope.refreshData = function(){
    loadMenu(MyServices, $ionicPopup, $timeout);
    configreload.func();
  $timeout(function() {
    $scope.config = config.config;
    $scope.social = [];
    _.each($scope.config.socialfeeds, function(n, key) {
      if (n !== "") {
        $scope.social.push({
          "name": key,
          "value": n
        });
      }
    });
    $scope.social = _.chunk($scope.social, 2);
    $scope.$broadcast('scroll.refreshComplete');

  }, 1000);
};


  $scope.goSocial = function(link) {
    if (typeof cordova != 'undefined') {
      cordova.InAppBrowser.open(link, '_blank', 'location=yes');
    } else {
      window.open(link, "_blank");
    }
  };
$scope.refreshData();


})

.controller('NotificationCtrl', function($scope, MyServices, $ionicLoading, $filter, $location) {
  addanalytics("Notification page");
  configreload.onallpage();
  $scope.notification = {};
  $scope.notify = [];
  $scope.pageno = 1;
  $scope.user = MyServices.getuser();
  $scope.msg = "Loading...";

  $scope.share = function(item) {
    console.log(item);
    item.image = $filter('serverimage')(item.image);
    if (item.linktype == 17) {
      item.link = item.link;
    } else {
      item.link = null;
    }
    window.plugins.socialsharing.share(item.content, null, item.image, item.link);
  };

  //	console.log(
  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.loadnotification = function(pageno) {
    console.log($scope.notification);
    MyServices.getNotificationMob(pageno, function(data) {
      $scope.notify = data.data.data;
      if ($scope.notify.length === 0) {
        $scope.msg = "No notifications.";
      } else {
        $scope.msg = "";
      }

      $ionicLoading.hide();
    }, function(err) {
      $scope.keepscrolling = false;
      if ($scope.notify.length === 0) {
        $scope.msg = "The gallery is empty.";
      }
      $ionicLoading.hide();
      // $location.url("/access/offline");
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.loadnotification(1);

  $scope.loadMoreNotification = function() {
    $scope.loadnotification(++$scope.pageno);
  };

  $scope.refreshData = function(){
    $scope.pageno = 1;
    $scope.notify = [];
    $scope.loadnotification(1);
  };

})

.controller('EnquiryCtrl', function($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout, $compile, $ionicModal) {

  $scope.enquiry = {};
  $scope.msg = "";
  $scope.enquiry = {};
  var msgforall = function(msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Contact Us',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  };
  var createenquirycallback = function(data, status) {
    $ionicLoading.hide();
    if (data.value === true) {
      msgforall("Successfully submitted!");
      $scope.enquiry = {};
    } else {
      msgforall("Try again!");
    }
  };

  $scope.enquiryform = function(enquiry) {
    if (checkConnectivity) {
      $scope.allvalidation = [{
        field: $scope.enquiry.name,
        validation: ""
      }, {
        field: $scope.enquiry.email,
        validation: ""
      }, {
        field: $scope.enquiry.title,
        validation: ""
      }, {
        field: $scope.enquiry.content,
        validation: ""
      }];
      var check = formvalidation($scope.allvalidation);
      if (check) {
        MyServices.submitEnquiry(enquiry, createenquirycallback, function(err) {
          // $location.url("/access/offline");

        });
      } else {
        msgforall('Fill all data');
        $ionicLoading.hide();
      }
    } else {
      msgforall("No Internet Connectivity");
    }


  };


})

.controller('ContactCtrl', function($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout, $compile, $ionicModal) {
  addanalytics("Contact page");
  configreload.onallpage();
  $scope.msg = "";
  $scope.enquiry = {};
  var msgforall = function(msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Contact Us',
      scope: $scope,

    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  };

  $scope.tab = 'contactus';
  $scope.classa = 'active';
  $scope.classb = '';

  $ionicModal.fromTemplateUrl('templates/appView/modal-map.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.showMap = function(lat, long) {
    if (isapp) {
      ref = cordova.InAppBrowser.open('https://www.google.co.in/maps/@' + lat + ',' + long + ',11z?hl=en', '_blank', 'location=no');
    } else {
      ref = window.open('https://www.google.co.in/maps/@' + lat + ',' + long + ',11z?hl=en', '_blank', 'location=no');
    }
  };

  $scope.closeMap = function() {
    $scope.modal.hide();
  };

  MyServices.getContactAllMob(function(data, status) {
    console.log();
    $scope.contacts = data.data;
    if ($scope.contacts === "") {
      $scope.msg = "No Information.";
    }else {
      $scope.msg = "";
    }
  }, function(err) {
    $scope.msg = "No Information.";
    // $location.url("/access/offline");
  });

  $scope.tabchange = function(tab, a) {

    $scope.tab = tab;
    if (a == 1) {
      $scope.classa = "active";
      $scope.classb = '';

    } else {
      $scope.classa = '';
      $scope.classb = "active";

    }
  };

  //    ****** End ******


  $scope.response = null;
  $scope.widgetId = null;

  // $scope.model = {
  //   key: '6LfUix0TAAAAAJoY6U1m13_4reMUI2g4x2cVLUEu'
  // };
  //
  // $scope.setResponse = function(response) {
  //   console.info('Response available');
  //
  //   $scope.response = response;
  // };
  //
  // $scope.setWidgetId = function(widgetId) {
  //   console.info('Created widget ID: %s', widgetId);
  //
  //   $scope.widgetId = widgetId;
  // };
  //
  // $scope.cbExpiration = function() {
  //   console.info('Captcha expired. Resetting response object');
  //
  //   vcRecaptchaService.reload($scope.widgetId);
  //
  //   $scope.response = null;
  // };

  $scope.submit = function() {
    var valid;

    /**
     * SERVER SIDE VALIDATION
     *
     * You need to implement your server side validation here.
     * Send the reCaptcha response to the server and use some of the server side APIs to validate it
     * See https://developers.google.com/recaptcha/docs/verify
     */
    console.log('sending the captcha response to the server', $scope.response);

    if (valid) {
      console.log('Success');
    } else {
      console.log('Failed validation');

      // In case of a failed validation you need to reload the captcha
      // because each response can be checked just once
      // vcRecaptchaService.reload($scope.widgetId);
    }
  };

})

.controller('SearchCtrl', function($scope, MyServices, $location, $ionicLoading, $ionicPopup, $timeout, $state) {
  addanalytics("Search page");
  // loader
  $scope.search = {};
  $scope.search.text = "";
  configreload.onallpage();

  $scope.showloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.searchresults = [];

  var searchelementcallback = function(data, status) {
    console.log(data);
    $scope.searchresults.searchevent = data.data.event;
    $scope.searchresults.searchgallery = data.data.photo;
    $scope.searchresults.searchvideogallery = data.data.video;
    $scope.searchresults.blog = data.data.blog;
    $scope.searchresults.article = data.data.article;
    $scope.searchresults.notification = data.data.notification;
    $scope.searchresults.contacts = data.data.contact;
    if (data.data.home !== '') {
      $scope.searchresults.home = [{
        "name": "Home"
      }];
    }
  };
  $scope.getsearchelement = function(searchelement) {
    $timeout(function() {
      MyServices.searchAll(searchelement, searchelementcallback, function(err) {
        // $location.url("/access/offline");
      });
    }, 2000);

  };

  // Go to Events page
  $scope.openevents = function(id) {
    $state.go("app.eventdetail", {
      id: id
    });
  };
  $scope.openvideogallery = function(id) {
    $state.go("app.videogallery", {
      id: id
    });
  };
  $scope.opengallery = function(id) {
    $state.go("app.photogallery", {
      id: id
    });
  };
  $scope.openblog = function(id) {
    $state.go("app.blogdetail", {
      id: id
    });
  };
  $scope.openarticle = function(id) {
    $state.go("app.article", {
      id: id
    })
  };
  $scope.clear = function() {
    $scope.search.text = "";
    $scope.searchresults = [];
  };

});
