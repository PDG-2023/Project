import { Directive, OnDestroy } from "@angular/core";
import { Subscription, TeardownLogic } from "rxjs";

// Base for Components (can add more default stuff)
@Directive() // Empty directive for angular
export abstract class SubscribableComponent implements OnDestroy {
	protected subscriptions: Subscription = new Subscription();

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	/**
	 * Add subscription for this component
	 * @param subscriptions The subscription to add
	 */
	protected addSubscriptions(...subscriptions: TeardownLogic[]) {
		for (const subscription of subscriptions) {
			this.subscriptions.add(subscription);
		}
	}
}
