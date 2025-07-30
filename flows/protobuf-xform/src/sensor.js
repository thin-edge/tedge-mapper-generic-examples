/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function (global, factory) {
  /* global define, require, module */

  /* AMD */ if (typeof define === "function" && define.amd)
    define(["protobufjs/minimal"], factory);
  /* CommonJS */ else if (
    typeof require === "function" &&
    typeof module === "object" &&
    module &&
    module.exports
  )
    module.exports = factory(require("protobufjs/minimal"));
})(this, function ($protobuf) {
  "use strict";

  // Common aliases
  var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;

  // Exported root namespace
  var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

  $root.sensorpackage = (function () {
    /**
     * Namespace sensorpackage.
     * @exports sensorpackage
     * @namespace
     */
    var sensorpackage = {};

    sensorpackage.SensorMessage = (function () {
      /**
       * Properties of a SensorMessage.
       * @memberof sensorpackage
       * @interface ISensorMessage
       * @property {number|null} [temperature] SensorMessage temperature
       * @property {number|null} [humidity] SensorMessage humidity
       */

      /**
       * Constructs a new SensorMessage.
       * @memberof sensorpackage
       * @classdesc Represents a SensorMessage.
       * @implements ISensorMessage
       * @constructor
       * @param {sensorpackage.ISensorMessage=} [properties] Properties to set
       */
      function SensorMessage(properties) {
        if (properties)
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
      }

      /**
       * SensorMessage temperature.
       * @member {number} temperature
       * @memberof sensorpackage.SensorMessage
       * @instance
       */
      SensorMessage.prototype.temperature = 0;

      /**
       * SensorMessage humidity.
       * @member {number} humidity
       * @memberof sensorpackage.SensorMessage
       * @instance
       */
      SensorMessage.prototype.humidity = 0;

      /**
       * Creates a new SensorMessage instance using the specified properties.
       * @function create
       * @memberof sensorpackage.SensorMessage
       * @static
       * @param {sensorpackage.ISensorMessage=} [properties] Properties to set
       * @returns {sensorpackage.SensorMessage} SensorMessage instance
       */
      SensorMessage.create = function create(properties) {
        return new SensorMessage(properties);
      };

      /**
       * Encodes the specified SensorMessage message. Does not implicitly {@link sensorpackage.SensorMessage.verify|verify} messages.
       * @function encode
       * @memberof sensorpackage.SensorMessage
       * @static
       * @param {sensorpackage.ISensorMessage} message SensorMessage message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      SensorMessage.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (
          message.temperature != null &&
          Object.hasOwnProperty.call(message, "temperature")
        )
          writer.uint32(/* id 1, wireType 1 =*/ 9).double(message.temperature);
        if (
          message.humidity != null &&
          Object.hasOwnProperty.call(message, "humidity")
        )
          writer.uint32(/* id 2, wireType 1 =*/ 17).double(message.humidity);
        return writer;
      };

      /**
       * Encodes the specified SensorMessage message, length delimited. Does not implicitly {@link sensorpackage.SensorMessage.verify|verify} messages.
       * @function encodeDelimited
       * @memberof sensorpackage.SensorMessage
       * @static
       * @param {sensorpackage.ISensorMessage} message SensorMessage message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      SensorMessage.encodeDelimited = function encodeDelimited(
        message,
        writer,
      ) {
        return this.encode(message, writer).ldelim();
      };

      /**
       * Decodes a SensorMessage message from the specified reader or buffer.
       * @function decode
       * @memberof sensorpackage.SensorMessage
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {sensorpackage.SensorMessage} SensorMessage
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      SensorMessage.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.sensorpackage.SensorMessage();
        while (reader.pos < end) {
          var tag = reader.uint32();
          if (tag === error) break;
          switch (tag >>> 3) {
            case 1: {
              message.temperature = reader.double();
              break;
            }
            case 2: {
              message.humidity = reader.double();
              break;
            }
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };

      /**
       * Decodes a SensorMessage message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof sensorpackage.SensorMessage
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {sensorpackage.SensorMessage} SensorMessage
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      SensorMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };

      /**
       * Verifies a SensorMessage message.
       * @function verify
       * @memberof sensorpackage.SensorMessage
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */
      SensorMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (
          message.temperature != null &&
          message.hasOwnProperty("temperature")
        )
          if (typeof message.temperature !== "number")
            return "temperature: number expected";
        if (message.humidity != null && message.hasOwnProperty("humidity"))
          if (typeof message.humidity !== "number")
            return "humidity: number expected";
        return null;
      };

      /**
       * Creates a SensorMessage message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof sensorpackage.SensorMessage
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {sensorpackage.SensorMessage} SensorMessage
       */
      SensorMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.sensorpackage.SensorMessage) return object;
        var message = new $root.sensorpackage.SensorMessage();
        if (object.temperature != null)
          message.temperature = Number(object.temperature);
        if (object.humidity != null) message.humidity = Number(object.humidity);
        return message;
      };

      /**
       * Creates a plain object from a SensorMessage message. Also converts values to other types if specified.
       * @function toObject
       * @memberof sensorpackage.SensorMessage
       * @static
       * @param {sensorpackage.SensorMessage} message SensorMessage
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */
      SensorMessage.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
          object.temperature = 0;
          object.humidity = 0;
        }
        if (
          message.temperature != null &&
          message.hasOwnProperty("temperature")
        )
          object.temperature =
            options.json && !isFinite(message.temperature)
              ? String(message.temperature)
              : message.temperature;
        if (message.humidity != null && message.hasOwnProperty("humidity"))
          object.humidity =
            options.json && !isFinite(message.humidity)
              ? String(message.humidity)
              : message.humidity;
        return object;
      };

      /**
       * Converts this SensorMessage to JSON.
       * @function toJSON
       * @memberof sensorpackage.SensorMessage
       * @instance
       * @returns {Object.<string,*>} JSON object
       */
      SensorMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      /**
       * Gets the default type url for SensorMessage
       * @function getTypeUrl
       * @memberof sensorpackage.SensorMessage
       * @static
       * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns {string} The default type url
       */
      SensorMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
          typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/sensorpackage.SensorMessage";
      };

      return SensorMessage;
    })();

    return sensorpackage;
  })();

  return $root;
});
