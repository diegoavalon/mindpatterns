/**
* Copyright 2019 eBay Inc.
*
* Use of this source code is governed by a MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
*/

const onClick = (e) => e.preventDefault();

function onKeyDown(e) {
    if (e.keyCode === 32) {
        e.preventDefault();
        e.type = 'click';
        this._el.trigger(e);
    }
}

module.exports = class {
    constructor(widgetEl) {
        this._el = widgetEl;

        this._destroyed = false;

        this._onKeyDownListener = onKeyDown.bind(this);
        this._onClickListener = onClick.bind(this);

        // add button semantics
        this._el.setAttribute('role', 'button');

        this._el.classList.add('hijax-button--js');

        this.wake();
    }

    sleep() {
        this._el.removeEventListener('keydown');
        this._el.removeEventListener('click');
    }

    wake() {
        if (this._destroyed !== true) {
            this._el.addEventListener('keydown', this._onKeyDownListener);
            this._el.addEventListener('click', this._onClickListener);
        }
    }

    destroy() {
        this._destroyed = true;
        this.sleep();
        this._onKeyDownListener = null;
        this._onClickListener = null;
    }
}
