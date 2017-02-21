(function (angular, Intive) {
    'use strict';

    angular.module('umbraco').directive('imagePicker', ImagePickerDirective);

    function ImagePickerDirective() {
        return {
            restrict: 'E',
            scope: {
                'model': '='
            },
            controller: [
                '$scope',
                ImagePickerDirectiveCtrl],
            templateUrl: '/App_Plugins/Directives/ImagePicker/image-picker.html'
        };

        function ImagePickerDirectiveCtrl($scope) {
            $scope.controller = getController.apply(this, arguments);
        }

        function getController($scope, modelHelper) {
            var controller = new Intive.ImagePickerDirectiveController(
                $scope.model,
                modelHelper
            );
            return controller;
        }
    }
})(angular, window.Intive = window.Intive || {});
