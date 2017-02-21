(function(Intive, _) {
    'use strict';

    Intive.ImagePickerItemDirectiveController = activateExport();

    function activateExport() {
        return activatePrototype(ImagePickerItemDirectiveController);
    }

    function ImagePickerItemDirectiveController(model, dialogService, events) {
        activatePrivates.apply(this, Array.prototype.slice.call(arguments, 0));
        activatePublic.call(this);
    }

    function activatePrivates(model, dialogService, events) {
        if (model == null) {
            throw 'Model cannot be null or undefined';
        }
        if (dialogService == null) {
            throw 'DialogService cannot be null or undefined';
        }

        this._model = model;
        this._events = createEvents(events);
        this._dialogService = dialogService;
    }

    function createEvents(events) {
        var result = _.extend(
            {
                onImageClear: _.iteratee()
            },
            events);
        return result;
    }

    function activatePublic() {
        Object.defineProperty(this, 'model', {
            get: getModel.bind(this)
        });
    }

    function activatePrototype(ctor) {
        var prototype = ctor.prototype;
        prototype.hasImage = hasImage;
        prototype.clearImage = clearImage;
        prototype.pickImage = pickImage;

        return ctor;
    }

    function pickImage() {
        this._dialogService.mediaPicker({ callback: whenImagePicked.bind(this) });
    }

    function whenImagePicked(imageData) {
        this._model.url = imageData.image;
    }

    function hasImage() {
        return !!this.model.url;
    }

    function clearImage() {
        this._model.url = null;
        this._events.onImageClear();
    }

    function getModel() {
        return this._model;
    }
})(window.Intive = window.Intive || {}, _);
