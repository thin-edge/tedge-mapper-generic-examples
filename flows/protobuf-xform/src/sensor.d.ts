import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace sensorpackage. */
export namespace sensorpackage {
  /** Properties of a SensorMessage. */
  interface ISensorMessage {
    /** SensorMessage temperature */
    temperature?: number | null;

    /** SensorMessage humidity */
    humidity?: number | null;
  }

  /** Represents a SensorMessage. */
  class SensorMessage implements ISensorMessage {
    /**
     * Constructs a new SensorMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: sensorpackage.ISensorMessage);

    /** SensorMessage temperature. */
    public temperature: number;

    /** SensorMessage humidity. */
    public humidity: number;

    /**
     * Creates a new SensorMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SensorMessage instance
     */
    public static create(
      properties?: sensorpackage.ISensorMessage,
    ): sensorpackage.SensorMessage;

    /**
     * Encodes the specified SensorMessage message. Does not implicitly {@link sensorpackage.SensorMessage.verify|verify} messages.
     * @param message SensorMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: sensorpackage.ISensorMessage,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified SensorMessage message, length delimited. Does not implicitly {@link sensorpackage.SensorMessage.verify|verify} messages.
     * @param message SensorMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: sensorpackage.ISensorMessage,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a SensorMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SensorMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): sensorpackage.SensorMessage;

    /**
     * Decodes a SensorMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SensorMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): sensorpackage.SensorMessage;

    /**
     * Verifies a SensorMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a SensorMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SensorMessage
     */
    public static fromObject(object: {
      [k: string]: any;
    }): sensorpackage.SensorMessage;

    /**
     * Creates a plain object from a SensorMessage message. Also converts values to other types if specified.
     * @param message SensorMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: sensorpackage.SensorMessage,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this SensorMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for SensorMessage
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }
}
