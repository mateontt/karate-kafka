@ignore
Feature: 1234

@produceMessage
Scenario: Produce Message
    * def Producer = Java.type('com.kafkatest.Producer')
	* def producer = Producer.createProducer()
	# * def Consumer = Java.type('com.kafkatest.Consumer')
    # * def consumer = new Consumer('test-topic')

    * def mensaje = producer('message', mensaje)


@consumeMessage
Scenario: Consume Message
    
	* def Consumer = Java.type('com.kafkatest.Consumer')
    * def consumer = new Consumer('test-topic')
    * def message = consumer.consume()
