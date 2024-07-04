import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

export const prisma = new PrismaClient();
export const PORT = process.env.PORT || 3000;

export const SALESFORCE_LOGIN_URL = process.env.SALESFORCE_LOGIN_URL || '';
export const SALESFORCE_CONSUMER_KEY = process.env.SALESFORCE_CONSUMER_KEY || '';
export const SALESFORCE_CONSUMER_SECRET = process.env.SALESFORCE_CONSUMER_SECRET || '';
export const SALESFORCE_USERNAME = process.env.SALESFORCE_USERNAME || '';
export const SALESFORCE_PASSWORD = process.env.SALESFORCE_PASSWORD || '';
export const SALESFORCE_TOKEN = process.env.SALESFORCE_TOKEN || '';
