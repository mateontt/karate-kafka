Feature: Ejemplo de producción y consumo de mensajes en un servidor Kafka con Karate

Background:
	
	
	* def MiClase = Java.type('com.kafkatest.Producer')
	* MiClase.createProducer()
	* def Consumer = Java.type('com.kafkatest.Consumer')
    * def consumer = new Consumer('test-topic')

@kafka3
Scenario Outline: Producción y consumo de un mensaje en un servidor Kafka		
	* def mensaje = MiClase.produce('message','<mensaje>')
	
    * def message = consumer.consume()
    * print 'Last message: ', message


	Examples:
	| mensaje  |
	| communications es lo mejor |
	# | inditex lo peta |