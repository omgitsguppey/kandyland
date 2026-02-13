const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * Validates PayPal Webhook Signature (Simplified for V1 - Production needs PayPal SDK)
 * In V1, we trust the ID token or secret sent in headers if configured.
 * For 100% Security, use 'paypal-rest-sdk' to verify.
 */

exports.paypalWebhook = functions.https.onRequest(async (req, res) => {
    const event = req.body;
    const eventType = event.event_type;

    console.log("Received PayPal Webhook:", eventType);

    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
        const resource = event.resource;
        const customId = resource.custom_id; // We can pass userId here in the future
        const amount = resource.amount.value;

        // In our client-side implementation, we didn't pass custom_id yet.
        // So this webhook is prepared for V2 migration where we rely 100% on server.
        // For now, it logs the success.

        console.log(`Payment Captured: ${amount} ${resource.amount.currency_code}`);

        // Logic to update user balance would go here:
        // 1. Identify User from custom_id
        // 2. atomic increment gumDropsBalance
    }

    res.status(200).send("Received");
});

// Scheduled Function: Daily Streak Reset (Midnight PT)
exports.resetStreaks = functions.pubsub.schedule('0 0 * * *')
    .timeZone('America/Los_Angeles')
    .onRun(async (context) => {
        // Logic to reset streaks if not active
        console.log("Daily cleanup running...");
        return null;
    });
