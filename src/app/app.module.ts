import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NgxAmapModule} from 'ngx-amap';
import {DistrictComponent} from './district/district.component';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        DistrictComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxAmapModule.forRoot({
            apiKey: 'da378b889a34a657b6c704127a6e49b2'
        })
    ],
    providers: [{provide: NZ_I18N, useValue: zh_CN}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
