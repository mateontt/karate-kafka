from kafka import KafkaConsumer



# Consumer configuration

## Topico al que se subscribirá para leer mensajes
kafka_topic = 'test-topic'
## Servidor(es) de Kafka
kafka_bootstrap_server = 'localhost:29092'
## Punto desde el cual empezará a leer mensajes
kafka_auto_offset_reset = 'earliest'
## Marcar automaticamente el mensaje como leido (dentro del group-id)
kafka_enable_auto_commit = True
## Grupo al que pertenecerá
kafka_group_id = 'my-group'


consumer = KafkaConsumer(
    kafka_topic,
    bootstrap_servers=[kafka_bootstrap_server],
    auto_offset_reset=kafka_auto_offset_reset,
    enable_auto_commit=kafka_enable_auto_commit,
    group_id=kafka_group_id
)

# Bucle infinito para leer mensajes
for message in consumer:
    print(f"Received message: {message.value.decode('utf-8')}")