"use strict";
exports.__esModule = true;
exports.Metadata = void 0;
/**
 * User class
 */
var Metadata = /** @class */ (function () {
    function Metadata() {
    }
    /**
     * To metadata
     *
     * @param array:{}
     *
     * @returns {string}
     */
    Metadata.toMetadata = function (array) {
        array = JSON.parse(JSON.stringify(array));
        var parts = [];
        for (var key in array) {
            parts.push(key + "##" + array[key]);
        }
        return parts.join("~~");
    };
    /**
     * From metadata
     *
     * @param metadata
     *
     * @return {{}}
     */
    Metadata.fromMetadata = function (metadata) {
        var values = {};
        var splittedParts = metadata.split("~~");
        var iterator = 0;
        var size = 0;
        var lastElement = null;
        for (var key in splittedParts) {
            var part = splittedParts[key];
            var parts = part.split("##");
            if (parts.length > 1) {
                lastElement = parts[1];
                values[parts[0]] = lastElement;
            }
            else {
                lastElement = part;
                values[iterator++] = lastElement;
            }
            size++;
        }
        if (size == 1) {
            values = {
                id: lastElement,
                name: lastElement
            };
        }
        if (typeof values.id == "undefined") {
            return null;
        }
        return values;
    };
    return Metadata;
}());
exports.Metadata = Metadata;
