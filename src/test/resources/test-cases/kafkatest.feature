Feature: Kafka con Karate

Background:	
	# Instanciar Producer
	* def MyProducer = Java.type('com.kafkatest.Producer')
	* MyProducer.createProducer()

	# Instanciar Consumer
	* def MyConsumer = Java.type('com.kafkatest.Consumer')
    * def consumer = new MyConsumer('test-topic')

@kafka
Scenario Outline: Producción y consumo de un mensaje en un servidor Kafka	
	# Producer
	* def mensaje = MyProducer.produce('message','<mensaje>')
	
	# Consumer
    * def message = consumer.consume()
    * print 'Mensaje recibido: ', message

	# Validación
	* match message == '<mensaje>'

	Examples:
	| mensaje     |
	| Test MSG #1 |
	| Test MSG #2 |