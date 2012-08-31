/**
 * @author Jason Parrott
 *
 * Copyright (C) 2012 Jason Parrott.
 * This code is licensed under the zlib license. See LICENSE for details.
 */
(function(global) {

  global.quickswf.structs.Matrix = Matrix;

  /**
   * @constructor
   * @extends {Array}
   * @class {quickswf.structs.Matrix}
   */
  function Matrix() {

  }

  Matrix.prototype = [1, 0, 0, 1, 0, 0];

  /**
   * Loads a Rect type.
   * @param {quickswf.Reader} pReader The reader to use.
   * @return {quickswf.structs.Matrix} The loaded Matrix.
   */
  Matrix.load = function(pReader) {
    var tMatrix = new Matrix();
    var tNumberOfBits;

    // Check to see if we have scale.
    if (pReader.bp(1) === 1) {
      tNumberOfBits = pReader.bp(5);
      tMatrix[0] = pReader.fpb16p(tNumberOfBits);
      tMatrix[3] = pReader.fpb16p(tNumberOfBits);
    }

    // Check to see if we have skew.
    if (pReader.bp(1) === 1) {
      tNumberOfBits = pReader.bp(5);
      tMatrix[1] = pReader.fpb16p(tNumberOfBits);
      tMatrix[2] = pReader.fpb16p(tNumberOfBits);
    }

    // Grab the translation.
    tNumberOfBits = pReader.bp(5);
    tMatrix[4] = pReader.bsp(tNumberOfBits);
    tMatrix[5] = pReader.bsp(tNumberOfBits);

    pReader.a();

    return tMatrix;
  };

}(this));
