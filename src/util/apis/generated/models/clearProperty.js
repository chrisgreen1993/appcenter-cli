/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * Clear an existing property.
 *
 */
class ClearProperty {
  /**
   * Create a ClearProperty.
   * @property {string} type
   * @property {string} name
   */
  constructor() {
  }

  /**
   * Defines the metadata of ClearProperty
   *
   * @returns {object} metadata of ClearProperty
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'clear',
      type: {
        name: 'Composite',
        className: 'ClearProperty',
        modelProperties: {
          type: {
            required: true,
            serializedName: 'type',
            type: {
              name: 'String'
            }
          },
          name: {
            required: true,
            serializedName: 'name',
            constraints: {
              MaxLength: 128,
              Pattern: /^[a-zA-Z][a-zA-Z0-9\-_]*$/
            },
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = ClearProperty;
