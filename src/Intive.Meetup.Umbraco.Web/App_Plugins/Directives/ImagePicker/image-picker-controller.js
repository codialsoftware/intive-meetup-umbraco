(function(Intive, _) {
    'use strict';

    Intive.ImagePickerDirectiveController = activateExport();

    function activateExport() {
        return activatePrototype(ImagePickerDirectiveController);
    }

    function ImagePickerDirectiveController(model) {
        activatePrivates.apply(this, Array.prototype.slice.call(arguments));
        activatePublic.call(this);
        activateInitialSetup.call(this);
    }

    function activatePrivates(model) {
        if (model == null) {
            throw 'Model cannot be null or undefined';
        }

        this._model = model;
    }

    function activatePublic() {
        Object.defineProperty(this, 'model', {
            get: getModel.bind(this)
        });
    }

    function activateInitialSetup() {
        activateModelInitials.call(this);
    }

    function activateModelInitials() {
        this._model.srcset = this._model.srcset || [
            { variant: '2x', url: null },
            { variant: '3x', url: null },
            { variant: '4x', url: null }
        ];
    }

    function activatePrototype(ctor) {
        var prototype = ctor.prototype;
        prototype.showSourceSetImages = showSourceSetImages;
        prototype.onImageClear = whenRootImageCleared;

        return ctor;
    }

    function showSourceSetImages() {
        return !!this._model && !!this._model.url;
    }

    function getModel() {
        return this._model;
    }

    function whenRootImageCleared() {
        _.each(this._model.srcset, function (item) {
            item.url = null;
        });
    }
})(window.Intive = window.Intive || {}, _);
