'use strict';

var apps = angular.module('Authentication', ['ngCookies', 'ngIdle'])

apps.controller('LoginController', ['$scope', '$cookies', 'md5', '$rootScope', '$location', 'AuthenticationService', 'checkCookieExist', '$cookieStore', 'Idle', 'Keepalive',
    function ($scope, $cookies, md5, $rootScope, $location, AuthenticationService, checkCookieExist, $cookieStore, Idle, Keepalive) {
        if (checkCookieExist.isSetCookie()) {
            var cookie;
            if ($cookieStore.get("globals")) {
                cookie = $cookieStore.get("globals");
            }
            // if (cookie.currentUser.roleID == "1") {
                $location.path('/dashboard');
            // }
            // if (cookie.currentUser.roleID == "5") {
            //     $location.path('/dashboard-sub-admin');
            // }
            // if (cookie.currentUser.roleID == "6" || cookie.currentUser.roleID == "7") {
            //     $location.path('/dashboard');
            // }
        } else {
            checkCookieExist.clearCookie();
        }

        if ($rootScope.messagee) {
            $scope.messages = $rootScope.messagee.message + ", Please Login Here";
            $scope.messageStatus = 'success';
        }

        $scope.login = function () {
            $scope.dataLoading = true;

            AuthenticationService.Login($scope.username, md5.createHash($scope.password), function (response) {

                if (response.data.status == 'ok') {
                    AuthenticationService.SetCredentials($scope.username, $scope.password, response);
                    console.log('After login', response);
                        $location.path('/dashboard');
                
                } else {

                    $scope.messageStatus = 'danger';
                    $scope.message = response.data.message;
                    $scope.dataLoading = false;

                }
            });

        }
    }
])

    .controller('LogoutController', ['$rootScope', '$scope', '$location', '$http', 'checkCookieExist', '$localStorage',

        function ($rootScope, $scope, $location, $http, checkCookieExist, $localStorage) {
            $scope.showLoader = true;

            $scope.logout = function () {
                if (checkCookieExist.clearCookie()) {
                    $scope.showLoader = false;
                    $rootScope.orientation = 'ltr';
                    $location.path('/login');
                } else {
                    $scope.showLoader = false;
                    $location.path('/dashboard-admin');
                }
            }

            if (checkCookieExist.isSetCookie()) {
                $http({
                    method: 'POST',
                    url: $rootScope.API_URL + 'logout'
                }).then(
                    function successCallback(response) {
                        $scope.logout();
                    },
                    function errorCallback(response) {
                        //console.log(response);
                        $scope.logout();
                    }
                );

            } else {
                $scope.logout();
            }
        }
    ])

     // Forgot Password Controller
     .controller('ForgotPasswordController', [
        'md5',
        '$rootScope',
        '$scope',
        '$http',
        '$cookies',
        'checkCookieExist',
        '$log',
        'uibDateParser',
        '$location',
        '$timeout',
        '$anchorScroll',
        'Upload',
        '$filter',
        '$uibModal',
        function (md5, $rootScope, $scope, $http, $cookies, checkCookieExist, $log, uibDateParser, $location, $timeout, $anchorScroll, Upload, $filter, $uibModal) 
        {
            $scope.showOTP = false; 
            $scope.showpwd = false; 
            $scope.showsendotp = true; 
            $scope.showEmail = true; 
        
            $scope.sendOtpToEmail = function () {
                $scope.dataLoading = true;
                var params = 
                {
                    email: $scope.email
                }
    
                $http({
                    method: 'POST',
                    url: $rootScope.API_URL + 'forgot-password',
                    data: params
                }).then(function successCallback(response) 
                {
                    console.log(response);
                    window.scrollTo(0, 0)
                    if (response.data.status == "ok") 
                    {
                        $scope.messageStatus = "success";
                        $scope.message = response.data.message;
                        $scope.showOTP = true; 
                        $scope.showsendotp = false; 
                        $scope.dataLoading = false;
                    } 
                    else 
                    {
                        $scope.showLoader = false;
                        $scope.messageStatus = "danger";
                        $scope.message = response.data.message;
                        $scope.dataLoading = false;
                    }
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            $scope.verifyOtp = function () 
            {
                $scope.showpwd = false; 
                $scope.dataLoading = true;

                var params = 
                {
                    email: $scope.email,
                    otp: $scope.otp,
                }
    
                $http({
                    method: 'POST',
                    url: $rootScope.API_URL + 'verify-otp',
                    data: params
                }).then(function successCallback(response) 
                {
                    console.log(response);
                    window.scrollTo(0, 0)
                    if (response.data.status == "ok") 
                    {
                        $scope.messageStatus = "success";
                        $scope.message = response.data.message;
                        $scope.dataLoading = false;
                        $scope.showpwd = true; 
                        $scope.showOTP = false;
                         
                    } 
                    else 
                    {
                        $scope.showLoader = false;
                        $scope.messageStatus = "danger";
                        $scope.message = response.data.message;
                        $scope.dataLoading = false;
                    }
                }, function errorCallback(response) {
                    console.log(response);
                });
            };


            
            $scope.resetPassword = function () 
            {
                $scope.dataLoading = true;
                $scope.hashedPassword =  md5.createHash($scope.password);
                $scope.hashedConfirmPassword =  md5.createHash($scope.confirm_password);
                var params = 
                {
                    email: $scope.email,
                    password: $scope.hashedPassword,
                    confirm_password: $scope.hashedConfirmPassword,
                }
    
                $http({
                    method: 'POST',
                    url: $rootScope.API_URL + 'reset-password',
                    data: params
                }).then(function successCallback(response) 
                {
                    console.log(response);
                    window.scrollTo(0, 0)
                    if (response.data.status == "ok") 
                    {
                        $scope.messageStatus = "success";
                        $scope.message = response.data.message;
                        $scope.dataLoading = false;
                        $scope.showpwd = false; 
                        $scope.showOTP = false; 
                        $scope.showEmail = false; 
                    } 
                    else 
                    {
                        $scope.showLoader = false;
                        $scope.messageStatus = "danger";
                        $scope.message = response.data.message;
                        $scope.dataLoading = false;
                    }
                }, function errorCallback(response) {
                    console.log(response);
                });
            };
            
        }
])