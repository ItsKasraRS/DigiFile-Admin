import { environment } from './../../environments/environment';

export const OriginalDomain = environment.production ? 'http://digifile.com/' : 'https://localhost:44308/';
export const DomainName = environment.production ? 'http://digifile.com/' : 'https://localhost:44308/api/';
export const UserImagePath = environment.production ? 'http://digifile.com/user/' : 'https://localhost:44308/user/';
export const ProductImagePath = environment.production ? 'http://digifile.com/product/thumbnail/' : 'https://localhost:44308/product/thumbnail/';