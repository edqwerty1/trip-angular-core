export interface IModalOptions {
	backdrop:boolean;
	keyboard:boolean;
	duration:number;
	content?:string;
    overlay?:Element;
}

export class Modal {

	private isIE:boolean;
	private ieVersion:number;
	private opened:boolean;
	private timer:number;
	private dialog:Element;
	private overlay:Element;

	constructor(private modal: Element, private options: IModalOptions) {
		this.isIE = (new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})').exec(navigator.userAgent) != null) ? true : false;
		this.ieVersion = (new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})').exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : -1;
		this.opened = false;
		this.timer = 0;
		this.dialog = modal.querySelector('.modal-dialog');
		this.init();
	}

	public open(): void {
		this._open();
	}

	public close(): void {
		this._close();
	}

	private init() {
		if (this.options.content && typeof this.options.content !== 'undefined') {
			this.setContent(this.options.content);
		}
		this.dismiss();
		this.keydown();
		this.trigger();
		if (!(this.isIE && this.ieVersion < 9)) {
			this.resize();
		}
	}

	private _open(): void {
		var that = this;

		if (this.options.backdrop) {
			this.createOverlay();
		} else {
			this.overlay = null;
		}

		document.body.classList.add('modal-open');
		this.modal.classList.add('show');

		clearTimeout(parseInt(that.modal.getAttribute('data-timer'), 10));
		this.timer = setTimeout(() => {
			if ( that.overlay !== null ) {
				that._resize();
				that.overlay.classList.add('in');
			}
			that.modal.classList.add('in');
			that.modal.setAttribute('aria-hidden', 'false');
		}, that.options.duration / 2);

		this.modal.setAttribute('data-timer', that.timer.toString());
        this.opened = true;
	}

	private _close(): void {
		var that = this;

        this.modal.classList.remove('in');
		this.modal.setAttribute('aria-hidden', 'true');

        if (this.overlay) {
			this.overlay.classList.remove('in');
		}

		document.body.classList.remove('modal-open');

		clearTimeout(parseInt(that.modal.getAttribute('data-timer'), 10));
		this.timer = setTimeout(() => {
            that.modal.classList.remove('show');
			that.removeOverlay();
        }, that.options.duration / 2);

		this.modal.setAttribute('data-timer', that.timer.toString());
        this.opened = false;
	}

	private setContent(content:string) {
		(<HTMLElement>this.modal.querySelector('.modal-content')).innerHTML = content;
	}

	private createOverlay() {
		var backdrop = this.options.overlay, overlay = document.querySelector('.modal-backdrop');
		backdrop.setAttribute('class', 'modal-backdrop fade');

		if (overlay) {
			this.overlay = overlay;
		} else {
			this.overlay = backdrop;
		}
	}

	private removeOverlay() {
		var overlay = document.querySelector('.modal-backdrop');
		if (overlay !== null && typeof overlay !== 'undefined') {
            overlay.setAttribute('class', '');
            overlay.setAttribute('style', '');
		}
	}

	private keydown() {
		var that = this;
		document.addEventListener('keydown', (event:KeyboardEvent) => {
			if (that.options.keyboard && event.which === 27) {
				that.close();
			}
		}, false);
	}

	private trigger() {
		var that = this;
		var triggers = document.querySelectorAll('[data-toggle=\'modal\']'), tgl = triggers.length, i = 0;
		for (i; i < tgl; i++) {
			triggers[i].addEventListener('click', (event:Event) => {
				var b = <HTMLElement> event.target,
				s = b.getAttribute('data-target') && b.getAttribute('data-target').replace('#', '')
				 || b.getAttribute('href') && b.getAttribute('href').replace('#', '');
				if (document.getElementById(s) === that.modal ) {
					that.open();
				}
			});
		}
	}

	private _resize() {
		var that = this;
		let overlay:HTMLElement = <HTMLElement>(this.overlay || document.querySelector('.modal-backdrop')),
			dim = { w: document.documentElement.clientWidth + 'px', h: document.documentElement.clientHeight + 'px' };
		setTimeout(function() {
			if ( overlay !== null && /in/.test(overlay.className) ) {
				overlay.style.height = dim.h;
				overlay.style.width = dim.w;
			}
		}, that.options.duration / 2);
	}

	public resize() {
		var that = this;
		window.addEventListener('resize',  function() {
			setTimeout(function() {
				that._resize();
			}, 100);
		}, false);
	}

	public dismiss() {
		var that = this;
		this.modal.addEventListener('click', (e:Event) => {
			let target = <Element> e.target;
			if ((<HTMLElement> target.parentNode).getAttribute('data-dismiss') === 'modal' ||
			    target.getAttribute('data-dismiss') === 'modal' || e.target === that.modal ) {
				e.preventDefault();
				that.close();
			}
		});
	}

}