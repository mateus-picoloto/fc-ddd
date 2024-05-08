import ProductCreatedEvent from "../product-created.event"
import EventHandlerInterface from "../../@shared/event-handler.interface"

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log('Sending email to .......');
    }
}