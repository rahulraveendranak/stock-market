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

//Sub-admin permission check module role id should not be admin
// if ($rootScope.globals.currentUser.roleID == 5 || $rootScope.globals.currentUser.roleID == 6 || $rootScope.globals.currentUser.roleID == 7) {
//     $scope.permissionValue = permission.permissionCheck('api/vendorDevicesLists');
// }