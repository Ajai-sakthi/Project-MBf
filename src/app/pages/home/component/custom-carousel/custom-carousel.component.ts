import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss']
})
export class CustomCarouselComponent implements OnInit, OnDestroy {
  slides = [
    { image: 'https://r4.wallpaperflare.com/wallpaper/750/66/360/the-lord-of-the-rings-the-lord-of-the-rings-the-fellowship-of-the-ring-artwork-fantasy-art-movies-hd-wallpaper-e4598363a9c549db661867f04bb2792d.jpg', title: 'The Lord oF the Rings', description: 'Description of Slide 1' },
    { image: 'https://wallpapercat.com/w/full/e/5/1/125605-2880x1620-desktop-hd-game-of-thrones-wallpaper-image.jpg', title: 'Game of thrones', description: 'Description of Slide 2' },
    { image: 'https://wallpapercat.com/w/full/c/e/0/51723-1920x1080-desktop-1080p-deadpool-wallpaper.jpg', title: 'DeadPool', description: 'Description of Slide 3' }
  ];

  currentSlide = 0;
  autoplayInterval: any;
  autoplaySpeed =7000; // Speed of auto-switching slides (in ms)

  ngOnInit(): void {
    this.startAutoplay();
  }

  // Go to next slide
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  // Go to previous slide
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  // Go to specific slide
  goToSlide(slideIndex: number) {
    this.currentSlide = slideIndex;
  }

  // Autoplay functionality
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplaySpeed);
  }

  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }
}
