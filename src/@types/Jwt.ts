export default interface Jwt {
  owner: {
    createdAt: string;
    email: string;
    id: string;
    name: string;
    partner: string;
    role: string;
    updatedAt: string;
  };
  name: string;
  email: string;
  role: 'admin' | 'partner' | 'editor' | 'operator';
  partner: string;
}
