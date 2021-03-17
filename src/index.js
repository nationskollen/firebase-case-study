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

// TODO: Add functions for updating all of the above

// Function to generate a random ID for a product/supplier etc
function genID() {
    return Math.floor(Math.random() * (1000 - 10) + 10); 
}

// Function to generate a random ID for a product/supplier etc
function genProductCode() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal. 
    return Math.random().toString(36).substr(2, 9);
}

async function addSupplier(supplierId, name, phone) {
    try {
        // Calling .add() automatically gives the document a unique id.
        // To give the new document a custom name, you use .doc(<name>).set(<data>)
        // TODO: Maybe check if the document exists before setting the data?
        await db.collection(collections.suppliers).doc(supplierId.toString()).set({
            supplierId,
            name,
            phone,
        });
    } catch (error) {
        console.error('Could not add supplier:', error);
    }
}

async function removeSupplier(supplierId) {
    try {
        await db.collection(collections.suppliers).doc(supplierId.toString()).delete();
    } catch (error) {
        console.error('Could not remove supplier: ', error);
    }   
}

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

async function removeProduct(productId) {
    try {
        // calling .delete() will remove the product from the database db
        await db.collection(collections.products).doc(productId.toString()).delete();
    } catch (error) {
        console.error('Could not remove product:', error);
    }
}

// Add new order
async function addOrder(orderId, productId, quantity) {
    try {
        // Calling .add() automatically gives the document a unique id.
        // To give the new document a custom name, you use .doc(<name>).set(<data>)
        // TODO: Maybe check if the document exists before setting the data?
        await db.collection(collections.orders).doc(orderId.toString()).set({
            orderId,
            productId,
            quantity
        });
    } catch (error) {
        console.error('Could not add order:', error);
    }
}

async function removeOrder(orderId) {
    try {
        await db.collection(collections.orders).doc(orderId.toString()).delete();
    } catch (error) {
        console.error('Could not remove order: ', error);
    }
}

async function addProductSupplier(productId, supplierId) {
    try {
        await db.collection(collections.productSuppliers).doc(productId.toString()).set( {
            productId,
            supplierId
        });
    } catch(error) {
        console.error('Could not add Product supplier: ', error);
    }
}

async function removeProductSupplier(productId) {
    try {
        await db.collection(collections.productSuppliers).doc(productId.toString()).delete();
    } catch (error) {
        console.error('Could not remove supplier: ', error);
    }
}

async function addTestData() {
    const productCode = genProductCode();
    const productId = genID();
    const supplierId = genID();
    const orderId = genID();
    
    addProduct(productId, productCode, 100, 120);
    addOrder(orderId, productId, 50);
    addSupplier(supplierId, "Random supplier", "4204206969");
    addProductSupplier(productId, supplierId);
}

// Removes all documents inside a collection
async function removeDocuments(collectionName, removeFunction) {
    const collection = await db.collection(collectionName).get();
    
    collection.forEach((doc) => {
        removeFunction(doc.id);
    });
}

async function removeTestData() {
    removeDocuments(collections.orders, removeOrder);
    removeDocuments(collections.products, removeProduct);
    removeDocuments(collections.suppliers, removeSupplier);
    removeDocuments(collections.productSuppliers, removeProductSupplier);
}

//removeTestData();
addTestData();