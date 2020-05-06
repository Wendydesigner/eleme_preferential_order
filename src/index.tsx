import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Page } from './Page';
import './main.css'

export class App {
    constructor() {
        this.render();
    }

    private render(): void {
        ReactDOM.render(React.createElement(Page, { app: this }), document.getElementById("app"));
    }
}

new App();