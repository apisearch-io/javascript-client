"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Coordinate_1 = require("../Model/Coordinate");
/**
 * Abstract Location Range class
 */
var LocationRange = /** @class */ (function () {
    function LocationRange() {
    }
    /**
     * From filter object
     *
     * @param object
     *
     * @return {LocationRange}
     */
    LocationRange.fromFilterObject = function (object) {
        throw TypeError("Method not valid");
    };
    /**
     * to array
     */
    LocationRange.prototype.toArray = function () {
        return {
            type: this.getName(),
            data: this.toFilterObject()
        };
    };
    /**
     * Create from array
     *
     * @param array
     */
    LocationRange.createFromArray = function (array) {
        if (array.type == "CoordinateAndDistance") {
            return CoordinateAndDistance.fromFilterObject(array.data);
        }
        if (array.type == "Polygon") {
            return Polygon.fromFilterObject(array.data);
        }
        if (array.type == "Square") {
            return Square.fromFilterObject(array.data);
        }
    };
    return LocationRange;
}());
exports.LocationRange = LocationRange;
/**
 * CoordinateAndDistance
 */
var CoordinateAndDistance = /** @class */ (function (_super) {
    __extends(CoordinateAndDistance, _super);
    /**
     * Constructor
     *
     * @param coordinate
     * @param distance
     */
    function CoordinateAndDistance(coordinate, distance) {
        var _this = _super.call(this) || this;
        _this.coordinate = coordinate;
        _this.distance = distance;
        return _this;
    }
    /**
     * To filter object
     *
     * @return {{}}}
     */
    CoordinateAndDistance.prototype.toFilterObject = function () {
        return {
            coordinate: this.coordinate.toArray(),
            distance: this.distance
        };
    };
    /**
     * Get name
     *
     * @return {string}
     */
    CoordinateAndDistance.prototype.getName = function () {
        return "CoordinateAndDistance";
    };
    /**
     * From filter object
     *
     * @param object
     *
     * @return {LocationRange}
     */
    CoordinateAndDistance.fromFilterObject = function (object) {
        return new CoordinateAndDistance(Coordinate_1.Coordinate.createFromArray(object.coordinate), object.distance);
    };
    return CoordinateAndDistance;
}(LocationRange));
exports.CoordinateAndDistance = CoordinateAndDistance;
/**
 * Polygon
 */
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    /**
     * Constructor
     *
     * @param coordinates
     */
    function Polygon(coordinates) {
        var _this = _super.call(this) || this;
        if (coordinates.length < 3) {
            throw new Error("A polygon needs more than two coordinates.");
        }
        _this.coordinates = coordinates;
        return _this;
    }
    /**
     * To filter object
     *
     * @return {{coordinates: {lat:number, lon:number}[]}}
     */
    Polygon.prototype.toFilterObject = function () {
        var coordinates = [];
        for (var i in this.coordinates) {
            coordinates.push(this.coordinates[i].toArray());
        }
        return {
            coordinates: coordinates
        };
    };
    /**
     * Get name
     *
     * @return {string}
     */
    Polygon.prototype.getName = function () {
        return "Polygon";
    };
    /**
     * From filter object
     *
     * @param object
     *
     * @return {Polygon}
     */
    Polygon.fromFilterObject = function (object) {
        var coordinates = [];
        for (var i in object.coordinates) {
            coordinates.push(Coordinate_1.Coordinate.createFromArray(object.coordinates[i]));
        }
        return new Polygon(coordinates);
    };
    return Polygon;
}(LocationRange));
exports.Polygon = Polygon;
/**
 * Square
 */
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    /**
     * Constructor
     *
     * @param topLeftCoordinate
     * @param bottomRightCoordinate
     */
    function Square(topLeftCoordinate, bottomRightCoordinate) {
        var _this = _super.call(this) || this;
        _this.topLeftCoordinate = topLeftCoordinate;
        _this.bottomRightCoordinate = bottomRightCoordinate;
        return _this;
    }
    /**
     * To filter object
     *
     * @return {{}}}
     */
    Square.prototype.toFilterObject = function () {
        return {
            top_left: this.topLeftCoordinate.toArray(),
            bottom_right: this.bottomRightCoordinate.toArray()
        };
    };
    /**
     * Get name
     *
     * @return {string}
     */
    Square.prototype.getName = function () {
        return "Square";
    };
    /**
     * From filter object
     *
     * @param object
     *
     * @return {LocationRange}
     */
    Square.fromFilterObject = function (object) {
        return new Square(Coordinate_1.Coordinate.createFromArray(object.top_left), Coordinate_1.Coordinate.createFromArray(object.bottom_right));
    };
    return Square;
}(LocationRange));
exports.Square = Square;
