Feature: Kafka con Karate

Background:	
	# Instanciar Producer
	* def MyProducer = Java.type('com.kafkatest.AvroProducer')
	* MyProducer.createProducer()

	# Instanciar Consumer
	* def MyConsumer = Java.type('com.kafkatest.AvroConsumer')
    * def consumer = new MyConsumer('avro-topic')


# @kafkaAvro
# Scenario Outline: Producción y consumo de un mensaje en un servidor Kafka con esquema Avro
# 	# Producer
# 	* def mensaje = MyProducer.produce('message','<mensaje>')
	
# 	# Consumer
#     * def message = consumer.consume()
#     * print 'Mensaje recibido: ', message

# 	# Validación
# 	* match message == '<mensaje>'

# 	Examples:
# 	| mensaje     |
# 	| {'id': 1, 'nombre': 'Peter Griffin', 'edad': 30} |