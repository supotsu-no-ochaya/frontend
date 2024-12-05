import PocketBase from 'pocketbase';

// Create and export a PocketBase instance
const pb = new PocketBase('http://127.0.0.1:8090');
export default pb;

// there is no need to check if the user is admin, as this can be set in Pocketbase directly
// this way if a non-admin user tries operations like update or delete, a "Permission denied" will be returned
