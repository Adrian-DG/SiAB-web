import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class SideBarService {
    public isOpen = signal<boolean>(false);
}