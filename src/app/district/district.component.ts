import {Component, OnInit} from '@angular/core';
import {AmapDistrictSearchService, District, DistrictSearchResult} from 'ngx-amap';
import {CMap} from 'ngx-amap/types/class/amap.map';
import {LngLat} from 'ngx-amap/types/class/amap.lng-lat';
import {Utils} from '../utils/utils';

@Component({
    selector: 'app-district',
    templateUrl: './district.component.html',
    styleUrls: ['./district.component.less']
})
export class DistrictComponent implements OnInit {
    searchDistrict = '江苏省';

    fillOpacity = 30;
    fillColor = '#CCF3FF';
    strokeColor = '#CC66CC';
    strokeOpacity = 30;
    strokeWeight = 1;
    searchSubDistrictLevel = 0;

    clean = true;

    private map: CMap;


    constructor(private amapDistrictSearch: AmapDistrictSearchService) {
    }

    ngOnInit() {
    }

    async drawPolygon(map: CMap, bounds: LngLat[][]) {
        console.log('draw polygon');
        const tmpColor = Utils.getRandomColor();
        bounds.forEach(e => {
            // @ts-ignore
            return new AMap.Polygon({
                map,
                path: e,
                fillOpacity: 1 - this.fillOpacity / 100,
                fillColor: tmpColor,
                // fillColor: this.fillColor,
                strokeColor: this.strokeColor,
                strokeWeight: this.strokeWeight,
                strokeOpacity: 1 - this.strokeOpacity / 100
            });
        });
    }

    async search(district: string): Promise<DistrictSearchResult> {
        const wrapper = await this.amapDistrictSearch.of({
            subdistrict: this.searchSubDistrictLevel, // 返回下一级行政区
            extensions: 'all', // 返回行政区边界坐标组等具体信息
            // level: 'city', // 查询行政级别为
        });
        const {status, result} = await wrapper.search(district);
        console.log('district search for ' + district);
        console.log('status:', status);
        console.log('result:', result);

        if (typeof result === 'string') {
            return null;
        }
        return result;
    }


    async onMapReady(map) {
        this.map = map;
        const result = await this.search(this.searchDistrict);
        const bounds = result.districtList[0].boundaries;
        if (this.searchSubDistrictLevel === 0) {
            await this.drawPolygon(map, bounds);
        } else {
            const subDistricts = result.districtList[0].districtList;
            this.drawDistricts(map, subDistricts);
        }
        map.setFitView();
    }

    async drawDistricts(map: CMap, districtList: District[]) {
        for (const it of districtList) {
            if (it.districtList == null || it.districtList.length === 0) {
                const tmpResult = await this.search(it.name);
                const tmpBounds = tmpResult.districtList[0].boundaries;
                this.drawPolygon(map, tmpBounds);
            } else {
                this.drawDistricts(map, it.districtList);
            }

        }
    }

    async mapfilter() {
        if (this.clean) {
            // @ts-ignore
            this.map.remove(this.map.getAllOverlays());
        }
        this.onMapReady(this.map);
    }
}
