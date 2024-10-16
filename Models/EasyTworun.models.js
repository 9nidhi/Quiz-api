const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const amountaddSchema = new Schema({
	amount: {
		type: String,
        
	},
    status:{
        type: String,
    },
    upi:{
        type: String,
    },
    paymentmode:{
        type: String,
    },
    email:{
        type: String,
    }
    
}, {timestamps: true});

const Addamount = mongoose.model('addamount', amountaddSchema);

module.exports = Addamount;
