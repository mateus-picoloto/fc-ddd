import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
    it("should place and order", () => {
        const customer = new Customer("c1", "Customer 1");
        const orderItem1 = new OrderItem("oi1", "Item 1", 10, "p1", 1);
        const order = OrderService.placeOrder(customer, [orderItem1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

    it("should get total of all orders", () => {
        const orderItem1 = new OrderItem("oi1", "Item 1", 100, "p1", 1);
        const orderItem2 = new OrderItem("oi2", "Item 2", 200, "p2", 2);
        const order1 = new Order("o1", "c1", [orderItem1]);
        const order2 = new Order("o2", "c1", [orderItem2]);
        const orders = [order1, order2];

        const total = OrderService.total(orders);

        expect(total).toBe(500);
    });
});