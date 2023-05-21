import { Component, HostBinding, HostListener, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { map } from "rxjs";

import { AuthApiService } from "../../../api/auth-api";
import { SubscribableComponent } from "../../components/_lib/subscribable.component";

@Component({
	selector: "app-root",
	styleUrls: ["./app.component.scss"],
	templateUrl: "./app.component.html"
})
export class AppComponent extends SubscribableComponent implements OnInit {
	protected readonly isUserConnected = this.authService
		.getUserConnected()
		.pipe(map(user => !!user));

	/**
	 * SM width breakpoint
	 */
	private readonly SM_SIZE = 600;
	private isXsSize = false;

	private lastScrollTop = 0;

	// TODO: get from modules or scss
	@ViewChild(MatSidenav, { static: true })
	private readonly matSidenav!: MatSidenav;

	@HostBinding("class.scrolled-down")
	private isScrollingDown = false;

	@HostBinding("class.scrolled-up")
	private get isScrollingUp() {
		return !this.isScrollingDown;
	}

	public constructor(private readonly authService: AuthApiService) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.matSidenav.openedStart.subscribe(this.controlBodyScroll.bind(this)),
			this.matSidenav.closedStart.subscribe(this.controlBodyScroll.bind(this))
		);

		this.onResize();
	}

	private controlBodyScroll() {
		// Block scrolling whole page when the sidenav is opened
		document.body.style.overflowY = this.matSidenav.opened ? "hidden" : "";
	}

	@HostListener("window:resize")
	private onResize() {
		// Using the MediaObserver lets the user see the sidenav closing.
		const before = this.isXsSize;
		this.isXsSize = window.innerWidth < this.SM_SIZE;

		if (this.isXsSize) {
			this.matSidenav.mode = "over";

			if (this.isXsSize !== before) {
				void this.matSidenav.close();
			}
		} else {
			this.matSidenav.mode = "side";

			if (!this.matSidenav.opened) {
				void this.matSidenav.open();
			}
		}

		this.controlBodyScroll();
	}

	@HostListener("window:scroll")
	private onScroll() {
		// TODO: https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
		//      Stop scrolling when sidenav is open
		const st = window.pageYOffset || document.documentElement.scrollTop;

		this.isScrollingDown = st > this.lastScrollTop;
		// For Mobile or negative scrolling
		this.lastScrollTop = st <= 0 ? 0 : st;
	}
}
