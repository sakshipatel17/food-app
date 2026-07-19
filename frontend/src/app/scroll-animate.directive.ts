import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]'
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.el.nativeElement.style.opacity = '0';
            this.el.nativeElement.style.transform = 'translateY(16px)';
            this.el.nativeElement.style.transition = 'opacity 400ms var(--ease-out), transform 400ms var(--ease-out)';
            
            setTimeout(() => {
              this.el.nativeElement.style.opacity = '1';
              this.el.nativeElement.style.transform = 'translateY(0)';
            }, 50);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
