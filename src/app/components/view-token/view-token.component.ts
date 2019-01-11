import { Component, OnInit } from '@angular/core';
import { OktaService } from 'src/app/shared/services/okta.service';
import { ObjectProperties } from 'src/app/shared/models/properties.model';

@Component({
    selector: 'app-view-token',
    templateUrl: './view-token.component.html',
    styleUrls: ['./view-token.component.css']
})
export class ViewTokenComponent implements OnInit {


    props:Array<ObjectProperties>=[]

    constructor(private oktaService: OktaService) { }

    ngOnInit() {
        let token = this.oktaService.getRawToken();
        for( var p in token){
            this.props.push( {name: p, value: token[p]});
        }
    }

}

