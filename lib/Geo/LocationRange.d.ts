import { Coordinate } from "../Model/Coordinate";
/**
 * Abstract Location Range class
 */
export declare abstract class LocationRange {
    /**
     * To filter object
     *
     * @return {{}}}
     */
    abstract toFilterObject(): any;
    /**
     * Get name
     *
     * @return {string}
     */
    abstract getName(): string;
    /**
     * From filter object
     *
     * @param object
     *
     * @return {LocationRange}
     */
    static fromFilterObject(object: any): LocationRange;
    /**
     * to array
     */
    toArray(): {
        type: string;
        data: any;
    };
    /**
     * Create from array
     *
     * @param array
     */
    static createFromArray(array: any): LocationRange;
}
/**
 * CoordinateAndDistance
 */
export declare class CoordinateAndDistance extends LocationRange {
    private coordinate;
    private distance;
    /**
     * Constructor
     *
     * @param coordinate
     * @param distance
     */
    constructor(coordinate: Coordinate, distance: string);
    /**
     * To filter object
     *
     * @return {{}}}
     */
    toFilterObject(): any;
    /**
     * Get name
     *
     * @return {string}
     */
    getName(): string;
    /**
     * From filter object
     *
     * @param object
     *
     * @return {LocationRange}
     */
    static fromFilterObject(object: any): LocationRange;
}
/**
 * Polygon
 */
export declare class Polygon extends LocationRange {
    private coordinates;
    /**
     * Constructor
     *
     * @param coordinates
     */
    constructor(coordinates: Coordinate[]);
    /**
     * To filter object
     *
     * @return {{coordinates: {lat:number, lon:number}[]}}
     */
    toFilterObject(): any;
    /**
     * Get name
     *
     * @return {string}
     */
    getName(): string;
    /**
     * From filter object
     *
     * @param object
     *
     * @return {Polygon}
     */
    static fromFilterObject(object: {
        coordinates: Array<{
            lat: number;
            lon: number;
        }>;
    }): Polygon;
}
/**
 * Square
 */
export declare class Square extends LocationRange {
    private topLeftCoordinate;
    private bottomRightCoordinate;
    /**
     * Constructor
     *
     * @param topLeftCoordinate
     * @param bottomRightCoordinate
     */
    constructor(topLeftCoordinate: Coordinate, bottomRightCoordinate: Coordinate);
    /**
     * To filter object
     *
     * @return {{}}}
     */
    toFilterObject(): {
        top_left: {
            lat: number;
            lon: number;
        };
        bottom_right: {
            lat: number;
            lon: number;
        };
    };
    /**
     * Get name
     *
     * @return {string}
     */
    getName(): string;
    /**
     * From filter object
     *
     * @param object
     *
     * @return {LocationRange}
     */
    static fromFilterObject(object: {
        top_left: {
            lat: number;
            lon: number;
        };
        bottom_right: {
            lat: number;
            lon: number;
        };
    }): LocationRange;
}
