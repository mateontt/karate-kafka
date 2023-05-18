from confluent_kafka.avro import AvroProducer
from avro import schema
from time import gmtime, strftime
import requests
import json

# Producer configuration
kafka_bootstrap_server = 'localhost:29092'
avro_schema_file = 'esquema.avsc'
schema_registry_url = 'http://localhost:8081'
kafka_topic = 'avro-topic'


# Cargar el esquema Avro desde el archivo
with open(avro_schema_file, 'r') as schema_file:
    avro_schema = schema.parse(schema_file.read())

# Registrar el esquema Avro en el Schema Registry
headers = {'Content-Type': 'application/vnd.schemaregistry.v1+json'}
data = {
    'schema': json.dumps(avro_schema.to_json())
}
response = requests.post(
    f'{schema_registry_url}/subjects/usuario-value/versions',
    headers=headers,
    json=data
)
if response.status_code == 200:
    print('Esquema Avro registrado con éxito')
else:
    print(f'Error al registrar el esquema Avro: {response.text}')

# Configuración del productor Avro
avro_producer_config = {
    'bootstrap.servers': kafka_bootstrap_server,
    'schema.registry.url': schema_registry_url
}

# Función para producir un mensaje Avro
def produce_avro_message():
    producer = AvroProducer(avro_producer_config, default_value_schema=avro_schema)
    message = mensaje

    producer.produce(topic=kafka_topic, value=message)
    producer.flush()

    print('Mensaje Avro producido con éxito')

# Producción de mensajes Avro
fecha = strftime("%Y-%m-%d %H:%M:%S", gmtime())

mensaje = {
        'id': 1,
        'nombre': 'John Doe ' + fecha,
        'edad': 30
    }

produce_avro_message()
