class SMSProvider {

  constructor($, providerName) {
    this.$ = $;
    if (providerName === 'liveair') return this.$.liveair;

    if (providerName === 'plivo') return this.$.plivo;

    return this.$.default;
  }
}
