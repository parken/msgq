/**
 * Created by Manjesh on 09-07-2017.
 */
// http://sms.ayyayo.com/httpapi/httpapi?token=7b0fab314b769602c9c1f03ae6c36a9f&sender=Sender id&number=Number(s)&route=Route&type=Message type&sms=Message
// http://sms.parkentechnology.com/httpapi/httpdlr?token=b9a7fc874a245e0f5e1cf46bb0455015&messageid=Unique message id
// http://sms.parkentechnology.com/httpapi/httpapi?token=b9a7fc874a245e0f5e1cf46bb0455015&sender=PARKEN&number=9844717202&route=2&type=1&sms=Message
// http://sms.parkentechnology.com/httpapi/httpdlr?token=b9a7fc874a245e0f5e1cf46bb0455015&messageid=13258697
// http://sms.parkentechnology.com/httpapi/credits?token=b9a7fc874a245e0f5e1cf46bb0455015&route=4

export function httpapi (req, res, next) {
  return res.json();
}

export function httpdlr (req, res, next) {
  return res.json();
}

export function credits (req, res, next) {
  return res.json();
}

export function routes (req, res, next) {
  console.log(req.get('type'));
  return res.json({ hs: 1 });
  next();
}



