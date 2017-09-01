/*
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import {SimpleElement} from './simple-element.js';
import {findAssignedNode} from './utils.js';
import {afterNextRender} from '../node_modules/@polymer/polymer/lib/utils/render-status.js'

export class SimpleInput extends SimpleElement {

  static get template() {
    return `<style>
        :host {
          display: inline-block;
          margin: 26px 0 8px 0;
        }

        [name=input]::slotted(input::placeholder) {
          color: transparent;
        }

        [name=input]::slotted(input) {
          font-size: 1em;
          font-weight: 300;
          border: none;
          width: 100%;
          outline: none;
        }

        #decorator {
          display: block;
          height: 1px;
          border-top: 1px solid var(--small-input-default-underline-color, #737373);
          position: relative;
          will-change: transform;
        }

        #underline {
          display: block;
          height: 2px;
          width: 100%;
          background-color: var(--small-input-underline-color, navy);
          position: absolute;
          top: -1px;
          left: 0;
          transform: scale3d(0, 1, 1);
          transition: transform 0.2s ease-in;
        }

        [name=label]::slotted(label) {
          display: block;
          pointer-events: none;
          opacity: 0.6;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          transform-origin: 0 0;
          transform: translate3d(0px, -1.3em, 0px);
          will-change: transform;
          transition-property: opacity, transform;
          transition-duration: 0.15s;
          transition-timing-function: ease-out;
        }

        #underline.focus {
          transform: scale3d(1, 1, 1);
          transition: transform 0.2s ease-out;
        }

        .shift[name=label]::slotted(label) {
          transform: translate3d(0px, -2.2em, 0px) scale(0.8, 0.8);
          opacity: 1;
          color: var(--small-input-underline-color, navy);
        }

        #decorator.invalid::after {
          display: block;
          position: absolute;
          top: 0px;
          left: 0;
          right: 0;
          font-size: 0.65em;
          color: var(--small-input-invalid-color, #dd2c00);
          content: attr(error);
          white-space: nowrap;
        }

        .invalid[name=label]::slotted(label) {
          transform: translate3d(0px, -2.2em, 0px) scale(0.8, 0.8);
          opacity: 1;
          color: var(--small-input-invalid-color, #dd2c00);
        }

      </style>
      ${this.inputTemplate}
      <div id="decorator">
        <slot id="labelSlot" name="label"></slot>
        <div id="underline"></div>
      </div>
      `;
  }

  static get inputTemplate() {
    return `<slot id="inputSlot" name="input"></slot>`;
  }

  static get observedAttributes() {
    return ['error'];
  }

  ready() {
    super.ready();
    // Do all setup work after the first render.
    afterNextRender(this, () => {
      // Find the input in our light time. We require it to be there
      // by this time.
      this._input = this._findInput();
      // Setup the input event listeners.
      if (this._input) {
        // label becomes placholder
        this._input.placeholder = ' ';
        this._input.addEventListener('focus', () => this._focused = true);
        this._input.addEventListener('blur', () => this._focused = false);
        const validate = () => {
          this._hasValue = !this._input.matches(':placeholder-shown');
          this._invalid = this._input.matches(':invalid');
        }
        this._input.addEventListener('change', validate);
        // Validate in case initial content exists.
        validate();
      }
    });
  }

  _findInput() {
    return findAssignedNode(this.$.inputSlot, 'input');
  }

  _propertiesChanged(props, changed, oldProps) {
    // error state
    const invalid = (!props._focused && props._hasValue &&
      props._invalid);
    this.$.decorator.classList.toggle('invalid', invalid || false);
    this.$.decorator.setAttribute('error', props.error || '');
    this.$.labelSlot.classList.toggle('invalid', invalid || false);
    // underline animation
    this.$.underline.classList.toggle('focus', props._focused || false);
    // label animation
    this.$.labelSlot.classList.toggle('shift',
      props._focused || props._hasValue || false);

  }

}

SimpleInput.createPropertiesForAttributes();

// private properties used to react to input changes
SimpleInput.createProperties([
  '_focused',
  '_invalid',
  '_hasValue'
]);

customElements.define('simple-input', SimpleInput);
