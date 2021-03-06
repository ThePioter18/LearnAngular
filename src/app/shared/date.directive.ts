import { Directive, HostListener, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  @Input()
  private date: string;
  private paragraph; // <p>

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.paragraph = this.renderer.createElement('p');
  }

  // metody
  @HostListener('mouseenter')
  mouseenter() {
    this.paragraph.innerHTML = 'Dodane: ' + this.date;
    this.renderer.appendChild(this.el.nativeElement, this.paragraph);
  }
  @HostListener('mouseleave')
  mouseleave() {
    this.renderer.removeChild(this.el.nativeElement, this.paragraph);
  }
}
