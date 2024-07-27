import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    //bundleId
    platform: 'com.swapt.app',
    projectId: '66a47a2e000acb7ba5ba',
    databaseId: '66a47bfe001625be97e8',
    userCollectionId: '66a47c42002232553c76',
    storageId: '66a47dc70025ecd2bd7f',

}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
    ;
const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {

    //it is charged by Auth!
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username,
        )
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password)
    // create the user in db
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,

            }
        )
        console.log(newUser);
        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }


}
export async function signIn(email, password) {
    try {
        console.log("rn you are in sign in!")
        const sessions = await account.listSessions();
        
        if (sessions.total > 0) {
            console.log("Existing session detected, redirecting...");
            const currentSession = sessions.sessions[0];
            return currentSession;
        }

        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        console.log("sign in error",error)
        throw error;
    }
}

export async function logOut(){
    try {
      //deleted session
        await account.deleteSession('current');
        console.log('Session has been closed.');
      } catch (error) {
        console.error('Error closing session:', error.message);
      }
}
