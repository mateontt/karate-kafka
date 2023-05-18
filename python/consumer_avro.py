from confluent_kafka.avro import AvroConsumer

# Configuración del consumidor Avro
avro_consumer_config = {
    'bootstrap.servers': 'localhost:29092',
    'group.id': 'my-consumer-group',
    'auto.offset.reset': 'earliest',
    'schema.registry.url': 'http://localhost:8081'
}

# Función para consumir mensajes Avro
def consume_avro_messages():
    consumer = AvroConsumer(avro_consumer_config)
    consumer.subscribe(['avro-topic'])

    while True:
        message = consumer.poll(1.0)

        if message is None:
            continue

        if message.error():
            print(f'Error al consumir mensaje Avro: {message.error()}')
            continue

        key = message.key()
        value = message.value()

        # print(f'Clave Avro recibida: {key}')
        print(f'Mensaje Avro recibido: {value}')

    consumer.close()

# Consumo de mensajes Avro
consume_avro_messages()
