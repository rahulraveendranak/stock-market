//Get data from API call 
app.service("apiData", ['$http', function($http) {
    return {
        getData: function(api_call) {    
            return $http.get(api_call)
            .then(function(response) {
                return response.data.data;
            });
        }
    };
}]);

// const formatDate = (date) => {
//     var d = new Date(date),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();
//     if (month.length < 2)
//         month = '0' + month;
//     if (day.length < 2)
//         day = '0' + day;
//     return [year, month, day].join('-');
// };

//service to check user access permission
app.service('permission', function($http, $rootScope, $location) {
    this.permissionCheck = function(api_call) {
        $http({
            method: 'POST',
            url: $rootScope.API_URL + 'checkModulePermission',
            data: { api: api_call }
        }).then(function successCallback(response) {
            if (response.data == 0) {
                $location.path('/no-permission')
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }
});