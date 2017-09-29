angular.module('myApp')
    .factory('geoFactory', ['$http', '$rootScope', function ($http, $rootScope) {
        return {
            getByParentId: function (pid) {
                return $http.post('Geo/GetByPid', { pid: pid });
            }
        }
    }]);