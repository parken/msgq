
import constants from '../../config/constants';
const { sms_types, routes } = constants;
const { PLAIN, UNICODE } = sms_types;
const { PROMOTIONAL, TRASACTIONAL, SENDER_ID, OTP } = routes;

// Todo: return error bucket
export const sms = {
  route_id: {
    type: 'number',
    enum: [PROMOTIONAL, TRASACTIONAL, SENDER_ID, OTP]
  },
  message: {
    type: 'string',
  },
  campaign_name: {
    type: 'string',
    maxLength: 255,
  },
};

const smsRequired = ['route_id', 'message'];

export const promotionalSMS = { // === otp
  title: 'PromotionalSMS',
  type: 'object',
  properties: Object.assign(sms, {
    mobile_numbers: {
      type: 'string',
      minLength: 10,
    },
  }),
  required: smsRequired.concat(['mobile_numbers']),
};

export const unicodeSMS = {
  title: 'UnicodeSMS',
  type: 'object',
  properties: Object.assign(sms, {
    mobile_numbers: {
      type: 'string',
      minLength: 10,
    },
    sms_type: {
      type: 'number',
      enum: [PLAIN, UNICODE],
      default : PLAIN,
    },
  }),
  required: smsRequired.concat(['mobile_numbers', 'sms_type']),
};

export const flashSMS = {
  title: 'FlashSMS',
  type: 'object',
  properties: Object.assign(sms, {
    mobile_numbers: {
      type: 'string',
      minLength: 10,
    },
    flash_sms: {
      type: 'boolean',
      default : false,
    },
  }),
  required: smsRequired.concat(['mobile_numbers', 'flash_sms']),
};

export const duplicateSMS = {
  title: 'FlashSMS',
  type: 'object',
  properties: Object.assign(sms, {
    mobile_numbers: {
      type: 'string',
      minLength: 10,
    },
    duplicate: {
      type: 'boolean',
      default : false, // if lastmessage == current message
    },
  }),
  required: smsRequired.concat(['mobile_numbers', 'duplicate']),
};

export const signatureSMS = {
  title: 'FlashSMS',
  type: 'object',
  properties: Object.assign(sms, {
    mobile_numbers: {
      type: 'string',
      minLength: 10,
    },
    signature: {
      type: 'boolean',
      default : false,
    },
  }),
  required: smsRequired.concat(['mobile_numbers', 'signature']),
};

export const anySMS = {
  title: 'AnySMS',
  type: 'object',
  properties: Object.assign(sms, {
    mobile_numbers: {
      type: 'string',
      minLength: 10,
    },
  }),
  oneOf: [
    { required: smsRequired.concat(['mobile_numbers_from_csv']) },
    { required: smsRequired.concat(['mobile_numbers']) },
    { required: smsRequired.concat(['group_ids']) },
  ],
};

export const transactionalSMS = {
  title: 'TrasactionalSMS',
  type: 'object',
  properties: Object.assign(sms, {
    sender_id: {
      type: 'string',
      minLength: 6,
      maxLength: 6,
    },
  }),
  required: smsRequired.concat(['mobile_numbers', 'sender_id']),
};

export const groupSMS = {
  title: 'GroupSMS',
  type: 'object',
  properties: Object.assign(sms, {
    group_ids: {
      type: 'array',
      items: {
        type: 'number',
      }
    },
  }),
  required:  smsRequired.concat(['mobile_numbers', 'group_ids']),
};

export const scheduledSMS = {
  title: 'ScheduledSMS',
  type: 'object',
  properties: Object.assign(sms, {
    scheduled_on: {
      type: 'string',
      format: 'date-time'
    },
  }),
  required: smsRequired.concat(['mobile_numbers', 'scheduled_on']),
};

export const csvSMS = {
  title: 'CSVSMS',
  type: 'object',
  properties: Object.assign(sms, {
    mobile_numbers_from_csv: {
      type: 'array',
      items: {
        type: 'number',
        minimum: 7000000000,
        maximum: 9999999999,
        //pattern: '^[789]\\d{9},' pattern works with strings
      },
    },
  }),
  required: smsRequired.concat(['mobile_numbers_from_csv']),
};


