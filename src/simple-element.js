/*
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { PropertyAccessors } from '../node_modules/@polymer/polymer/lib/mixins/property-accessors.js';
import { createDomIdMap } from './utils.js';

export class SimpleElement extends PropertyAccessors(HTMLElement) {

  /**
   * Creates a template element from the class template string.
   * Does this work for the class one time only.
   */
  static finalize(name) {
    const proto = this.prototype;
    if (!proto.hasOwnProperty('__finalized')) {
      this.createPropertiesForAttributes();
      proto.__finalized = true;
      const template = this.template;
      if (template) {
        proto._template = document.createElement('template');
        proto._template.innerHTML = template;
        if (window.ShadyCSS) {
          window.ShadyCSS.prepareTemplate(proto._template, name);
        }
      }
      return true;
    }
  }

  static createProperties(props) {
    for (let i=0; i < props.length; i++) {
      this.prototype._createPropertyAccessor(props[i]);
    }
  }

  /**
   * Implements the standard custom elements callback to enable
   * property accessor side effects.
   */
  connectedCallback() {
    this._enableProperties();
  }


  /**
   * First ensures the class template has been created,
   * then if a template exists,
   * 1. creates a shadowRoot,
   * 2. stamps the template
   * 3. makes a $ node map corresponding to nodes with id's in the template
   * 4. appends the stamped template to the shadowRoot.
   */
  ready() {
    this.constructor.finalize(this.localName);
    if (this._template) {
      if (!this.shadowRoot) {
        this.attachShadow({mode: 'open'});
      }
      let dom = document.importNode(this._template.content, true);
      this.$ = createDomIdMap(dom);
      this.shadowRoot.appendChild(dom);
    }
    super.ready();
  }

}