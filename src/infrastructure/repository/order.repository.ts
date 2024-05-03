import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            }))
        },
            {
                include: [{ model: OrderItemModel }],
            })
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total(),

        },
            {
                where: { id: entity.id },
            });

        entity.items.forEach(async (item) => {
            await OrderItemModel.update({
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            },
                {
                    where: { id: item.id }
                });
        });
    }

    async find(id: string): Promise<Order> {
        try {
            const orderModel = await OrderModel.findOne({ where: { id }, include: ["items"] });
            const orderItems = orderModel.items.map((item) => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
            });

            return new Order(orderModel.id, orderModel.customer_id, orderItems);
        } catch (error) {
            throw new Error("Order not found");
        }
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: ["items"] });
        return orderModels.map((orderModel) => {
            const orderItems = orderModel.items.map((item) => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
            });

            return new Order(orderModel.id, orderModel.customer_id, orderItems);
        });
    }
}