var app = angular.module("TestApp", []);

app.controller("MainController", mainController);

function mainController() {
    var vm = this;

    vm.message = "Hello!";

    vm.people = clientPeople;
}