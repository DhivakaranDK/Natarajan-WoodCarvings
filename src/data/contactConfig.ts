export interface ContactNumber {
  raw: string;
  formatted: string;
}

export const CONTACT_NUMBERS: ContactNumber[] = [
  { raw: '9894906764', formatted: '+91 98949 06764' },
  { raw: '9443771856', formatted: '+91 94437 71856' },
  { raw: '9092342219', formatted: '+91 90923 42219' },
  { raw: '8122303472', formatted: '+91 81223 03472' },
];

export const PRIMARY_CONTACT = CONTACT_NUMBERS[0]; // First phone number in order: 9894906764
export const CONTACT_EMAIL = 'natarajanwoodcarvings@gmail.com';
