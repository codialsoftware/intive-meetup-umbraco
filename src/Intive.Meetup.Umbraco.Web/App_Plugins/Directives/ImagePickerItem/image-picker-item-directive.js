(function(angular, Intive, _) {
    'use strict';

    angular.module('umbraco').directive('imagePickerItem', ImagePickerItemDirective);

    function ImagePickerItemDirective() {
        return {
            restrict: 'E',
            scope: {
                'model': '=',
                'onClear': '&'
            },
            controller: [
                '$scope',
                'dialogService',
                ImagePickerItemDirectiveCtrl
            ],
            templateUrl: '/App_Plugins/Directives/ImagePickerItem/image-picker-item.html'
        };
    }

    function ImagePickerItemDirectiveCtrl($scope, dialogService) {
        $scope.controller = new Intive.ImagePickerItemDirectiveController(
            $scope.model,
            dialogService,
            { onImageClear: _.iteratee($scope.onClear) }
        );
    }
})(angular, window.Intive = window.Intive || {}, _);
