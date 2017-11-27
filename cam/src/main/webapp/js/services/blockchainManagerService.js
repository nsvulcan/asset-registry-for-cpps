/**
 * Created by ascatolo on 10/10/2016.
 */
camApp.factory('blockchainManager', ['$q', '$http', '${authentication.service}', function ($q, $http, auth) {

    // create a new object
    var blockchainManager = {};
    var ignoreLoadingBar = {
        ignoreLoadingBar: true
    };

    var BLOCKCHAIN_URL_CONST = 'http://192.168.56.101:3000/api';

    function rejectNotLoggedCall() {
        var defer = $q.defer();
        defer.reject({
            message: 'ERROR_NOT_LOGGED: You are not logged in. Please login!'
        });
        return defer.promise;
    }

    // get a single user
    blockchainManager.getCommodities = function () {
        if (auth.isLoggedIn()) {
            return $http.get(BLOCKCHAIN_URL_CONST + '/Commodity');
        } else
            return rejectNotLoggedCall();
    };


    blockchainManager.getCommodity = function (id) {
        if (auth.isLoggedIn()) {
            return $http.get(BLOCKCHAIN_URL_CONST + '/Commodity/{' + id + '}');
        } else
            return rejectNotLoggedCall();
    };


    return blockchainManager;
}]);