import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DistrictComponent} from './district/district.component';


const routes: Routes = [
    {
        path: '',
        component: DistrictComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
