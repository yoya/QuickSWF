/**
 * @author Jason Parrott
 *
 * Copyright (C) 2012 Jason Parrott.
 * This code is licensed under the zlib license. See LICENSE for details.
 */
(function(global) {

  global.quickswf.structs.LineStyle = LineStyle;

  /**
   * @constructor
   * @class {quickswf.structs.LineStyle}
   */
  function LineStyle(pIsMorph) {
    if (pIsMorph) {
      this.startWidth = 0;
      this.endWidth = 0;
      this.startColor = null;
      this.endColor = null;
    } else {
      this.width = 0;
      this.color = null;
    }
  }

  /**
   * Loads a LineStyle type.
   * @param {quickswf.Reader} pReader The reader to use.
   * @param {bool} pWithAlpha True if alpha needs to be parsed.
   * @param {bool} pIsMorph True if morph shape.
   * @return {quickswf.structs.LineStyle} The loaded LineStyle.
   */
  LineStyle.load = function(pReader, pWithAlpha, pIsMorph) {
    var RGBA = global.quickswf.structs.RGBA;
    var tLineStyle = new LineStyle(pIsMorph);
    if (pIsMorph) {
      tLineStyle.startWidth = pReader.I16();
      tLineStyle.endWidth = pReader.I16();
      tLineStyle.startColor = RGBA.load(pReader, pWithAlpha);
      tLineStyle.endColor = RGBA.load(pReader, pWithAlpha);
    } else {
      tLineStyle.width = pReader.I16();
      tLineStyle.color = RGBA.load(pReader, pWithAlpha);
    }
    return tLineStyle;
  };

  /**
   * Loads an array of LineStyle types.
   * @param {quickswf.Reader} pReader The reader to use.
   * @param {bool} pWithAlpha True if alpha needs to be parsed.
   * @param {bool} pHasLargeFillCount True if this struct can have more than 256 styles.
   * @param {bool} pIsMorph True if morph shape.
   * @return {Array.<quickswf.structs.LineStyle>} The loaded LineStyle array.
   */
  LineStyle.loadMultiple = function(pReader, pWithAlpha, pHasLargeFillCount, pIsMorph) {
    var tCount = pReader.B();

    if (pHasLargeFillCount && tCount === 0xFF) {
      tCount = pReader.I16();
    }

    var tArray = new Array(tCount);

    for (var i = 0; i < tCount; i++) {
      tArray[i] = LineStyle.load(pReader, pWithAlpha, pIsMorph);
    }

    return tArray;
  };

}(this));
