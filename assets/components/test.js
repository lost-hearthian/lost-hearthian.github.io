import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class Test extends LitElement {
    render() {
        return html`
            This is a custom component.
        `;
    }
}
customElements.define('yd-test', Test);
