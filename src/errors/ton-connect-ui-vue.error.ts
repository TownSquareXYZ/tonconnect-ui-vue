import { TonConnectUIError } from "@tonconnect/ui";

/**
 * Base class for TonConnectUIVue errors. You can check if the error was triggered by the @tonconnect/ui-vue using `err instanceof TonConnectUIVueError`.
 */
export class TonConnectUIVueError extends TonConnectUIError {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);

    Object.setPrototypeOf(this, TonConnectUIVueError.prototype);
  }
}
