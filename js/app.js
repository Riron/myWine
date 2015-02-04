angular.module('myWine', ['ionic', 'ngStorage', 'ngCordova', 'angularCharts', 'firebase', 'ui.bootstrap', 'angulartics', 'angulartics.google-analytics-plugin'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, googleAnalyticsPluginProvider) {
  googleAnalyticsPluginProvider.debug = true;
  googleAnalyticsPluginProvider.trackingId = 'UA-58168431-1';

  $stateProvider

    .state('intro', {
      url: "/intro",
      templateUrl: "templates/intro.html",
      controller: 'IntroCtrl'
    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'MenuCtrl'
    })

    .state('app.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html"
        }
      }
    })

    .state('app.star', {
      url: "/star",
      views: {
        'menuContent' :{
          templateUrl: "templates/star.html",
          controller: 'StarCtrl as vm'
        }
      }
    })

    .state('app.stats', {
      url: "/stats",
      views: {
        'menuContent' :{
          templateUrl: "templates/stats.html",
          controller: 'StatsCtrl as vm'
        }
      }
    })
    .state('app.history', {
      url: "/history",
      views: {
        'menuContent' :{
          templateUrl: "templates/history.html",
          controller: 'HistoryCtrl as vm'
        }
      }
    })
    .state('app.options', {
      url: "/options",
      views: {
        'menuContent' :{
          templateUrl: "templates/options.html",
          controller: 'OptionsCtrl as vm'
        }
      }
    })
    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html",
          controller: 'SearchCtrl as vm'
        }
      }
    })
    .state('app.wines', {
      url: "/wines",
      views: {
        'menuContent' :{
          templateUrl: "templates/wines.html",
          controller: 'WinesCtrl as vm'
        }
      }
    })
    .state('app.add', {
      url: "/add",
      views: {
        'menuContent' :{
          templateUrl: "templates/edit.html",
          controller: 'EditCtrl as vm'
        }
      }
    })
    .state('app.edit', {
      url: "/add/:wineId",
      views: {
        'menuContent' :{
          templateUrl: "templates/edit.html",
          controller: 'EditCtrl as vm'
        }
      }
    })

    .state('app.item', {
      url: "/wines/:wineId",
      views: {
        'menuContent' :{
          templateUrl: "templates/wine.html",
          controller: 'WineCtrl as vm'
        }
      }
    })
    .state('app.historyItem', {
      url: "/history/:wineId",
      views: {
        'menuContent' :{
          templateUrl: "templates/winehistory.html",
          controller: 'WineHistoryCtrl as vm'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/wines');
});

