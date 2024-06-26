const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Replace with your actual payment gateway API key
const PAYMENT_GATEWAY_API_KEY = 'key live_secret_key_68791341fdd94846a146f0457ff7b455';

// Endpoint to initiate a payment
app.post('/pay', async (req, res) => {
    const { amount, currency, paymentMethod } = req.body;

    try {
        
        const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', {
            amount,
        }, {
            headers: {
                'Authorization': `Bearer ${PAYMENT_GATEWAY_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Handle successful payment as well as the refund transacation too.
        res.status(200).json({
            success: true,
            paymentId: response.data.paymentId,
            message: 'Payment processed successfully'
        });
    } catch (error) {
        // Handle error responses from the payment gateway
        let errorMessage = 'An error occurred while processing the payment.';

        if (error.response) {
            // The request was made and the server responded with a status code
            switch (error.response.status) {
                case 400:
                    errorMessage = 'Invalid request. Please check your payment details and try again.';
                    break;
                case 401:
                    errorMessage = 'Unauthorized. Please check your API credentials.';
                    break;
                case 402:
                    errorMessage = 'Payment required. The payment was declined.';
                    break;
                case 500:
                    errorMessage = 'Internal server error. Please try again later.';
                    break;
                default:
                    errorMessage = `Unexpected error: ${error.response.data.message || error.response.statusText}`;
            }
        } else if (error.request) {
            // The request was made but no response was received
            errorMessage = 'No response from the payment gateway. Please check your network connection.';
        } else {
            // Something happened in setting up the request that triggered an error
            errorMessage = `Request error: ${error.message}`;
        }

        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
