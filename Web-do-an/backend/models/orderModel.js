import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    // userId: {type:String, required:true},
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },
    items: [
        {
            name: { type: String, required: true },
            new_price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            selectedSize: { type: String, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default OrderModel;
