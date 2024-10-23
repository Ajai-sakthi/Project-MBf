import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderLightboxComponent } from './cp-slider-ligntbox/cp-slider-ligntbox.component';
import { SliderCustomImageComponent } from './cpcustomsliderimage/cpcustomsliderimage.component';
import { NgImageSliderComponent } from './pimageslider.component';
import { CustomparentsliderComponent } from './customparentslider/customparentslider.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        NgImageSliderComponent,
        SliderCustomImageComponent,
        SliderLightboxComponent,
        CustomparentsliderComponent
    ],
   
    exports: [NgImageSliderComponent,CustomparentsliderComponent]
})
export class NgImageSliderModule { }