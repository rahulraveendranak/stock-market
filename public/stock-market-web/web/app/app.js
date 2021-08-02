var app = angular.module("stock-market", [
    "ui.bootstrap",
    "ngRoute",
    "Authentication",
    "angular-md5",
    "ngFileUpload",
    "ngCookies",
    "ngFileSaver",
    "ngSanitize",
    "angular-jwt",
    "ngStorage",
    "google.places",
    "textAngular",
    "checklist-model",
    'angucomplete-alt',
    'ngAnimate',
    'ui.mask',
    '720kb.datepicker',
    'ngIdle',
    'angularjs-datetime-picker',
    'chart.js',
    'moment-picker',
    "ngPatternRestrict",
    "onlyDigitsAndNumeric",
    "angularjs-dropdown-multiselect",
])

.config(['$routeProvider', '$locationProvider', '$httpProvider', 'jwtOptionsProvider', 'IdleProvider', 'KeepaliveProvider',

    function($routeProvider, $locationProvider, $httpProvider, jwtOptionsProvider, IdleProvider, KeepaliveProvider) {

        jwtOptionsProvider.config({
            tokenGetter: ['checkCookieExist', 'options', '$location', 'jwtHelper',
                function(checkCookieExist, options, $location, jwtHelper) {
                    var gtoken = checkCookieExist.isSetCookie();

                    /*if (options.url.substr(options.url.length - 5) == '.html') {
                        return null;
                    }*/
                    // gtoken.idleTimeOut

                    var timeout = 20; // in minutes
                    IdleProvider.idle(timeout * 60); // idle time
                    IdleProvider.timeout(5); // in seconds
                    KeepaliveProvider.interval(2); // in seconds

                    if (gtoken) {
                        var bool = jwtHelper.isTokenExpired(gtoken.currentUser.token);
                        if (bool) {
                            checkCookieExist.clearCookie();
                            if ($location.path() != '/forgot-password') {
                                $location.path('/login');
                            }
                        }
                        if (gtoken.currentUser.token) {
                            return gtoken.currentUser.token;
                        }
                    }

                    if (!gtoken) {
                        checkCookieExist.clearCookie();
                        if ($location.path() != '/forgot-password') {
                            $location.path('/login');
                        }
                    }
                }
            ],

            // whiteListedDomains: ['localhost']
                whiteListedDomains: ['http://infinite-anchorage-83425.herokuapp.com/']
              
        });

        $httpProvider.interceptors.push('jwtInterceptor');

        $routeProvider

        .when("/login", {
            templateUrl: "app/modules/auth/views/login.html",
            controller: "LoginController",
            showHeaderFooter: false,
        })


        .when("/logout", {
            template: '',
            controller: "LogoutController",
            showHeaderFooter: false
        })




        /*--------------------------------------
            Dashboard Routes
        ---------------------------------------*/
        .when("/dashboard", {
            templateUrl: "app/modules/dashboard/views/dashboard.html",
            controller: "DashboardController",
            showHeaderFooter: true,
        })


        /*--------------------------------------
            Miscellaneous routes
        ---------------------------------------*/
        .when("/no-permission", {
            templateUrl: "app/partials/no-permission.html",
            // controller: "RulesManagerController",
            showHeaderFooter: true,
        })

        .otherwise({
            templateUrl: "app/partials/404.html",
            // controller: "LoginController",
            showHeaderFooter: false
        });

    }
])

.run(['$rootScope', '$location', '$cookies', '$cookieStore', 'Idle', function($rootScope, $location, $cookies, $cookieStore, Idle) {

    $rootScope.$on('$routeChangeSuccess', function() {
        if ($location.path() == '/login') {
            Idle.unwatch();
        } else {
            Idle.watch();
        }
    });

    $rootScope.globals = $cookieStore.get('globals') || {};

  

    $rootScope.API_URL = 'http://infinite-anchorage-83425.herokuapp.com/api/';

    // $rootScope.API_URL = 'http://localhost/stock-market/stock-market-api/public/api/';



    $rootScope.DEFAULT_IMAGE_URL = $rootScope.IMG_URL + 'images/no-image.jpg';
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        $rootScope.showHeaderFooter = current.showHeaderFooter;
        if ($location.path() == '/login' || $location.path() == '/register') {
            $rootScope.logRegClass = "loginRegisterClass";
        } else {
            $rootScope.logRegClass = "";
        }
    });

}]);