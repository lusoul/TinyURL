/**
 * Created by Nathan on 9/3/2016.
 */
angular.module('tinyUrl').controller('userMainController', ['$window', '$location', '$rootScope', '$scope', '$http', '$state',
    function ($window, $location, $rootScope, $scope, $http, $state) {

        $scope.urls = [];

        //get all urls in list

        $http.get('/api/user/urls')
            .success(function (data) {
                $scope.urls = data;
            });


        $scope.dateFormat = 'MMM d, yyyy hh:mm:ss a';

        $scope.prefix = $location.protocol() + "://" +
            $location.host() + ":" +
            $location.port() + "/";


        $scope.reverseSort = true;  //descending as default


        $scope.submit = function () {
            $http.post('/api/user/urls', {
                longUrl: $scope.longUrl,
                user: $rootScope.user.username
            }).success(function (data) {
                $state.go('home.user.urlInfo', {shortUrl: data.shortUrl});
            });
        };

        $scope.delete = function (shortUrl) {
            var delShortUrl = $window.confirm('Are you absolutely sure you want to delete this shortUrl?');

            if (delShortUrl) {
                $http.delete('/api/user/urls/' + shortUrl)
                    .success(function (data) {
                        if (data.success) {
                            console.log('delete success');
                        } else {
                            console.log('delete fail');
                        }
                        $http.get('/api/user/urls')
                            .success(function (data) {
                                $scope.urls = data;
                            });
                    });
            }
        }

    }]);