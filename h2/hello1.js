// main.js
var app = angular.module('app', ['ui.grid']);
app.controller('MainCtrl', function($scope) {
    $scope.myData = [{ name: "Moroni", age: 50 },
        { name: "Tiancum", age: 43 },
        { name: "Jacob", age: 27 },
        { name: "Nephi", age: 29 },
        { name: "Enos", age: 34 }
    ];
    $scope.p1 = 100;
    $scope.gridOptions = { data: 'myData'};
});
// var app = angular.module('app', ['ngTouch', 'ui.grid']);
 
// app.controller('MainCtrl', ['$scope', function ($scope) {
 
//   $scope.myData = [
//     {
//         "firstName": "Cox",
//         "lastName": "Carney",
//         "company": "Enormo",
//         "employed": true
//     },
//     {
//         "firstName": "Lorraine",
//         "lastName": "Wise",
//         "company": "Comveyer",
//         "employed": false
//     },
//     {
//         "firstName": "Nancy",
//         "lastName": "Waters",
//         "company": "Fuelton",
//         "employed": false
//     }
// ];
// }]);