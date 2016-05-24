var vigzserver = "http://app.blazen.io$$$&&&/";
var vigzserver = "http://192.168.1.129$$$&&&/";
var adminimage = vigzserver + "upload/readFile?file=";

var foods = [];

// FOR SOUNDCLOUD
var options = {};
options.client_id = 'f4f861b2fb75e16adfe48c4140d826f5';
var soundclouduser = "mimie-rubc";
// For SoundCloud
var SC_API_URL = "";

//FOR WORDPRESS INTEGRATION
var Wordpress_UserName = "en.blog.wordpress.com";
var WORDPRESS_API_URL = 'https://public-api.wordpress.com/rest/v1.1/';
var WORDPRESS_self_API_URL = '/wp-json/wp/v2/posts';

//for tumblr
var Tumblr_UserName = "";
var TUBMLR_API_URL = 'http://wohlig.co.in/tumblr/?url=http://api.tumblr.com/v2/blog/' + Tumblr_UserName + '/posts';
var TUBMLR_API_KEY = "z1dnwToZiXGJkx1fTMtwqYkzcpf83G381TnPgH3wuft4EcEQTU";

//loginType = "ios"/"android"

angular.module('starter.services', ['httpService'])
  .factory('MyServices', function($http, $filter, httpService) {
    return {
      getAllMob: function(pageno, callback, errCallback) {
        var data = {
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "videogallery/getAllMob", data, callback, errCallback);
      },
      getOneMob: function(id, pageno, callback, errCallback) {
        var data = {
          "_id": id,
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "videogallery/getOneMob", data, callback, errCallback);
      },
      getBlogAllMob: function(pageno, callback, errCallback) {
        var data = {
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "blog/getAllMob", data, callback, errCallback);
      },
      getBlogOneMob: function(id, callback, errCallback) {
        var data = {
          "_id": id
        };
        httpService.post(vigzserver + "blog/getOneMob", data, callback, errCallback);
      },
      getPhotoAllMob: function(pageno, callback, errCallback) {
        var data = {
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "photogallery/getAllMob", data, callback, errCallback);
      },
      getPhotoOneMob: function(id, pageno, callback, errCallback) {
        var data = {
          "_id": id,
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "photogallery/getOneMob", data, callback, errCallback);
      },
      getEventAllMob: function(pageno, callback, errCallback) {
        var data = {
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "event/getAllMob", data, callback, errCallback);
      },
      getEventOneMob: function(id, callback, errCallback) {
        var data = {
          "_id": id
        };
        httpService.post(vigzserver + "event/getOneMob", data, callback, errCallback);
      },
      getNotificationMob: function(pageno, callback, errCallback) {
        var data = {
          "pagesize": 100,
          "pagenumber": pageno
        };
        httpService.post(vigzserver + "notification/getAllMob", data, callback, errCallback);
      },
      getContactAllMob: function(callback, errCallback) {
        var data = {};
        httpService.post(vigzserver + "contact/getAllMob", data, callback, errCallback);
      },
      submitEnquiry: function(enquiry, callback, errCallback) {
        var data = {
          'name': enquiry.name,
          'email': enquiry.email,
          'subject': enquiry.title,
          'comment': enquiry.content
        };
        return $http({
          url: vigzserver + "enquiry/savemob",
          method: "POST",
          data: data
        }).success(callback).error(errCallback);
      },
      getUserMob: function(callback, errCallback) {
        var data = {};
        httpService.post(vigzserver + "user/getOneMob", data, callback, errCallback);
      },
      signinMob: function(data, callback, errCallback) {
        var data2 = {
          "email": data.username,
          "password": data.password
        };
        httpService.post(vigzserver + "user/login", data2, callback, errCallback);
      },
      saveProfileMob: function(data, callback, errCallback) {
        var data2 = {
          "email": data.email,
          "name": data.username,
          "password": data.password,
          "dob": data.dob,
          "loginType": platform
        };
        // httpService.post(vigzserver + "user/savemob", data2, callback, errCallback);
        return $http({
          url: vigzserver + 'user/saveMob',
          method: "POST",
          data: data2
        }).success(callback).error(errCallback);
      },
      updateProfileMob: function(data, callback, errCallback) {
        var data2 = {
          "_id": "0",
          "email": data.email,
          "name": data.name,
          "phone": data.phone,
          "location": data.location,
          "dob": data.dob
        };
        httpService.post(vigzserver + "user/saveMob", data2, callback, errCallback);
      },
      changePasswordMob: function(data, callback, errCallback) {
        var data2 = {
          "password": data.oldpassword,
          "editpassword": data.newpassword
        };
        httpService.post(vigzserver + "user/changePasswordMob", data2, callback, errCallback);
      },
      getStaticPages: function(id, callback, errCallback){
        var data2 = {
          "_id": id
        };
        httpService.post(vigzserver + "article/getOneMob", data2, callback, errCallback);
      },
      searchAll: function(search, callback, errCallback) {
        return $http({
          url: vigzserver + 'config/searchData',
          method: "POST",
          data: {
            'search': search
          }
        }).success(callback).error(errCallback);
      },
      getNavigationMob: function(callback, errCallback) {
        httpService.post(vigzserver + "navigation/getAll", {}, callback, errCallback);
      },
      getConfigMob: function(callback, errCallback) {
        httpService.post(vigzserver + "config/getAll", {}, callback, errCallback);
      },
      homeSlider: function(callback, errCallback){
        httpService.post(vigzserver + "homeslider/getAll", {}, callback, errCallback);
      },
      getIntroslider: function(callback, errCallback){
        httpService.post(vigzserver + "introslider/getAll", {}, callback, errCallback);
      },
      setIntroJstorage:function(){
        $.jStorage.set('introslider',true);
      },
      getIntroJstorage:function(){
        return $.jStorage.get('introslider');
      },
      authenticate: function(callback, errCallback) {
        return $http({
          url: vigzserver + 'user/profile',
          method: "POST"
        }).success(callback).error(errCallback);
      },
      getallblog: function(pageno, callback, err) {
        return $http.get(adminurl + 'getAllBlog?pageno=' + pageno + '&maxrow=' + 15, {
          withCredentials: false
        }).success(callback).error(err);
      },
      logout: function(callback, err) {
        $.jStorage.deleteKey('user');
        return $http.get(vigzserver + 'user/logout', {
          withCredentials: false
        }).success(callback).error(err);
      },
      getuser: function() {
        return $.jStorage.get("user");
      },

      getWordpressPosts: function(wdp, callback) {
        var getdata = function(data, status) {
          return $http.get(data.meta.links.posts, {
            withCredentials: false
          }).success(callback);
        };
        $http.get(WORDPRESS_API_URL + "sites/" + wdp, {
          withCredentials: false
        }).success(getdata);
      },
      getWordpressSelfPosts: function(wdp, callback) {
        console.log(WORDPRESS_self_API_URL);
        console.log(wdp);
        $http.get(wdp + WORDPRESS_self_API_URL, {
          withCredentials: false
        }).success(callback);
      },
      getTumblrPosts: function(tmb, callback, errCallback) {
        httpService.get(vigzserver + 'config/urlToJson?url=http://api.tumblr.com/v2/blog/' + tmb + '/posts?api_key=' + TUBMLR_API_KEY, {}, callback, errCallback);
        // $http.get(vigzserver + 'config/urlToJson?url=http://api.tumblr.com/v2/blog/' + tmb + '/posts?api_key=z1dnwToZiXGJkx1fTMtwqYkzcpf83G381TnPgH3wuft4EcEQTU', {
        //   withCredentials: false
        // }).success(callback);
      },

      setconfigdata: function(data) {
        $.jStorage.set("configdata", data);
      },
      getconfigdata: function(data) {
        return $.jStorage.get("configdata");
      },
      setNotificationToken: function(callback) {
        $http.get(adminurl + 'setNotificationToken?os=' + $.jStorage.get("os") + "&token=" + $.jStorage.get("token"), {
          withCredentials: false
        }).success(callback);
      },
      getAllAudio: function(callback,err) {
        if (config.config) {
          if (config.config.soundCloudUsername) {
              soundclouduser = config.config.soundCloudUsername;
          }
        }

        $http({
          method: 'GET',
          url: 'http://api.soundcloud.com/users/' + soundclouduser + '/tracks',
          params: options,
          withCredentials: false
        }).then(callback).catch(err);
      },
      changeSetting: function(user, callback,errCallback) {
        user._id = "0";
        return $http({
          url: vigzserver + 'user/saveMob',
          method: "POST",
          data: user
        }).success(callback).error(errCallback);
      }
    };
  });
