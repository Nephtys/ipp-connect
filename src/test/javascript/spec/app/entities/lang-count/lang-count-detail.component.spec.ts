import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LangCountDetailComponent } from '../../../../../../main/webapp/app/entities/lang-count/lang-count-detail.component';
import { LangCountService } from '../../../../../../main/webapp/app/entities/lang-count/lang-count.service';
import { LangCount } from '../../../../../../main/webapp/app/entities/lang-count/lang-count.model';

describe('Component Tests', () => {

    describe('LangCount Management Detail Component', () => {
        let comp: LangCountDetailComponent;
        let fixture: ComponentFixture<LangCountDetailComponent>;
        let service: LangCountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [LangCountDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    LangCountService
                ]
            }).overrideComponent(LangCountDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LangCountDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LangCountService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LangCount(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.langCount).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
