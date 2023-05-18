
## Levantar entorno docker
Utilizar el comando ```docker-compose up -d```, esto creará los contenedores necesarios para levantar el entorno:
* Servidor de Zookeeper
* Servidor de Kafka
* Registro de esquemas

## Esquema
El fichero **mensaje.avsc** contiene el esquema que tendrán los mensajes enviados por producer.py y consumidos por consumer.py.

Para alterar el esquema valdrá con editarlo y alterarlo, esto provocará errores a la hora de producir y consumir mensajes salvo que se adapten también los scripts.

Para poder lanzar los scripts ya que hacen uso de esquemas avro, es necesario lanzar los siguientes comandos para instalar los componentes de Python necesarios:
```
pip install confluent-kafka
pip install fastavro
```

## Producir un mensaje
Ejecutando el script ```producer.py``` se creará un mensaje en el servidor kafka utilizando el esquema definido.

Por defecto el tópico es **topico-prueba**, pero puede utilizarse otro.

El script ```producer_avro.py```producirá un mensaje utilizando un esquema Avro.

## Consumir mensaje
Ejecutando el script ```consumer.py`` se leeran los mensajes que haya en el tópico indicado utilizando el esquema definido.

El script ```consumer_avro.py``` consumirá un mensaje utilizando un esquema Avro.

