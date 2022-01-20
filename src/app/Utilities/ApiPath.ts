import { environment } from './../../environments/environment';

export const DomainName = environment.production ? 'http://digifile.com/' : 'https://localhost:44308/api/';