import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class TopBar extends LitElement {
    static styles = css`
        :host {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
            background-color: var(--lime-cream)
        }

        .section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        }
    `;

    render() {
        return html`
            <div class="section">
                <slot name="left"></slot>
            </div>
            <div class="section">
                <slot name="right"></slot>
            </div>
        `;
    }
}
customElements.define('yd-top-bar', TopBar);
