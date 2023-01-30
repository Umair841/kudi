import * as sendgrid from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default (params: MailDataRequired) => sendgrid.send(params);
