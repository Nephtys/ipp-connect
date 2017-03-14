import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { LangCount } from './lang-count.model';
import { LangCountService } from './lang-count.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-lang-count',
    templateUrl: './lang-count.component.html'
})
export class LangCountComponent implements OnInit, OnDestroy {
langCounts: LangCount[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private langCountService: LangCountService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.langCountService.query().subscribe(
            (res: Response) => {
                this.langCounts = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLangCounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: LangCount) {
        return item.id;
    }



    registerChangeInLangCounts() {
        this.eventSubscriber = this.eventManager.subscribe('langCountListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
