import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { LangCount } from './lang-count.model';
import { LangCountPopupService } from './lang-count-popup.service';
import { LangCountService } from './lang-count.service';
@Component({
    selector: 'jhi-lang-count-dialog',
    templateUrl: './lang-count-dialog.component.html'
})
export class LangCountDialogComponent implements OnInit {

    langCount: LangCount;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private langCountService: LangCountService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.langCount.id !== undefined) {
            this.langCountService.update(this.langCount)
                .subscribe((res: LangCount) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.langCountService.create(this.langCount)
                .subscribe((res: LangCount) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: LangCount) {
        this.eventManager.broadcast({ name: 'langCountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-lang-count-popup',
    template: ''
})
export class LangCountPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private langCountPopupService: LangCountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.langCountPopupService
                    .open(LangCountDialogComponent, params['id']);
            } else {
                this.modalRef = this.langCountPopupService
                    .open(LangCountDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
