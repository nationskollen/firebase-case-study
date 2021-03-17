const firebase = require('firebase');
require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-2EhE1uZ2g2DAWJ4cuP07QWjEg7JwWm8",
    authDomain: "dsp-firebase-763df.firebaseapp.com",
    projectId: "dsp-firebase-763df",
    storageBucket: "dsp-firebase-763df.appspot.com",
    messagingSenderId: "373124393681",
    appId: "1:373124393681:web:36661b391fe12dbd7ef3f0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const collections = {
    orders: 'Orders',
    products: 'Products',
    productSuppliers: 'ProductSuppliers',
    suppliers: 'Suppliers',
};

// TODO: Add function for adding new order
// TODO: Add function for adding new supplier
// TODO: Add function for adding new product supplier

// TODO: Add functions for updating all of the above
// TODO: Add functions for removing all of the above

async function addProduct(productId, productCode, quantity, price) {
    try {
        // Calling .add() automatically gives the document a unique id.
        // To give the new document a custom name, you use .doc(<name>).set(<data>)
        // TODO: Maybe check if the document exists before setting the data?
        await db.collection(collections.products).doc(productId.toString()).set({
            productId,
            productCode,
            quantity,
            price,
        });
    } catch (error) {
        console.error('Could not add product:', error);
    }
}

// addProduct(0, 1337, 100, 200);
