var myApp = angular.module('app', ['ui.router','ui.grid']);
myApp.config(function($stateProvider) {
    var state1 = {
        name: 'home',
        url: '/home',
        template: '<h3>hello world</h3>'

    }
    var state2 = {
        name: 'other',
        url: '/other',
        template: '<h3>details1</h3>'

    }
    $stateProvider.state(state1);
    $stateProvider.state(state2);

});
myApp.controller('MainCtrl', ['$scope', function($scope) {
    $scope.p1 = "this is p1";
    $scope.fun1 = function() {
        $('input').remove()
    };
    $scope.fun2 = function() {
        alert($scope.p1)

    };
}]);
myApp.controller('ctrl2', ['$scope', function($scope) {
    $scope.myData = [{ name: "Moroni", age: 50 },
        { name: "Tiancum", age: 43 },
        { name: "Jacob", age: 27 },
        { name: "Nephi", age: 29 },
        { name: "Enos", age: 34 }
    ];

    $scope.gridOptions = { data: 'myData' }


}])


