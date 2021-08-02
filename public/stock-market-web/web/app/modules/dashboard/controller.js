app.controller('DashboardController', [
        'permission',
        '$routeParams',
        '$rootScope',
        '$scope',
        '$http',
        '$cookies',
        'checkCookieExist',
        '$log',
        'uibDateParser',
        '$location',
        '$timeout',
        '$filter',
        '$uibModal',
        '$route',
        'apiData',
        'Upload',
        function(permission,$routeParams, $rootScope, $scope, $http, $cookies, checkCookieExist, $log, uibDateParser, $location, $timeout, $filter, $uibModal, $route, apiData,Upload) {
           
            $scope.showLoader = true;
            $scope.showCompanyDetails = false;
    
    
            $scope.getDataFromAPI = function() {
        
                // get managers
                apiData.getData($rootScope.API_URL + 'allStockMarketDetails').then(function(data) {
                    $scope.companies = data;
                    console.log($scope.employees);
                    $scope.showLoader = false;
                });
            };
    
            $scope.getDataFromAPI();
    

    
        
            //select a company
            $scope.selectedCompany = function(selected) {
                if (selected) {
                    $scope.company_profile = selected.originalObject;
                    $scope.showCompanyDetails = true;
                } else {
                    $scope.company_profile_id = null;
                }
            }
    
           
            //end select company
    
        }
    ])


