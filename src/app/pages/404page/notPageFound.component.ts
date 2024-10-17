import { Component } from "@angular/core";
@Component({
    selector:'app-notPage',
    template:`<div>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <a routerLink="/">Go to Home</a>
</div>`,
    styles: [`
        :host {
          background-color: black;
          color: white;
          display:flex;
          justify-content:center;
          align-items: center;
          height:50vh;
        }
        div{
           text-align:center;
        }
        a{
            background-color:#F8B319;
            padding:12px 8px;
            border-radius:10px;
            text-decoration: none;
            color:#020202;
            font-weight:600;
        }
      `]
})

export class NotFoundComponent{
      constructor(){

      }
};