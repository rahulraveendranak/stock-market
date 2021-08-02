'use strict';

angular.module('Authentication')

    .factory('AuthenticationService', [ '$http', '$cookieStore', '$rootScope', '$timeout',
        function( $http, $cookieStore, $rootScope, $scope) {
            var service = {};
            service.Login = function(username, password, callback) {
                $http({
                    method: 'POST',
                    url: $rootScope.API_URL + 'login',
                    data: { username: username, password: password }
                }).then(function successCallback(response) {
                    console.log(response);
                    callback(response);
                });
            };

            service.SetCredentials = function(username, password, response) {

                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        token: response.data.token,
                        userID: response.data.data.id,
                        roleID: response.data.data.role_id,
                    },
                };
                $cookieStore.put('globals', $rootScope.globals);

            };

            service.ClearCredentials = function() {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
            };

            return service;
        }
    ])

    .factory('checkCookieExist', ['$cookieStore', '$rootScope',
        function($cookieStore, $rootScope) {

            return {
                isSetCookie: function() {
                    var cookie;
                    if ($cookieStore.get("globals")) {
                        cookie = $cookieStore.get("globals");
                    }
                    return (cookie) ? cookie : false;
                },
                clearCookie: function() {
                    // console.log($cookieStore.get("globals"));
                    $rootScope.globals = {};
                    $cookieStore.remove('globals');
                    // console.log($cookieStore.get("globals"));
                    return true;
                }
            }
        }
    ]);