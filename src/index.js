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

// Function to generate a random ID for a product/supplier etc
function genId() {
    return Math.floor(Math.random() * (1000 - 10) + 10);
}

// Function to generate a random ID for a product/supplier etc
function genProductCode() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 9);
}

async function create(collectionName, docId, data) {
    try {
        // Calling .add() automatically gives the document a unique id.
        // To give the new document a custom name, you use .doc(<name>).set(<data>).
        // There is no need to first check if the document exists, since .set() will
        // overwrite any existing data.
        await db.collection(collectionName).doc(docId.toString()).set(data);
    } catch (error) {
        console.error(`Could not create document '${docId} in '${collectionName}':`, error);
    }
}

async function read(collectionName, docId) {
    try {
        const doc = await db.collection(collectionName).doc(docId.toString()).get();

        if (doc.exists) {
            return doc.data();
        } else {
            console.log(`No such document: ${docId}`);
        }
    } catch(error) {
        console.error(`Could not read document '${docId} in ${collectionName}'`);
    }

    return null;
}

async function update(collectionName, docId, newData) {
    try {
        await db.collection(collectionName).doc(docId.toString()).update(newData);
    } catch(error) {
        console.error(`Could not update document '${docId} in ${collectionName}'`);
    }
}

// delete is a reserved word in javascript, so we use del instead
async function del(collectionName, docId) {
    try {
        await db.collection(collectionName).doc(docId.toString()).delete();
    } catch(error) {
        console.error(`Could not update document '${docId} in ${collectionName}'`);
    }
}

async function dump(collectionName) {
    try {
        const collection = await db.collection(collectionName).get();
        console.log(`============== ${collectionName} ==============`);

        collection.forEach((doc) => {
            console.log(`${doc.id}: ${JSON.stringify(doc.data(), null, '\t')}`);
        });
    } catch(error) {
        console.log(`Could not fetch collection: ${collectionName}:`, error);
    }
}

async function addTestData() {
    const productId = genId();
    const supplierId = genId();

    // The productId is the key of the document and does not have
    // to be stored in the document data.
    await create(collections.products, productId, {
        productCode: genProductCode(),
        quantity: 10,
        price: 200,
    });

    await create(collections.suppliers, supplierId, {
        name: 'Krabby AB',
        phone: '+46202020202',
    });

    await create(collections.orders, genId(), {
        productId,
        quantity: 5,
    });

    await create(collections.productSuppliers, productId, {
        supplierId,
    });
}

async function removeTestData() {
    for (const collectionName of Object.values(collections)) {
        const collection = await db.collection(collectionName).get();

        // To remove documents from a collection, you must do so manually.
        // Collections inside documents will not be deleted automatically.
        // In our case, the documents does not have any subcollections.
        collection.forEach((doc) => del(collectionName, doc.id));
    }
}

// CREATE
// addTestData();

// READ
// async function test() {
//     const data = await read(collections.products, 412);
//     console.log(data);
// }
// test()

// UPDATE
// update(collections.orders, 603, { quantity: 0 });

// DELETE
// del(collections.suppliers, 883);
