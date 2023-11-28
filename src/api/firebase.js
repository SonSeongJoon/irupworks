import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signOut,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import {
	getDatabase,
	ref,
	set,
} from 'firebase/database';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_ADMIN_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
};
initializeApp(firebaseConfig);
const auth = getAuth();

export function login(email, password) {
	return signInWithEmailAndPassword(auth, email, password).catch((error) => {
		console.error('Error signing in with email and password:', error);
		throw error;
	});
}

export function logout() {
	return signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
	onAuthStateChanged(auth, async (user) => {
		callback(user);
	});
}

export const signupEmail = async (formData) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
		const user = userCredential.user;
		await updateProfile(user, {
			displayName: formData.name,
		});
		const db = getDatabase();
		const userRef = ref(db, `userdata/${user.uid}`);
		await set(userRef, {
			name: formData.name,
			email: formData.email,
			phoneNum: formData.phoneNum,
		});
	} catch (error) {
		console.error('Error signing up with email and password:', error);
		if (error.code === 'auth/email-already-in-use') {
			alert('이미 가입된 회원입니다.');
		}
	}
};