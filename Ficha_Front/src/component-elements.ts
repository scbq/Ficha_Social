import { createCustomElement } from '@angular/elements';
import { Injector } from '@angular/core';

export function registerCustomElement(name: string, component: any, injector: Injector) {
    if (!customElements.get(name)) {
        const element = createCustomElement(component, { injector });
        customElements.define(name, element);
    }
}