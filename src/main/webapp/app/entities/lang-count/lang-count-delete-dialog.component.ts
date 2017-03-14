import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { LangCount } from './lang-count.model';
import { LangCountPopupService } from './lang-count-popup.service';
import { LangCountService } from './lang-count.service';

@Component({
    selector: 'jhi-lang-count-delete-dialog',
    templateUrl: './lang-count-delete-dialog.component.html'
})
export class LangCountDeleteDialogComponent {

    langCount: LangCount;

    constructor(
        private langCountService: LangCountService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.langCountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'langCountListModification',
                content: 'Deleted an langCount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lang-count-delete-popup',
    template: ''
})
export class LangCountDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private langCountPopupService: LangCountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.langCountPopupService
                .open(LangCountDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
