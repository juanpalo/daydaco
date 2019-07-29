const functions = require('firebase-functions');
//test
//firebase functions:config:set \
//keys.webhooks="rk_test_tIVUvU5hNQZ3MBsaQ40LcKhg00z0vqt1IU" \
//keys.signing="whsec_5kR6AYUeC1nPDoeUpss4A5MFAW9w0La6"
const admin = require('firebase-admin');
admin.initializeApp();
//const stripe = require('stripe')(functions.config().keys.webhooks);
//const endpointSecret = functions.config().keys.signing;
// Moments library to format dates.
const moment = require('moment');

exports.events = functions.https.onRequest((request, response) => {

    const formattedDate = moment().format(format);
    console.log('Sending Formatted date:', formattedDate);
    admin.database().ref('/tryTime').push(formattedDate);
    // Get the signature from the request header
    /*
    let sig = request.headers["stripe-signature"];
    try {
        // Verify the request against our endpointSecret
      let event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    } catch (err) {
      return response.status(400).end();
    }
    
    return admin.database().ref('/events').push(event)
    .then((snapshot) => {
    return response.json({ received: true, ref: snapshot.ref.toString() });
    })
    .catch((err) => {
    console.error(err);
    return response.status(500).end();
    });
    **/
});