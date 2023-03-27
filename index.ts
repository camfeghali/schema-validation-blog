import { Address, storeAddress } from './src';
import Ajv from 'ajv';
import * as AddressSchema from './src/schemas/AddressSchema.json';

const ajv = new Ajv();
const validate = ajv.compile(AddressSchema);

const mockInput = {
  street: 'Malcolm X Boulevard',
  city: 'Brooklyn',
  houseNumber: 12,
  customer: { firstName: 'Camille' },
};

(function main() {
  const isValid = validate(mockInput);

  if (isValid) {
    storeAddress(mockInput as unknown as Address);
  } else {
    console.log(JSON.stringify(validate.errors, null, 2));
  }
})();
