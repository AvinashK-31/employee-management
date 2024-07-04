import jsforce from 'jsforce';
import { SALESFORCE_LOGIN_URL, SALESFORCE_CONSUMER_KEY, SALESFORCE_CONSUMER_SECRET, SALESFORCE_USERNAME, SALESFORCE_PASSWORD, SALESFORCE_TOKEN } from '../config';

interface SalesforceContact {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
}

export class SalesforceService {
  private conn: jsforce.Connection;

  constructor() {
    this.conn = new jsforce.Connection({
      oauth2: {
        loginUrl: SALESFORCE_LOGIN_URL,
        clientId: SALESFORCE_CONSUMER_KEY,
        clientSecret: SALESFORCE_CONSUMER_SECRET
      }
    });

    this.login();
  }

  private login() {
    this.conn.login(SALESFORCE_USERNAME, SALESFORCE_PASSWORD + SALESFORCE_TOKEN, (err, userInfo) => {
      if (err) {
        return console.error('Salesforce login error:', err);
      }
      console.log('Salesforce login successful. User ID:', userInfo.id, 'Org ID:', userInfo.organizationId);
    });
  }

  async syncContact(contact: SalesforceContact): Promise<void> {
    try {
      await this.conn.sobject<SalesforceContact>('Contact').upsert(contact, 'Email');
    } catch (error) {
      console.error('Error syncing contact to Salesforce:', error);
      throw error;
    }
  }

  async deleteContact(email: string): Promise<void> {
    const records = await this.conn.sobject<SalesforceContact>('Contact').find({ Email: email }, ['Id']);
    if (records.length > 0) {
      await this.conn.sobject('Contact').destroy(records[0].Id as string);
    }
  }
}
