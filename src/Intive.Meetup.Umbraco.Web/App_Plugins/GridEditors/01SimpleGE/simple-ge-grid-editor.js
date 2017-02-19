(function(angular) {
    'use strict';

    angular.module('umbraco').controller(
        'Intive.GridEditors.SimpleGE01',
        [ '$scope', simpleGEAngularController ]);
    
    function simpleGEAngularController($scope) {
        activate.call(this, $scope.control);
    }

    function activate(persistence) {
        initializePersistence(persistence);
        this.model = persistence.value;
    }

    function initializePersistence(persistence) {
        persistence.value = persistence.value || {};
    }
})(angular);