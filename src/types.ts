export interface Address {
  street: string;
  city: string;
  houseNumber: number;
  customer: Customer;
}

interface Customer {
  firstName: string;
  lastName: string;
}
