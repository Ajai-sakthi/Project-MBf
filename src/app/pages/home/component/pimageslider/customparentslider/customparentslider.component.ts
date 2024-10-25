import { Component, ViewChild } from '@angular/core';
import { HeroService } from '../dataset.service';
import { NgImageSliderComponent } from '../pimageslider.component';

@Component({
  selector: 'app-customparentslider',
  templateUrl: './customparentslider.component.html',
  styleUrl: './customparentslider.component.scss'
})
export class CustomparentsliderComponent {
    @ViewChild('nav', {static: false}) ds: NgImageSliderComponent | undefined;
    title = 'Ng Image Slider';
    showSlider = true;

    sliderWidth: Number = 940;
    sliderImageWidth: Number = 250;
    sliderImageHeight: Number = 200;
    sliderArrowShow: Boolean = true;
    sliderInfinite: boolean = false;
    sliderImagePopup: boolean = true;
    sliderAutoSlide: Boolean = false;
    sliderSlideImage: Number = 1;
    sliderAnimationSpeed: any = 1;
    imageObject: any;
    slideOrderType:string = 'DESC';

    constructor(private heroService: HeroService) {
        this.setImageObject();
    }

    onChangeHandler() {
        this.setImageObject();
        this.showSlider = false;
        setTimeout(() => {
            this.showSlider = true;
        }, 10);
    }

    setImageObject() {
        // this.heroService.getImages().subscribe((data: any) => {
        // setTimeout(() => {
        //     this.imageObject = data;
        // }, 3000);
        // });
        this.imageObject = this.heroService.getImagesWithOrder();
    }

    imageOnClick(index: any) {
        console.log('index', index);
    }

    lightboxClose() {
        console.log('lightbox close')
    }

    arrowOnClick(event: any) {
        console.log('arrow click event', event);
    }

    lightboxArrowClick(event: any) {
        console.log('popup arrow click', event);
    }

    prevImageClick() {
        this.ds?.prev();
    }

    nextImageClick() {
        this.ds?.next();
    }
}