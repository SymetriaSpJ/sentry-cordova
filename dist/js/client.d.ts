import { BaseClient, Scope } from '@sentry/core';
import { SentryEvent, SentryEventHint } from '@sentry/types';
import { CordovaBackend, CordovaOptions } from './backend';
/**
 * The Sentry Cordova SDK Client.
 *
 * @see CordovaOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
export declare class CordovaClient extends BaseClient<CordovaBackend, CordovaOptions> {
    /**
     * Creates a new Cordova SDK instance.
     * @param options Configuration options for this SDK.
     */
    constructor(options: CordovaOptions);
    /**
     * @inheritDoc
     */
    protected prepareEvent(event: SentryEvent, scope?: Scope, hint?: SentryEventHint): Promise<SentryEvent | null>;
}
