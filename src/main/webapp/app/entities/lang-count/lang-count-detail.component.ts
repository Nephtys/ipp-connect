import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LangCount } from './lang-count.model';
import { LangCountService } from './lang-count.service';

@Component({
    selector: 'jhi-lang-count-detail',
    templateUrl: './lang-count-detail.component.html'
})
export class LangCountDetailComponent implements OnInit, OnDestroy {

    langCount: LangCount;
    private subscription: any;

    constructor(
        private langCountService: LangCountService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.langCountService.find(id).subscribe(langCount => {
            this.langCount = langCount;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
