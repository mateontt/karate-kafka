from time import gmtime, strftime
from kafka import KafkaProducer


# Producer configuration

## Topico al que se subscribirá para enviar mensajes
kafka_topic = 'test-topic'
## Servidor(es) de Kafka
kafka_bootstrap_server = 'localhost:29092'
## Key para los mensajes
kafka_key = 'test-key'
## Mensaje que se enviará
kafka_value = strftime("%Y-%m-%d %H:%M:%S", gmtime()) + ' - Mensaje enviado'


# Envío del mensaje
producer = KafkaProducer(bootstrap_servers=[kafka_bootstrap_server])
producer.send(kafka_topic, key=kafka_key.encode(), value=kafka_value.encode())
producer.flush()

print('Message sent: ' + kafka_value)